const express = require('express');
const router = express.Router();

// =====================
// SERVICE ROUTES
// =====================

/**
 * GET /api/services
 * Get all available services
 */
router.get('/', (req, res) => {
    try {
        const services = [
            {
                id: 1,
                name: 'Engine Diagnostics',
                description: 'Advanced computer scanning for all major heavy-duty brands'
            },
            {
                id: 2,
                name: 'Brake & Suspension',
                description: 'Full safety inspections and air brake system repairs'
            },
            {
                id: 3,
                name: 'Preventative Maintenance',
                description: 'Oil changes, filter replacements, and fleet health checks'
            },
            {
                id: 4,
                name: 'Transmission Repair',
                description: 'Complete transmission overhauls and clutch service'
            },
            {
                id: 5,
                name: 'Electrical Systems',
                description: 'Battery, alternator, and starter diagnostics and repair'
            },
            {
                id: 6,
                name: '24/7 Roadside Assistance',
                description: 'Emergency breakdown service and towing available'
            }
        ];

        res.json({
            message: 'Services retrieved successfully',
            services: services
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/services/:id
 * Get service details by ID
 */
router.get('/:id', (req, res) => {
    try {
        const serviceId = req.params.id;

        // In production: Query service from database

        res.json({
            message: 'Service retrieved successfully',
            service: {
                id: serviceId,
                name: 'Service Name',
                description: 'Service description',
                price: '$100.00',
                duration: '2 hours'
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/services/request
 * Request a service
 */
router.post('/request', (req, res) => {
    try {
        const { userId, serviceId, location, phone, notes } = req.body;

        // In production:
        // 1. Verify user token
        // 2. Validate service exists
        // 3. Create service request in database
        // 4. Store GPS location data
        // 5. Send notification to admin

        res.status(201).json({
            message: 'Service request submitted successfully',
            request: {
                id: 'req_' + Date.now(),
                serviceId: serviceId,
                userId: userId,
                status: 'pending',
                location: location,
                requestTime: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/services/requests/:userId
 * Get user's service requests
 */
router.get('/requests/:userId', (req, res) => {
    try {
        const userId = req.params.userId;

        // In production:
        // 1. Verify user token
        // 2. Query user's service requests from database
        // 3. Return list with status

        res.json({
            message: 'Service requests retrieved',
            requests: []
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * PUT /api/services/request/:requestId
 * Update service request status
 */
router.put('/request/:requestId', (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { status, notes } = req.body;

        // In production:
        // 1. Verify admin token
        // 2. Update request status in database
        // 3. Send notification to user
        // 4. Return updated request

        res.json({
            message: 'Service request updated',
            request: {
                id: requestId,
                status: status,
                notes: notes
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
