require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// ROUTES
// =====================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// User routes
app.use('/api/users', require('./routes/users'));

// Service routes
app.use('/api/services', require('./routes/services'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));

// =====================
// ERROR HANDLING
// =====================
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// =====================
// SERVER INITIALIZATION
// =====================
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    console.log(`🚀 TRUCKER API Server running at http://${HOST}:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
