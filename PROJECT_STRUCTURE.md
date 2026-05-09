# TRUCKER REPAIR SYSTEM - Full Stack Application

A comprehensive truck repair management system with separate frontend and backend architecture.

## 📁 Project Structure

```
TRUCKER/
├── frontend/                    # React/Vue frontend application
│   ├── index.html              # Landing page
│   ├── login.html              # User login
│   ├── signup.html             # User registration
│   ├── dashboard.html          # User dashboard
│   ├── admin-login.html        # Admin login
│   ├── admin-dashboard.html    # Admin control panel
│   ├── style.css               # Global styles
│   └── script.js               # Client-side JavaScript
│
├── backend/                     # Node.js/Express API server
│   ├── server.js               # Main server entry point
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables
│   ├── README.md               # Backend documentation
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Authentication routes
│   │   ├── users.js           # User management
│   │   ├── services.js        # Service endpoints
│   │   └── admin.js           # Admin routes
│   ├── controllers/             # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── serviceController.js
│   │   └── adminController.js
│   ├── middleware/              # Express middleware
│   │   └── auth.js            # Auth & logging
│   ├── models/                  # Data models
│   │   ├── User.js
│   │   ├── Service.js
│   │   └── Login.js
│
├── README.md                    # This file
└── .gitignore

```

## 🚀 Quick Start

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Open in browser:**
- Static HTML application - simply open `index.html` in a browser
- Or use a simple HTTP server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server .
```

3. **Access the application:**
- Home: http://localhost:8000
- User Login: http://localhost:8000/login.html
- User Signup: http://localhost:8000/signup.html
- User Dashboard: http://localhost:8000/dashboard.html
- Admin Login: http://localhost:8000/admin-login.html
- Admin Dashboard: http://localhost:8000/admin-dashboard.html

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
# Edit .env file with your settings
# PORT=5000
# NODE_ENV=development
```

4. **Start the server:**

   **Development (with auto-reload):**
   ```bash
   npm run dev
   ```

   **Production:**
   ```bash
   npm start
   ```

5. **API will be available at:**
```
http://localhost:5000/api
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/location` - Get user locations

### Services
- `GET /api/services` - List all services
- `POST /api/services/request` - Request a service
- `GET /api/services/requests/:userId` - User's requests

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/logins` - Login records
- `GET /api/admin/locations` - User locations
- `GET /api/admin/users` - All users
- `POST /api/admin/export/data` - Export data

## 🎯 Features

### Frontend
✅ User authentication (registration & login)
✅ Email & phone validation
✅ OTP verification
✅ GPS location tracking
✅ Service request submission
✅ User dashboard with profile
✅ Real-time location mapping
✅ Admin login & control panel
✅ Admin data management
✅ Data export (CSV)

### Backend
✅ User management API
✅ Service management API
✅ Admin control endpoints
✅ Authentication scaffolding
✅ Error handling
✅ CORS support
✅ Environment configuration
✅ Structured project layout

## 🔐 Default Admin Credentials

```
Email: mjasvanth85@gmail.com
Password: admin123
```

⚠️ **Important:** Change these in production!

## 🛠 Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage & SessionStorage for data persistence

### Backend
- Node.js
- Express.js
- CORS middleware
- dotenv for configuration

### Future Integration
- MongoDB (database)
- JWT (authentication)
- Bcrypt (password hashing)
- Joi (validation)

## 📝 Development Notes

### Frontend
- Currently uses browser's localStorage for user data
- GPS location tracking via Geolocation API
- In production, connect to backend API endpoints
- Update API endpoints in `script.js`

### Backend
- Template structure ready for database integration
- Middleware scaffolding in place
- Controllers and models prepared
- Ready for MongoDB integration with Mongoose

## 🔄 Integration Steps

To fully integrate frontend with backend:

1. **Install database** (MongoDB):
   ```bash
   cd backend
   npm install mongoose
   ```

2. **Connect frontend API calls** to backend:
   - Replace localStorage with API calls
   - Update `script.js` to use fetch/axios

3. **Implement database models:**
   - User model with Mongoose
   - Service model
   - Login records model

4. **Add authentication middleware:**
   - JWT token generation
   - Token verification
   - Admin role checking

5. **Deploy:**
   - Frontend: Static hosting (Netlify, Vercel, GitHub Pages)
   - Backend: Node hosting (Heroku, AWS, DigitalOcean)

## 📚 Documentation

- **Frontend**: See inline comments in `script.js` and HTML files
- **Backend**: See [backend/README.md](backend/README.md) for detailed API documentation

## 🐛 Troubleshooting

### Frontend not connecting to backend
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify API endpoints in frontend code

### Backend won't start
- Check Node.js version: `node --version`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 5000 is available

### GPS not working
- Allow browser location permission
- Use HTTPS in production (required for Geolocation API)
- Check browser console for errors

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 👤 Author

TRUCKER Repair Services

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy coding! 🚛**
