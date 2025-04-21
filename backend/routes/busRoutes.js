const express = require('express');
const router = express.Router();
const Bus = require("../models/bus.js")




// ✅ Public route to search buses by from, to, and date
router.get("/search-buses", async (req, res) => {
    try {
        const { from, to } = req.query;
        console.log("Query Params:", req.query);

        const query = {
            ...(from && { from: { $regex: new RegExp(from, "i") } }),
            ...(to && { to: { $regex: new RegExp(to, "i") } }),
        };

        const buses = await Bus.find(query).sort({ time: 1 }); // sorted by departure time


        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching buses", error: err.message });
    }
});


// ✅ Get bus details by ID (public)
router.get("/:id", async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        // console.log(bus);


        if (!bus) {

            return res.status(404).json({ message: "Bus not found" });
        }

        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bus", error: error.message });
    }
});


module.exports = router;