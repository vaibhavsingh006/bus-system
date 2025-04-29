const mongoose = require('mongoose')


const busSchema = mongoose.Schema({
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    time: { type: String, required: true }, // Only time, no date
    seats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    bookedSeats: [{ type: Number }],
    daysOfOperation: [{ type: String, required: true }], // e.g., ["Monday", "Tuesday"]
    busNumber: { type: String, required: true, unique: true }, // add unique bus number
    isActive: { type: Boolean, default: true }, // Bus running or not
    seatType: { type: String, required: true }, // "Seater" or "Sleeper"
    duration: { type: String, required: true },
}, { timestamps: true });


const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
