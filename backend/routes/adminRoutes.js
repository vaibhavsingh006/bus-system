const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require("../models/admin.js");
const Bus = require("../models/bus.js");
const Payment = require("../models/payment.js");
const Passenger = require("../models/passenger.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const ownerProtect = require("../middlewares/adminMiddleware.js");

// Register (Signup) Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let ownerLength = await Owner.find();
    if (ownerLength.length >= 2) {
      return res
        .status(400)
        .json({ message: 'You don"t create more than 2 owner' });
    }

    // Check if owner already exists
    let owner = await Owner.findOne({ email });
    if (owner) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(salt, "-- ---here");
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt, "-- ---here22");

    // Create a new owner
    owner = new Owner({
      username,
      email,
      password: hashedPassword,
    });

    // Save the owner in the database
    await owner.save();

    // Generate a JWT token
    const token = jwt.sign({ email, id: owner._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    // Send success response along with token
    res
      .status(201)
      .json({ message: "Signup successful", token, redirectTo: "/ownerlogin" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find owner by email
    let owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, owner.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign({ email, id: owner._id }, process.env.JWT_KEY);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("owner", token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: isProduction ? true : false,
      sameSite: isProduction ? "None" : "Lax",
      path: "/",
    });
    // res.cookie('owner', token, { httpOnly: true });

    // Return success response with token
    res.status(200).json({
      message: "Owner Login successful",
      token,
      redirectTo: "/addbus",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all bookings (protected)
router.get("/all-bookings", ownerProtect, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/allbus", ownerProtect, async (req, res) => {
  try {
    const allbus = await Bus.find();
    res.json(allbus);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/allpayment", ownerProtect, async (req, res) => {
  try {
    const allpayment = await Payment.find();
    res.json(allpayment);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/allpassenger", ownerProtect, async (req, res) => {
  try {
    const allpassenger = await Passenger.find();
    res.json(allpassenger);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/alluser", ownerProtect, async (req, res) => {
  try {
    const alluser = await User.find();
    res.json(alluser);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

// ✅ Add a new bus
router.post("/add-bus", ownerProtect, async (req, res) => {
  try {
    const {
      name,
      from,
      to,
      time,
      seats,
      price,
      amenities,
      busNumber,
      daysOfOperation,
      seatType,
      duration,
    } = req.body;

    // Validate required fields manually
    if (
      !name ||
      !from ||
      !to ||
      !time ||
      !seats ||
      !price ||
      !busNumber ||
      !daysOfOperation ||
      !seatType ||
      !duration
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if busNumber already exists
    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({ message: "Bus number already exists" });
    }

    const newBus = new Bus({
      name,
      from,
      to,
      time,
      seats,
      availableSeats: seats,
      price,
      amenities,
      busNumber,
      daysOfOperation,
      seatType,
      duration,
      isActive: true, // Default true on creation
    });

    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (err) {
    res.status(500).json({ message: "Error adding bus", error: err.message });
  }
});

router.get("/get-bus/:id", ownerProtect, async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ bus });
  } catch (error) {
    console.error("Error fetching bus:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a bus
router.put("/update-bus/:id", ownerProtect, async (req, res) => {
  try {
    const { busNumber, seats } = req.body;

    if (busNumber) {
      // If busNumber is being updated, check if it's unique
      const existingBus = await Bus.findOne({
        busNumber,
        _id: { $ne: req.params.id },
      });
      if (existingBus) {
        return res.status(400).json({ message: "Bus number already exists" });
      }
    }

    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Update all fields from req.body
    Object.assign(bus, req.body);

    // Agar seats update ho rahi hai, to availableSeats ko adjust karo
    if (seats !== undefined) {
      const bookedSeatsCount = bus.bookedSeats.length;
      bus.availableSeats = seats - bookedSeatsCount;
    }

    await bus.save();

    res.json({ message: "Bus updated successfully", bus });
  } catch (err) {
    console.error("Error updating bus", err);
    res.status(500).json({ message: "Error updating bus", error: err.message });
  }
});

// ✅ Delete a bus
router.delete("/delete-bus/:id", ownerProtect, async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);

    if (!deletedBus) return res.status(404).json({ message: "Bus not found" });

    res.json({ message: "Bus deleted successfully", bus: deletedBus });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bus", error: err.message });
  }
});

module.exports = router;
