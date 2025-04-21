const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    contact: Number,
    confirmPayments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    ]
})

const User = mongoose.model('User', userSchema)
module.exports = User;