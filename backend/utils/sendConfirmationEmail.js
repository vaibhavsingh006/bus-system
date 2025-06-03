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

        //     const mailOptions = {
        //         from: `"BusBooking" <${process.env.EMAIL_USER}>`,
        //         to: toEmail,
        //         subject: "Booking Confirmation - Bus Ticket",
        //         html: `
        //     <h2>Thank you for your booking!</h2>
        //     <p><strong>Bus:</strong> ${booking.bus.name}</p>
        //     <p><strong>From:</strong> ${booking.bus.from} <strong>To:</strong> ${booking.bus.to}</p>
        //     <p><strong>Date:</strong> ${booking.bus.date}</p>
        //     <p><strong>Seats:</strong> ${booking.seatNumbers.join(", ")}</p>
        //     <p><strong>Total Paid:</strong> ₹${payment.amount}</p>
        //     <p>Your booking ID is: <strong>${booking._id}</strong></p>
        //     <hr/>
        //     <p>If you have any questions, reply to this email.</p>
        //   `,
        //     };


        const mailOptions = {
            from: `"BusBooking" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "🚌 Booking Confirmed – Your Bus Ticket Details",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; padding: 20px;">
                    <h2 style="color: #2e86de;">✅ Booking Confirmed!</h2>
                    <p>Hi there,</p>
                    <p>Thank you for booking with <strong>BusGo</strong>. Here are your ticket details:</p>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 8px;"><strong>Bus Name:</strong></td>
                            <td style="padding: 8px;">${booking.bus.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Route:</strong></td>
                            <td style="padding: 8px;">${booking.bus.from} → ${booking.bus.to}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Date of Journey:</strong></td>
                            <td style="padding: 8px;">${booking.travelDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Seats Booked:</strong></td>
                            <td style="padding: 8px;">${booking.seatNumbers.join(", ")}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Amount Paid:</strong></td>
                            <td style="padding: 8px;">₹${payment.amount}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Booking ID:</strong></td>
                            <td style="padding: 8px;">${booking._id}</td>
                        </tr>
                    </table>

                    <p style="margin-top: 20px;">📩 A copy of your ticket has been sent to your email.</p>
                    <p>🕒 Please arrive at the boarding point at least 15 minutes before departure.</p>
                    <p style="color: #999; font-size: 12px;">
                        Need help? Contact our support team at <strong>vaibhavsinghchandel20@gmail.com</strong> or call <strong>+91-7991652863</strong>.
                    </p>
                    <p style="color: #999; font-size: 11px;">
                        Cancellation or changes can be done up to 2 hours before departure, as per our policy.
                    </p>

                    <p style="margin-top: 30px; font-size: 14px;">Thanks for choosing BusGo. Have a safe journey! 🚍</p>

                    <hr style="margin: 20px 0;" />
                    <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} BusBooking Pvt Ltd</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to:", toEmail);
    } catch (err) {
        console.error("Error sending confirmation email:", err);
    }
};

module.exports = sendConfirmationEmail;
