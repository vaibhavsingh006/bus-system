const mongoose = require("mongoose");

const busSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    bookedSeats: [{ type: Number }],
    daysOfOperation: [{ type: String, required: true }], // e.g., ["Monday", "Tuesday"]
    busNumber: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    seatType: { type: String, required: true }, // e.g., "Seater" or "Sleeper"
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);
module.exports = Bus;

// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     rating: { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String },
//   },
//   { timestamps: true }
// );

// const busSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     from: { type: String, required: true },
//     to: { type: String, required: true },
//     time: { type: String, required: true },

//     seats: { type: Number, required: true },
//     availableSeats: { type: Number, required: true },
//     price: { type: Number, required: true }, // base price (for reference)

//     seatConfiguration: {
//       seater: {
//         count: { type: Number, default: 0 },
//         price: { type: Number, default: 0 },
//       },
//       sleeper: {
//         count: { type: Number, default: 0 },
//         price: { type: Number, default: 0 },
//       },
//     },

//     amenities: [{ type: String }],
//     bookedSeats: [{ type: Number }],

//     daysOfOperation: [{ type: String, required: true }],

//     busNumber: { type: String, required: true, unique: true },
//     isActive: { type: Boolean, default: true },

//     seatType: {
//       type: String,
//       enum: ["Seater", "Sleeper", "Both"],
//       required: true,
//     },
//     duration: { type: String, required: true },

//     reviews: [reviewSchema],
//   },
//   { timestamps: true }
// );

// const Bus = mongoose.model("Bus", busSchema);
// module.exports = Bus;
