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

// const sendOTPEmail = async (to, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject: "Your Bus Booking OTP",
//         text: `Your OTP for bus booking is: ${otp}`,
//     };

//     return transporter.sendMail(mailOptions);
// };

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: `"BusBooking Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: "🚌 Verify your email for Bus Booking - OTP Inside",
        text: `Your OTP for bus booking is: ${otp}. This OTP is valid for 5 minutes. If you did not request this, please ignore the message.`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #007bff;">Bus Booking Verification</h2>
                <p>Hello,</p>
                <p>We received a request to verify your email for booking a bus ticket.</p>
                <p style="font-size: 18px; margin: 20px 0;"><strong>Your OTP is:</strong></p>
                <p style="font-size: 32px; font-weight: bold; color: #333; text-align: center;">${otp}</p>
                <p>This OTP is valid for <strong>5 minutes</strong>.</p>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <br />
                <p style="font-size: 13px; color: #888;">Need help? Contact us at support@busbooking.com</p>
                <p style="font-size: 12px; color: #ccc;">&copy; ${new Date().getFullYear()} BusBooking Inc.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};


module.exports = sendOTPEmail;
