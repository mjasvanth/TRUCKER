// =====================
// AUTHENTICATION CONTROLLER
// =====================

const registerUser = (email, fullname, phone, password) => {
    // In production:
    // 1. Hash password using bcrypt
    // 2. Validate email uniqueness
    // 3. Create user document in database
    // 4. Return user object (without password)
    return {
        email,
        fullname,
        phone,
        createdAt: new Date()
    };
};

const loginUser = (email, password) => {
    // In production:
    // 1. Find user by email
    // 2. Compare password with bcrypt
    // 3. Generate JWT token
    // 4. Return token and user info
    return {
        token: 'jwt_token_here',
        user: {
            email,
            id: 'user_id'
        }
    };
};

const loginAdmin = (email, password) => {
    // In production:
    // 1. Verify admin credentials
    // 2. Check role
    // 3. Generate admin JWT token
    // 4. Return token
    return {
        token: 'admin_jwt_token_here',
        admin: {
            email,
            role: 'admin'
        }
    };
};

module.exports = {
    registerUser,
    loginUser,
    loginAdmin
};
