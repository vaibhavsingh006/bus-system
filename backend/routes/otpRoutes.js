

// // routes/otpRoutes.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendOTPEmail = require("../utils/mailer");
const User = require("../models/user");
// const fetch = require("node-fetch");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const isProduction = process.env.NODE_ENV === "production";

const otpMap = new Map(); // fallback local store for dev

// Upstash REST API helper functions
const setOtp = async (email, otp) => {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/otp:${email}/${otp}?EX=300`; // expire in 5 mins
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
    });
    const data = await res.json();
    return data;
};

const getOtp = async (email) => {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/otp:${email}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
    });
    const data = await res.json();
    return data.result;
};

const delOtp = async (email) => {
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/del/otp:${email}`;
    await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
    });
};

// Send OTP route
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    try {
        console.log("Sending OTP to:", email);
        if (isProduction) {
            console.log("Production mode - using Upstash REST API");
            await setOtp(email, otp);
        } else {
            console.log("Dev mode - using local Map");
            otpMap.set(email, otp);
        }

        await sendOTPEmail(email, otp);
        res.json({ message: "OTP sent to email" });
    } catch (err) {
        console.error("OTP sending failed:", err);
        res.status(500).json({ message: "OTP send failed" });
    }
});

// Verify OTP route
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        let validOTP;

        if (isProduction) {
            validOTP = await getOtp(email);
        } else {
            validOTP = otpMap.get(email);
        }

        console.log({ email, otp, validOTP });

        if (validOTP === otp) {
            // Remove OTP after verification
            if (isProduction) {
                await delOtp(email);
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

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const sendOTPEmail = require("../utils/mailer");
// const User = require('../models/user');
// const Redis = require('ioredis');

// const isProduction = process.env.NODE_ENV === 'production';

// let redisClient;
// const otpMap = new Map(); // for local fallback

// if (isProduction) {
//     redisClient = new Redis(process.env.REDIS_URL);
//     redisClient.on('connect', () => console.log('✅ Connected to Redis'));
//     redisClient.on('error', err => console.error('❌ Redis error:', err));
// }

// router.post("/send-otp", async (req, res) => {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

//     try {
//         console.log("Sending OTP to:", email);
//         if (isProduction) {
//             console.log("Production mode - using Redis");
//             await redisClient.setex(`otp:${email}`, 300, otp); // expire in 5 mins
//         } else {
//             console.log("Dev mode - using local Map");
//             otpMap.set(email, otp); // store locally
//         }

//         await sendOTPEmail(email, otp);
//         res.json({ message: "OTP sent to email" });
//     } catch (err) {
//         console.error("OTP sending failed:", err);
//         res.status(500).json({ message: "OTP send failed" });
//     }
// });

// router.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         return res.status(400).json({ message: "Email and OTP are required" });
//     }

//     try {
//         let validOTP;

//         if (isProduction) {
//             validOTP = await redisClient.get(`otp:${email}`);
//         } else {
//             validOTP = otpMap.get(email);
//         }

//         console.log({ email, otp, validOTP });

//         if (validOTP === otp) {
//             // ✅ Remove OTP after verification
//             if (isProduction) {
//                 await redisClient.del(`otp:${email}`);
//             } else {
//                 otpMap.delete(email);
//             }

//             return res.json({ verified: true });
//         } else {
//             return res.status(400).json({ verified: false, message: "Invalid OTP" });
//         }

//     } catch (err) {
//         console.error("OTP verification failed:", err);
//         return res.status(500).json({ message: "OTP verification error" });
//     }
// });

