// routes/otpRoutes.js
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const sendOTPEmail = require("../utils/mailer");
const User = require('../models/user');
const Redis = require('ioredis');

const isProduction = process.env.NODE_ENV === 'production';

let redisClient;
const otpMap = new Map(); // for local fallback

if (isProduction) {
    redisClient = new Redis(process.env.REDIS_URL);
    redisClient.on('connect', () => console.log('✅ Connected to Redis'));
    redisClient.on('error', err => console.error('❌ Redis error:', err));
}

router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    try {
        if (isProduction) {
            await redisClient.setex(`otp:${email}`, 300, otp); // expire in 5 mins
        } else {
            otpMap.set(email, otp); // store locally
        }

        await sendOTPEmail(email, otp);
        res.json({ message: "OTP sent to email" });
    } catch (err) {
        console.error("OTP sending failed:", err);
        res.status(500).json({ message: "OTP send failed" });
    }
});

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        let validOTP;

        if (isProduction) {
            validOTP = await redisClient.get(`otp:${email}`);
        } else {
            validOTP = otpMap.get(email);
        }

        console.log({ email, otp, validOTP });

        if (validOTP === otp) {
            // ✅ Remove OTP after verification
            if (isProduction) {
                await redisClient.del(`otp:${email}`);
            } else {
                otpMap.delete(email);
            }

            return res.json({ verified: true });
        } else {
            return res.status(400).json({ verified: false, message: "Invalid OTP" });
        }

    } catch (err) {
        console.error("OTP verification failed:", err);
        return res.status(500).json({ message: "OTP verification error" });
    }
});



// router.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     console.log(user);
//     if (!user) return res.status(404).json({ verified: false, message: "User not found" });

//     let validOTP;
//     try {
//         validOTP = isProduction
//             ? await redisClient.get(`otp:${email}`)
//             : otpMap.get(email);
//     } catch (err) {
//         return res.status(500).json({ message: "OTP check failed" });
//     }

//     console.log({ validOTP, otp, email });

//     if (validOTP === otp) {
//         if (isProduction) {
//             await redisClient.del(`otp:${email}`);
//         } else {
//             otpMap.delete(email);
//         }

//         const token = jwt.sign({ email, id: user._id }, process.env.JWT_KEY);

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: isProduction,
//             sameSite: isProduction ? 'None' : 'Lax',
//             path: '/',
//             domain: isProduction ? '.onrender.com' : undefined,
//         });

//         return res.json({ verified: true });
//     } else {
//         return res.status(400).json({ verified: false, message: "Invalid OTP" });
//     }
// });

module.exports = router;
