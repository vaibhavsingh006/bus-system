const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    seatNumbers: { type: [Number], required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Pending' },
    travelDate: { type: Date },
    passengers: [
        {
            name: { type: String, required: true },
            age: { type: Number, required: true },
            gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
            seatNumber: { type: String, required: true },
        }
    ]
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;