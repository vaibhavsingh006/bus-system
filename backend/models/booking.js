const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    seatNumbers: { type: [Number], required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Pending' },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

