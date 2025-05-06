const express = require('express');
const router = express.Router();
const Bus = require("../models/bus.js")


// ✅ Public route to search buses by from, to, and date
router.get("/search-buses", async (req, res) => {
    try {
        const { from, to, date } = req.query;
        console.log("Query Params:", req.query);


        // const query = { isActive: true };
        const query = {};

        if (from?.trim()) {
            query.from = { $regex: new RegExp(`^${from.trim()}$`, "i") };
        }

        if (to?.trim()) {
            query.to = { $regex: new RegExp(`^${to.trim()}$`, "i") };
        }

        // Day filter
        if (date?.trim()) {
            const selectedDate = new Date(date);
            if (isNaN(selectedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
            query.daysOfOperation = { $in: [dayOfWeek] };
        }

        console.log("Final Query:", query);


        // const query = {
        //     isActive: true,
        // };

        // if (from) {
        //     query.from = { $regex: new RegExp(from, "i") };
        // }

        // if (to) {
        //     query.to = { $regex: new RegExp(to, "i") };
        // }



        // if (date) {
        //     const selectedDate = new Date(date);
        //     if (isNaN(selectedDate)) {
        //         return res.status(400).json({ message: "Invalid date format" });
        //     }

        //     const options = { weekday: 'long' };
        //     const dayOfWeek = selectedDate.toLocaleDateString('en-US', options); // e.g., "Monday"
        //     query.daysOfOperation = dayOfWeek;
        // }


        // Convert date to day of the week
        // const selectedDate = new Date(date);
        // const options = { weekday: 'long' };
        // const dayOfWeek = selectedDate.toLocaleDateString('en-US', options); // e.g., "Monday"

        // Build query with regex matching and day filtering
        // const query = {
        //     ...(from && { from: { $regex: new RegExp(from, "i") } }),
        //     ...(to && { to: { $regex: new RegExp(to, "i") } }),
        //     daysOfOperation: dayOfWeek,
        //     isActive: true,
        // };


        const all = await Bus.find();
        console.log(all.length, 'buses')

        const buses = await Bus.find(query) // sorted by departure time
        console.log("Buses found:", buses.length);

        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching buses", error: err.message });
    }
});



router.get("/get-bus/:id", async (req, res) => {
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