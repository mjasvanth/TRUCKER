# TRUCKER REPAIR - Backend API

Backend API service for the TRUCKER Truck Repair Management System.

## Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── users.js          # User management routes
│   ├── services.js       # Service routes
│   └── admin.js          # Admin routes
├── controllers/           # Business logic
│   ├── authController.js
│   ├── userController.js
│   ├── serviceController.js
│   └── adminController.js
├── middleware/            # Express middleware
│   └── auth.js           # Authentication & logging
├── models/               # Data models
│   ├── User.js
│   ├── Service.js
│   └── Login.js
└── README.md            # This file
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```
PORT=5000
HOST=localhost
NODE_ENV=development
```

3. **Start the server:**

   **Development (with auto-reload):**
   ```bash
   npm run dev
   ```

   **Production:**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /admin-login` - Admin login
- `POST /logout` - User logout

### User Routes (`/api/users`)
- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user account
- `GET /:id/location` - Get user's GPS location history

### Service Routes (`/api/services`)
- `GET /` - Get all available services
- `GET /:id` - Get service details
- `POST /request` - Request a service
- `GET /requests/:userId` - Get user's service requests
- `PUT /request/:requestId` - Update service request status

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get admin dashboard statistics
- `GET /logins` - Get all user login records
- `GET /locations` - Get all users' GPS locations
- `GET /users` - Get all users list
- `GET /services/requests` - Get all service requests
- `PUT /users/:userId` - Update user (admin)
- `DELETE /users/:userId` - Delete user (admin)
- `POST /export/data` - Export all data as CSV
- `DELETE /data` - Clear all data

## Environment Variables

```env
PORT              # Server port (default: 5000)
HOST              # Server host (default: localhost)
NODE_ENV          # Environment (development/production)
DATABASE_URL      # Database connection string (for production)
JWT_SECRET        # Secret key for JWT tokens (for production)
ADMIN_EMAIL       # Admin email credentials
ADMIN_PASSWORD    # Admin password credentials
```

## Database Setup (Production)

This backend is designed to work with MongoDB. In production:

1. Install MongoDB driver or Mongoose
2. Set up database connection in `.env`
3. Create database models with schema validation
4. Implement query methods for each model

## Authentication Flow

1. **User Registration**: POST `/api/auth/register` with credentials
2. **User Login**: POST `/api/auth/login` returns JWT token
3. **Token Usage**: Include token in Authorization header: `Bearer <token>`
4. **Admin Login**: POST `/api/auth/admin-login` returns admin token

## Data Models

### User
- fullname: String
- email: String (unique)
- phone: String
- password: String (hashed)
- location: String
- role: enum (user, admin)
- loginCount: Number
- lastLogin: Date
- verified: Boolean

### Service
- name: String
- description: String
- price: Number
- duration: String
- category: String
- active: Boolean

### Login Record
- userId: String
- email: String
- location: String
- gps: { latitude, longitude, accuracy }
- browserInfo: String
- deviceType: String
- timestamp: Date

## Error Handling

All endpoints return JSON responses:

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": {}
}
```

## Development Notes

- This is a template backend structure
- In production, implement proper database integration
- Add proper authentication/authorization middleware
- Implement input validation with Joi or similar
- Add comprehensive error handling
- Set up logging and monitoring
- Add rate limiting for API endpoints
- Implement CORS properly for frontend

## Testing

```bash
npm test
```

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] JWT authentication middleware
- [ ] Email notifications
- [ ] SMS notifications for OTP
- [ ] Real-time location tracking
- [ ] Service scheduling
- [ ] Payment integration
- [ ] Admin reporting
- [ ] User analytics
- [ ] API documentation with Swagger/OpenAPI
