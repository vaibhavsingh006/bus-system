const mongoose = require('mongoose')


const busSchema = mongoose.Schema({
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    bookedSeats: [{ type: Number }],
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
