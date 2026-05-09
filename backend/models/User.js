// =====================
// USER MODEL
// =====================

const userSchema = {
    id: String,
    fullname: String,
    email: String,
    phone: String,
    password: String, // Hashed
    location: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    loginCount: {
        type: Number,
        default: 0
    },
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
    verified: {
        type: Boolean,
        default: false
    }
};

/**
 * Create a new user
 */
const createUser = (userData) => {
    // In production: Use mongoose or database library
    return {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
    };
};

/**
 * Find user by email
 */
const findUserByEmail = (email) => {
    // In production: Query database
    return null;
};

/**
 * Find user by ID
 */
const findUserById = (userId) => {
    // In production: Query database
    return null;
};

/**
 * Update user
 */
const updateUser = (userId, updates) => {
    // In production: Update in database
    return {
        id: userId,
        ...updates,
        updatedAt: new Date()
    };
};

/**
 * Delete user
 */
const deleteUser = (userId) => {
    // In production: Delete from database
    return true;
};

module.exports = {
    userSchema,
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    deleteUser
};
