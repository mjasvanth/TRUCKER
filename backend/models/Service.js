// =====================
// SERVICE MODEL
// =====================

const serviceSchema = {
    id: String,
    name: String,
    description: String,
    price: Number,
    duration: String,
    category: String,
    active: {
        type: Boolean,
        default: true
    }
};

/**
 * Get all services
 */
const getServices = () => {
    // In production: Query database
    return [];
};

/**
 * Get service by ID
 */
const getServiceById = (serviceId) => {
    // In production: Query database
    return null;
};

/**
 * Create service request
 */
const createServiceRequest = (requestData) => {
    // In production: Save to database
    return {
        id: 'req_' + Date.now(),
        ...requestData,
        status: 'pending',
        createdAt: new Date()
    };
};

/**
 * Get user's service requests
 */
const getUserServiceRequests = (userId) => {
    // In production: Query database
    return [];
};

/**
 * Update service request
 */
const updateServiceRequest = (requestId, updates) => {
    // In production: Update in database
    return {
        id: requestId,
        ...updates,
        updatedAt: new Date()
    };
};

module.exports = {
    serviceSchema,
    getServices,
    getServiceById,
    createServiceRequest,
    getUserServiceRequests,
    updateServiceRequest
};
