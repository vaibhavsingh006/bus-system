const express = require('express');
const router = express.Router();
const Bus = require("../models/bus.js")


// ✅ Public route to search buses by from, to, and date
// router.get("/search-buses", async (req, res) => {
//     try {
//         const { from, to, date } = req.query;
//         console.log("Query Params:", req.query);


//         // const query = { isActive: true };
//         const query = {};

//         if (from?.trim()) {
//             query.from = { $regex: new RegExp(`^${from.trim()}$`, "i") };
//         }

//         if (to?.trim()) {
//             query.to = { $regex: new RegExp(`^${to.trim()}$`, "i") };
//         }

//         // Day filter
//         if (date?.trim()) {
//             const selectedDate = new Date(date);
//             if (isNaN(selectedDate)) {
//                 return res.status(400).json({ message: "Invalid date format" });
//             }

//             const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
//             query.daysOfOperation = { $in: [dayOfWeek] };
//         }

//         console.log("Final Query:", query);

//         const all = await Bus.find();
//         console.log(all.length, 'buses')

//         const buses = await Bus.find(query) // sorted by departure time
//         console.log("Buses found:", buses.length);

//         res.json(buses);
//     } catch (err) {
//         res.status(500).json({ message: "Error fetching buses", error: err.message });
//     }
// });

const getNext7Days = () => {
    const days = [];
    const date = new Date();

    for (let i = 0; i < 7; i++) {
        // const day = date.toLocaleDateString("en-US", { weekday: "long" });
        // days.push(day);
        days.push({
            day: date.toLocaleDateString("en-US", { weekday: "long" }),
            date: date.toISOString().split("T")[0],
        });
        date.setDate(date.getDate() + 1);
    }

    return days;
};

router.get("/search-buses", async (req, res) => {
    try {
        const { from, to, date } = req.query;
        console.log("Query Params:", req.query);

        // Base query for from/to and active buses
        const baseQuery = {
            isActive: true,
        };

        if (from?.trim()) {
            baseQuery.from = { $regex: new RegExp(`^${from.trim()}$`, "i") };
        }

        if (to?.trim()) {
            baseQuery.to = { $regex: new RegExp(`^${to.trim()}$`, "i") };
        }

        let dayOfWeek = null;

        // If date is provided, try finding buses for that date
        if (date?.trim()) {
            const selectedDate = new Date(date);
            if (isNaN(selectedDate)) {
                return res.status(400).json({ message: "Invalid date format" });
            }

            dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
            const requestedDateStr = selectedDate.toISOString().split("T")[0];
            const query = {
                ...baseQuery,
                daysOfOperation: { $in: [dayOfWeek] },
            };

            let buses = await Bus.find(query);
            if (buses.length > 0) {
                console.log("Buses found (with date):", buses.length);
                return res.json({ buses, searchedDay: dayOfWeek, searchedDate: requestedDateStr });
            }

            // No buses for provided date, check next 7 days
            console.log(`No buses found on ${dayOfWeek}. Searching next 7 days...`);

            const next7Days = getNext7Days();
            for (let nextDay of next7Days) {
                if (nextDay === dayOfWeek) continue;

                const fallbackQuery = {
                    ...baseQuery,
                    daysOfOperation: { $in: [nextDay] },
                };

                buses = await Bus.find(fallbackQuery);
                if (buses.length > 0) {
                    return res.json({
                        buses,
                        searchedDay: nextDay,
                        message: `No buses found on ${dayOfWeek}. Showing buses for ${nextDay}`,
                    });
                }
            }

            return res.json({
                buses: [],
                searchedDay: null,
                message: `No buses found on ${dayOfWeek} or in the next 7 days.`,
            });

        } else {
            // If no date is provided, show buses available today
            const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
            const query = {
                ...baseQuery,
                daysOfOperation: { $in: [today] },
            };

            const buses = await Bus.find(query);
            console.log("Buses found (no date):", buses.length);
            return res.json({ buses, searchedDay: today });
        }

    } catch (err) {
        console.error("Error in /search-buses:", err);
        return res.status(500).json({ message: "Error fetching buses", error: err.message });
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