// utils/sendConfirmationEmail.js
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config();

const sendConfirmationEmail = async (toEmail, booking, payment) => {
    try {
        // Configure the transporter (use your real credentials here)
        const transporter = nodemailer.createTransport({
            service: "Gmail", // or "Outlook", "Yahoo", etc.
            auth: {
                user: process.env.EMAIL_USER, // e.g., your Gmail
                pass: process.env.EMAIL_PASS, // app-specific password
            },
        });

        const mailOptions = {
            from: `"BusBooking" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Booking Confirmation - Bus Ticket",
            html: `
        <h2>Thank you for your booking!</h2>
        <p><strong>Bus:</strong> ${booking.bus.name}</p>
        <p><strong>From:</strong> ${booking.bus.from} <strong>To:</strong> ${booking.bus.to}</p>
        <p><strong>Date:</strong> ${booking.bus.date}</p>
        <p><strong>Seats:</strong> ${booking.seatNumbers.join(", ")}</p>
        <p><strong>Total Paid:</strong> ₹${payment.amount}</p>
        <p>Your booking ID is: <strong>${booking._id}</strong></p>
        <hr/>
        <p>If you have any questions, reply to this email.</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to:", toEmail);
    } catch (err) {
        console.error("Error sending confirmation email:", err);
    }
};

module.exports = sendConfirmationEmail;
