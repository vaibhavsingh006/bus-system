// routes/otpRoutes.js
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendOTPEmail = require("../utils/mailer");
const User = require('../models/user')

const otpMap = new Map(); // email => OTP (can use Redis/db for production)

router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
    otpMap.set(email, otp.toString());

    try {
        await sendOTPEmail(email, otp);
        res.json({ message: "OTP sent to email" });
    } catch (err) {
        console.error("OTP sending failed:", err);
        res.status(500).json({ message: "OTP send failed" });
    }
});

// router.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;

//     // 1. Check if OTP exists and is valid
//     const user = await User.findOne({ email });

//     const validOTP = otpMap.get(email);
//     if (validOTP === otp) {
//         otpMap.delete(email);
//         res.json({ verified: true });
//         console.log(email);
//         const token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);

//         const isProduction = process.env.NODE_ENV === 'production';

//         // 3. Set JWT token in cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: isProduction,
//             sameSite: isProduction ? 'None' : 'Lax',
//             path: '/',
//         });
//     } else {
//         res.status(400).json({ verified: false, message: "Invalid OTP" });
//     }
// });

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    const validOTP = otpMap.get(email);
    console.log({ validOTP, otp, email });
    if (validOTP === otp) {
        otpMap.delete(email);

        const token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);
        const isProduction = process.env.NODE_ENV === 'production';

        // ✅ Set cookie first
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            path: '/',
            domain: isProduction ? '.onrender.com' : undefined
        });

        // ✅ Then send response
        return res.json({ verified: true });
    } else {
        return res.status(400).json({ verified: false, message: "Invalid OTP" });
    }
});


module.exports = router;
