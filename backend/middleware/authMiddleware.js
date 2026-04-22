const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // <--- REQUIRED to query User model

// ADDED 'async' HERE
const protect = async (req, res, next) => {
    let token;

    // 1. Check Headers (for Mobile/API)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    // 2. Check Cookies (for Browser/Web)
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user in DB and attach to req
        // Now 'await' is valid because the function is async
        req.user = await mongoose.model('User').findById(decoded.userId).select('-password');
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = protect;