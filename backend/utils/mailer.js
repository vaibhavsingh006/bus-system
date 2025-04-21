// utils/mailer.js
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // 👈 use your gmail
        pass: process.env.EMAIL_PASS,   // 👈 use Gmail app password (not your main pwd)
    },
});

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Your Bus Booking OTP",
        text: `Your OTP for bus booking is: ${otp}`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
