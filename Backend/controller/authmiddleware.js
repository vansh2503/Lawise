// controller/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id); // assuming you stored user ID in the token
        if (!req.user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = authMiddleware;
