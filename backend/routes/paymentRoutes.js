const express = require('express');
const router = express.Router();
const Booking = require("../models/booking.js")
const Payment = require("../models/payment.js")
const authMiddleware = require('../middlewares/authMiddleware.js')
const sendConfirmationEmail = require('../utils/sendConfirmationEmail.js');
const Bus = require('../models/bus.js');
const User = require('../models/user.js');



// ✅ Process a payment
router.post("/pay", async (req, res) => {
    try {
        console.log("Incoming Payment Data:", req.body);
        const { bookingId, userId, amount } = req.body;

        // 1. Find the booking
        const booking = await Booking.findById(bookingId).populate("user").populate("bus");

        const bus = await Bus.findById(booking.bus._id);
        const user = await User.findById(booking.user._id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2. Create a new payment
        const newPayment = new Payment({
            user: userId,
            booking: bookingId,
            amount,
            status: "Completed",
            transactionId: generateTransactionId(),
        });

        const savedPayment = await newPayment.save();

        // 3. Update booking paymentStatus
        booking.paymentStatus = "Completed";
        bus.bookedSeats = booking.seatNumbers;
        user.confirmPayments.push(savedPayment._id);
        await user.save();

        await bus.save();
        await booking.save();

        // 4. Send confirmation email
        await sendConfirmationEmail(booking.user.email, booking, savedPayment);

        res.status(200).json({
            message: "Payment successful",
            paymentId: savedPayment._id,
            bookingId: bookingId,
        });
    } catch (err) {
        console.error("Payment error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Generates a mock transaction ID
const generateTransactionId = () => {
    return "TXN" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
};

// ✅ Get payment status by booking ID
router.get("/status/:id", async (req, res) => {
    try {
        const payment = await Payment.findOne({ booking: req.params.id });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found for this booking" });
        }

        res.status(200).json({
            status: payment.status,
            transactionId: payment.transactionId,
            amount: payment.amount,
            date: payment.createdAt,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to get payment status", error: err.message });
    }
});


module.exports = router;