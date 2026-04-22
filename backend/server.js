const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- SECURITY MIDDLEWARE ---
app.use(helmet({
    contentSecurityPolicy: false // Disabled for local dev to allow inline scripts in HTML
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(compression());
app.set('trust proxy', 1); 

// --- CORS ---
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin
    credentials: true // Important for cookies
}));

// --- BODY PARSING ---
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// --- DATABASE CONNECTION ---
const connectDB = require('./config/db');
connectDB();

// --- ROUTES ---
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Routes are now at /api/auth/...

// --- STATIC FILES ---
// Serves your HTML file from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// --- ROOT REDIRECT ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages', 'index.html'));
});

// --- GLOBAL ERROR HANDLING ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something broke on the server!' });
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});