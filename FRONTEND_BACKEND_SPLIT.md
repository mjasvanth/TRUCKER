# TAMIL TRUCKER REPAIR SYSTEM

Complete truck repair management system with frontend and backend separation.

## 📦 What's Included

### Frontend (`/frontend`)
- **7 HTML pages** for user and admin interfaces
- **Single CSS stylesheet** with responsive design
- **JavaScript logic** for form validation, GPS tracking, and data management
- All static assets ready to serve

### Backend (`/backend`)
- **Express.js API server** with complete route structure
- **4 route modules** (auth, users, services, admin)
- **4 controllers** for business logic
- **3 data models** (User, Service, Login)
- **Middleware** for authentication and logging
- **Environment configuration** (.env file)
- **Complete documentation** (README.md)

## 🚀 Getting Started

### Option 1: Frontend Only (Quick Demo)
```bash
# Navigate to frontend
cd frontend

# Open in browser
open index.html

# Or use a simple server
python -m http.server 8000
```

### Option 2: Full Stack (Frontend + Backend)
```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev

# Terminal 2: Start Frontend
cd frontend
python -m http.server 8000
```

## 📋 Main Features

### User Features
- ✅ Registration with OTP verification
- ✅ Login with GPS tracking
- ✅ Real-time location mapping
- ✅ Service request submission
- ✅ Profile management
- ✅ Dashboard with user info

### Admin Features
- ✅ Admin control panel
- ✅ View all users and logins
- ✅ Track user locations on map
- ✅ Manage service requests
- ✅ Export data (CSV)
- ✅ Clear all data

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin-login` | Admin login |
| GET | `/api/users` | Get all users |
| GET | `/api/services` | List services |
| POST | `/api/services/request` | Request service |
| GET | `/api/admin/dashboard` | Admin dashboard |

## 📁 File Structure

```
TRUCKER/
├── frontend/                   # Static frontend files
│   ├── *.html                 # 6 page templates
│   ├── style.css              # All styling
│   └── script.js              # All logic
│
├── backend/                    # Node.js API server
│   ├── server.js              # Entry point
│   ├── package.json           # Dependencies
│   ├── .env                   # Configuration
│   ├── routes/                # API routes (4 files)
│   ├── controllers/           # Logic handlers (4 files)
│   ├── middleware/            # Middleware (1 file)
│   ├── models/                # Data schemas (3 files)
│   └── README.md              # Backend docs
│
├── PROJECT_STRUCTURE.md       # This file
└── README.md                  # Main README
```

## 🎓 Next Steps

1. **Frontend**: Modify HTML templates and CSS for your branding
2. **Backend**: Set up MongoDB and implement database models
3. **Integration**: Connect frontend API calls to backend
4. **Deployment**: Deploy frontend to static hosting, backend to app server

## 🤝 Contributing

Feel free to extend both frontend and backend as needed.

## 📞 Questions?

See detailed documentation in:
- **Frontend**: Comments in `frontend/script.js` and HTML files
- **Backend**: `backend/README.md` for API details

---

**Project successfully split into frontend and backend! 🎉**
