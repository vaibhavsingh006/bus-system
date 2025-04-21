const Owner = require('../models/admin.js');
const jwt = require('jsonwebtoken');



const ownerProtect = async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies.owner;
        console.log(token, 'owner')
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token (Replace `your_secret_key` with your actual JWT secret key)

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log(decoded)
        let user = await Owner.findOne({ email: decoded.email })
        if (!user) {
            return res.status(403).json({ message: 'Access denied. User ID mismatch.' });
        }
        // Add the decoded token data to the request object for further use
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = ownerProtect;
