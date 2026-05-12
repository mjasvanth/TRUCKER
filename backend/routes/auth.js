const express = require('express');
const router = express.Router();
const { forgotPassword, resetPasswordWithToken } = require('../controllers/authController');

// =====================
// AUTHENTICATION ROUTES
// =====================

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // In production, validate against database
        // Hash password before storing
        // Save to database

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: email,
                fullname: fullname,
                phone: phone
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/auth/login
 * User login
 */
router.post('/login', (req, res) => {
    try {
        const { email, password, location } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // In production:
        // 1. Find user by email in database
        // 2. Verify password
        // 3. Generate JWT token
        // 4. Return token and user info

        res.json({
            message: 'Login successful',
            token: 'sample_jwt_token_here',
            user: {
                email: email,
                location: location
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/auth/admin-login
 * Admin login
 */
router.post('/admin-login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate admin credentials
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // In production:
        // 1. Verify admin credentials
        // 2. Check admin role in database
        // 3. Generate JWT token
        // 4. Return admin token

        res.json({
            message: 'Admin login successful',
            token: 'admin_jwt_token_here',
            admin: {
                email: email,
                role: 'admin'
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout', (req, res) => {
    try {
        // In production, invalidate token (blacklist or revoke)
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/auth/forgot-password
 * Request password reset email
 */
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                error: 'Email is required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email address'
            });
        }

        // In production, check if user exists
        // if (!(await User.findOne({ email }))) {
        //     return res.status(404).json({
        //         error: 'User not found with this email'
        //     });
        // }

        // Send password reset email
        const result = await forgotPassword(email);

        res.json(result);
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            error: error.message || 'Failed to process password reset request'
        });
    }
});

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post('/reset-password', async (req, res) => {
    try {
        const { token, email, password, confirmPassword } = req.body;

        // Validate input
        if (!token || !email || !password || !confirmPassword) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email address'
            });
        }

        // Check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: 'Passwords do not match'
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long'
            });
        }

        // Reset password with token
        const result = await resetPasswordWithToken(token, email, password);

        res.json(result);
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(400).json({
            error: error.message || 'Failed to reset password'
        });
    }
});

module.exports = router;
