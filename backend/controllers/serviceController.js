// =====================
// SERVICE CONTROLLER
// =====================

const getServices = () => {
    // In production: Query services from database
    return [
        {
            id: 1,
            name: 'Engine Diagnostics',
            description: 'Advanced computer scanning',
            price: 150
        },
        {
            id: 2,
            name: 'Brake & Suspension',
            description: 'Safety inspections',
            price: 200
        }
    ];
};

const getServiceById = (serviceId) => {
    // In production: Query service from database by ID
    return {
        id: serviceId,
        name: 'Service Name',
        description: 'Service Description'
    };
};

const requestService = (userId, serviceId, location, phone) => {
    // In production:
    // 1. Validate service and user
    // 2. Create service request record
    // 3. Store GPS location
    // 4. Notify admin
    return {
        requestId: 'req_' + Date.now(),
        serviceId,
        userId,
        status: 'pending',
        createdAt: new Date()
    };
};

const getUserRequests = (userId) => {
    // In production: Query user's service requests from database
    return [];
};

const updateRequest = (requestId, updates) => {
    // In production:
    // 1. Update request in database
    // 2. Notify user
    // 3. Return updated request
    return {
        requestId,
        ...updates
    };
};

module.exports = {
    getServices,
    getServiceById,
    requestService,
    getUserRequests,
    updateRequest
};
