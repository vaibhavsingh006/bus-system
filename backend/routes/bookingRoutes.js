const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Bus = require("../models/bus.js")
const Booking = require("../models/booking.js")
const User = require("../models/user.js");
const Passenger = require("../models/passenger.js");
const authMiddleware = require('../middlewares/authMiddleware.js')


router.post("/book", async (req, res) => {
    try {
        const { passengerDetails, busId, selectedSeats, passengerList, totalAmount, travelDate } = req.body;
        const { name, email, phone } = passengerDetails;

        // Defensive checks
        if (!selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            return res.status(400).json({ message: "No seats selected" });
        }

        if (!email || !name || !phone) {
            return res.status(400).json({ message: "Missing passenger details" });
        }

        // 1. Check if user exists by email
        let user = await User.findOne({ email });

        // 2. If not, create new user (no password required)
        if (!user) {
            user = await User.create({ name, email, contact: phone });
        }

        // 3. Find the bus
        const bus = await Bus.findById(busId);
        if (!bus) return res.status(404).json({ message: "Bus not found" });

        // 4. Check seat availability
        if (bus.availableSeats < selectedSeats.length) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        // 5. Check for already booked seats
        const existingBookings = await Booking.find({ bus: busId });
        const bookedSeats = existingBookings.flatMap(booking => booking.seatNumbers);
        const alreadyBooked = selectedSeats.some(seat => bookedSeats.includes(seat));
        if (alreadyBooked) {
            return res.status(400).json({ message: "One or more seats already booked" });
        }

        // 6. Create booking
        const booking = new Booking({
            user: user._id,
            bus: busId,
            seatNumbers: selectedSeats, // ✅ using schema key
            totalPrice: totalAmount,    // ✅ using schema key
            paymentStatus: "Pending",
            travelDate,
            passengers: passengerList.map(p => ({
                name: p.name,
                age: p.age,
                gender: p.gender,
                seatNumber: p.seatNumber
            }))
        });

        await booking.save();


        // passenger create :\
        if (Array.isArray(passengerList) && passengerList.length > 0) {
            const passengerDocs = passengerList.map(passenger => ({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
                seatNumber: passenger.seatNumber,
                booking: booking._id,
                bus: busId,
                user: user._id
            }));

            await Passenger.insertMany(passengerDocs);
        }
        // passenger create :

        // ✅ inside /book route (after booking success)
        console.log('cookie', email, user._id);

        const token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            path: '/',
        });

        // 7. Update availableSeats
        bus.availableSeats -= selectedSeats.length;
        await bus.save();

        res.status(201).json({ message: "Booking successful", booking });

    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ message: "Booking failed", error: err.message });
    }
});

// ai

router.post('/passengeradd', async (req, res) => {
    try {
        const { passengers, busId } = req.body;

        if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
            return res.status(400).json({ message: 'Passengers data is required' });
        }

        const passengerDocs = passengers.map(passenger => ({
            ...passenger,
            user: req.user.id,
            bus: busId,
        }));

        const savedPassengers = await Passenger.insertMany(passengerDocs);

        res.status(201).json({ message: 'Passengers saved successfully', passengers: savedPassengers });
    } catch (err) {
        console.error('Error saving passengers:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


// ✅ Get bookings for logged-in user
router.get("/user-bookings", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate("bus");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Failed to get bookings", error: err.message });
    }
});

// ✅ Cancel a booking
router.delete("/cancel/:id", authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking || booking.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Booking not found or unauthorized" });
        }

        const bus = await Bus.findById(booking.bus);
        if (bus) {
            bus.availableSeats += booking.seatNumbers.length;
            await bus.save();
        }

        await booking.remove();

        res.json({ message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Cancellation failed", error: err.message });
    }
});

router.get("/bookingD/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("bus").populate('user');
        console.log(booking)
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: "Failed to get booking", error: err.message });
    }

})

module.exports = router;
