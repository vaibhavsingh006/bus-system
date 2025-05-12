const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user.js")
const Booking = require("../models/booking.js")
const authMiddleware = require('../middlewares/authMiddleware.js')


router.post('/register', async (req, res) => {
    try {
        const { name, email, password, contact } = req.body;
        console.log('data', req.body)

        // Check if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt automatically handles the salt generation
        console.log('hash pass', hashedPassword)

        // Create a new user and save to the database
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            contact
        });

        res.status(201).json({ message: 'Signup successful', redirectTo: '/login' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log('Received login request:', req.body);
        // Find the user by email
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Password does not match' });
        }

        // Generate a JWT token
        const token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);

        const isProduction = process.env.NODE_ENV === 'production';


        res.cookie('token', token, {
            httpOnly: true,  // Ensures the cookie is not accessible via JavaScript
            secure: isProduction ? true : false,
            sameSite: isProduction ? 'None' : 'Lax',
            path: '/',
        });


        // Send successful login response
        res.status(200).json({ message: 'Login successful', redirectTo: '/' });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get user profile (Protected)
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "confirmPayments",
            populate: {
                path: "booking",
                populate: {
                    path: "bus"
                }
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/allbooking", authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.find({ user: req.user.id }).populate({ path: "bus" });

        if (!booking) return res.status(404).json({ message: "booking not found" });

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;