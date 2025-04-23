const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const otpRoutes = require('./routes/otpRoutes');
const cookieParser = require('cookie-parser');
const ownerLoginCheck = require('./middlewares/adminMiddleware');
const userLoginCheck = require('./middlewares/authMiddleware');
const Bus = require('./models/bus')
const User = require('./models/user')
const Booking = require('./models/booking')
// const mongoose = require('./config/db')


dotenv.config();

app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser());
// app.use(cors()); // Enable CORS


const allowedOrigins = [
    'http://localhost:5173', // Local frontend
    'https://bus-system-1.onrender.com', // Deployed frontend on Vercel
];

// Configure CORS middleware
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true); // Allow request
//             } else {
//                 callback(new Error('Not allowed by CORS')); // Block request
//             }
//         },
//         credentials: true, // Allow cookies
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type', 'Authorization'],
//     })
// );

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Connect to MongoDB
const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 30000, })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// mongoose();
// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// GET /api/buses/routes

app.get("/search/buses", async (req, res) => {
    const buses = await Bus.find(); // adjust according to your schema
    const routes = buses.map(bus => ({
        from: bus.from,
        to: bus.to
    }));
    res.json(routes);
});

app.get('/alluser', async (req, res) => {
    let user = await User.find();
    res.json(user);
})

app.get('/allbooking', async (req, res) => {
    let user = await Booking.find();
    res.json(user);
})

app.get('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true, // Same options as when the cookie was set
            secure: process.env.NODE_ENV === 'production', // Use secure only in production
            sameSite: 'lax', // Match the sameSite policy you used while setting the cookie
        });
        res.status(200).json({ message: 'Logged out successfully', redirectTo: '/' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while logging out' });
    }
});

app.get('/user', userLoginCheck, (req, res) => {
    res.status(200).json({ message: 'Welcome user!' });
})

app.get('/admin', ownerLoginCheck, (req, res) => {
    res.status(200).json({ message: 'Welcome to the owner dashboard!' });
})

app.use('/auth', userRoutes)
app.use("/admin", adminRoutes);
app.use('/bus', busRoutes)
app.use('/booking', bookingRoutes)
app.use('/payment', paymentRoutes)
app.use('/auto', otpRoutes)

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
