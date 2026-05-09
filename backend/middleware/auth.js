// =====================
// AUTHENTICATION MIDDLEWARE
// =====================

/**
 * Verify JWT token
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // In production: Verify JWT signature and expiration
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

/**
 * Verify admin role
 */
const verifyAdmin = (req, res, next) => {
    // In production: Check if user has admin role
    // if (req.user.role !== 'admin') {
    //     return res.status(403).json({ error: 'Admin access required' });
    // }
    next();
};

/**
 * Error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
};

/**
 * Logging middleware
 */
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
};

module.exports = {
    verifyToken,
    verifyAdmin,
    errorHandler,
    requestLogger
};
