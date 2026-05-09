# 🚚 TRUCKER - Truck Repair Management System

## 📌 Overview

**TRUCKER** is a comprehensive truck repair and maintenance management system designed for service providers and truck owners. It features user registration, real-time GPS tracking, service request management, and admin controls—all with **data privacy at the core**.

### Key Selling Point: 🔒 **All Data Stored Locally Only**
- ✅ No external servers
- ✅ No data transmission
- ✅ Complete user privacy
- ✅ Works offline
- ✅ Full user control

---

## 🎯 Features

### 👥 User Features
- **User Registration** - Simple signup with OTP verification
- **User Authentication** - Secure login with email/password
- **GPS Tracking** - Real-time location capture with accuracy
- **Service Requests** - Request 6 different repair services
- **User Dashboard** - View profile and service history
- **Location Services** - Google Maps integration for coordinates

### 🔧 Admin Features
- **Admin Login** - Separate admin portal with authentication
- **User Management** - View all registered users
- **Analytics Dashboard** - Statistics cards showing:
  - Total registered users
  - Total login attempts
  - Service requests count
  - Today's login count
- **Data Management** - View and search:
  - User login history
  - Service requests
  - GPS locations with maps
  - User profiles
- **Data Export** - Download data as CSV
- **Data Clearing** - Clear all data with confirmation

---

## 📁 Project Structure

```
TRUCKER/
├── 📄 index.html              # Landing page with services grid
├── 📄 login.html              # User login page
├── 📄 signup.html             # User registration with OTP
├── 📄 dashboard.html          # User dashboard
├── 📄 admin-login.html        # Admin authentication
├── 📄 admin-dashboard.html    # Admin control panel
├── 🎨 style.css               # Unified styling (responsive)
├── 💻 script.js               # All frontend logic
├── 📁 frontend/               # Frontend copy for separation
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   ├── style.css
│   └── script.js
├── 📁 backend/                # Backend Express.js server
│   ├── server.js              # Express entry point
│   ├── package.json           # Dependencies
│   ├── .env                   # Configuration
│   ├── 📁 routes/             # API route handlers
│   ├── 📁 controllers/        # Business logic
│   ├── 📁 middleware/         # Auth & error handling
│   └── 📁 models/             # Data models
├── 📄 LOCAL_DATA_STORAGE.md   # Data privacy guide
├── 📄 README.md               # This file
└── 📄 .gitignore              # Git configuration
```

---

## 🚀 Quick Start

### Option 1: Frontend Only (Recommended for Testing)
1. Open `index.html` in a web browser
2. All features work immediately with local data storage
3. No setup or dependencies required

### Option 2: With Backend Server
1. Navigate to backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Start the backend:
   ```bash
   npm start
   ```
3. Open `index.html` in browser (or serve from backend)

---

## 🔐 Data Storage

### All Data is Local-Only ✅
- User registrations → localStorage
- Login records → localStorage with timestamps
- Service requests → localStorage
- GPS coordinates → localStorage
- Admin analytics → calculated from localStorage

### Storage Locations
- **Chrome**: `C:\Users\[Username]\AppData\Local\Chrome\User Data\Local Storage`
- **Firefox**: `C:\Users\[Username]\AppData\Roaming\Mozilla\Firefox\Profiles\[Profile]\storage`
- **Safari**: `~/Library/Safari/LocalStorage`

### Storage Limits
- Chrome/Firefox/Edge: **10 MB** per domain
- Safari: **5 MB** per domain

📖 **See [LOCAL_DATA_STORAGE.md](LOCAL_DATA_STORAGE.md) for complete details**

---

## 👤 Demo Credentials

### Admin Login
- **Email**: `admin@mjasvanth85@gmail.com`
- **Password**: `admin123`

### Test User Account
- Create your own during signup (OTP auto-displays)
- Or use: `test@example.com` / `password123`

---

## 🎨 Design System

### Color Scheme
- **Primary**: Safety Orange (#ff6600)
- **Dark**: Charcoal (#1a1a1a)
- **Light**: Off-white (#f4f4f4)
- **Accent**: Dark Red (#8b0000)

### Typography
- **Headers**: Bold, high contrast
- **Body**: Clean, readable on all devices
- **Responsive**: Mobile-first approach

### Components
- Navigation bar with logo
- Hero section with background image
- Service request cards
- Admin statistics dashboard
- Data tables with search/filter
- Modal dialogs
- Forms with validation

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with flexbox/grid
- **JavaScript (ES6+)** - Vanilla JS (no frameworks)
- **LocalStorage API** - Client-side data persistence
- **Geolocation API** - GPS coordinates
- **Favicon** - SVG truck icon

### Backend (Template Ready)
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database (ready to integrate)
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Configuration

---

## 📊 Data Flow

```
User Input
    ↓
JavaScript Validation
    ↓
localStorage/sessionStorage
    ↓
Admin Dashboard Display
    ↓
(Optional) Backend API Calls
    ↓
(Optional) MongoDB Database
```

**Current**: Stops at localStorage
**Future**: Can integrate backend and database

---

## 🔒 Security Features

### Privacy First 🎯
- ✅ Zero external data transmission
- ✅ No tracking or analytics
- ✅ No third-party services
- ✅ Offline capable
- ✅ User-controlled data clearing

### Input Validation
- Email format validation
- Phone number validation (10+ digits)
- Password strength requirements
- OTP verification for signup
- Location input validation

### Future Enhancements
- [ ] Client-side encryption
- [ ] Password hashing (bcryptjs)
- [ ] JWT tokens
- [ ] HTTPS only
- [ ] Rate limiting
- [ ] CSRF protection

---

## 📱 Responsive Design

Optimized for all devices:
- **Desktop**: Full layout (1024px+)
- **Tablet**: Optimized grid (768px - 1024px)
- **Mobile**: Stacked layout (below 768px)

---

## 🐛 Troubleshooting

### "Data Not Saving"
- Check if browser localStorage is enabled
- Not in private/incognito mode
- Check browser console for errors

### "GPS Not Working"
- Allow location permission when prompted
- Check if device has GPS/location services
- May not work in private browsing mode

### "Admin Dashboard Empty"
- Create users and make service requests first
- Make sure you're logged in as admin
- Data should populate after first user signup

### "Page Not Loading"
- Check all files are in same directory
- Verify HTML/CSS/JS file names match links
- Check browser console for 404 errors

---

## 📋 File Descriptions

### Frontend Files

**index.html** - Landing page
- Hero section with background
- 6 service cards (Engine, Brake, etc.)
- Call-to-action buttons
- Navigation to login/signup

**login.html** - User authentication
- Email and password fields
- Location input
- "Remember me" checkbox
- Form validation
- Redirect to dashboard on success

**signup.html** - User registration
- Name, email, phone, location fields
- OTP verification system
- Account creation workflow
- Redirect to login after signup

**dashboard.html** - User dashboard
- User profile display
- GPS coordinates with accuracy
- Google Maps link
- 6 service request buttons
- Service history

**admin-login.html** - Admin authentication
- Admin-only credentials
- Redirect to admin dashboard
- Form validation

**admin-dashboard.html** - Admin control panel
- 4 tabs: Logins, Services, Locations, Users
- Statistics cards
- Data tables with search
- CSV export button
- Clear all data option
- **Local storage notice** for data privacy

### Backend Files

**server.js** - Express entry point
**package.json** - Dependencies list
**.env** - Configuration
**/routes/** - API endpoints
**/controllers/** - Business logic
**/middleware/** - Auth & error handling
**/models/** - Data schemas

---

## 📝 Environment Setup

### Frontend (No Setup Required)
Just open `index.html` in browser

### Backend (Optional)
```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Edit .env with your settings

# Start development server
npm run dev

# Start production server
npm start
```

---

## 📊 Future Roadmap

- [ ] Backend database integration
- [ ] User authentication with JWT
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment integration
- [ ] Service provider management
- [ ] Advanced analytics
- [ ] Mobile app version
- [ ] Real-time notifications
- [ ] Booking calendar

---

## 📄 License

This project is part of the TRUCKER Truck Repair Management System.

---

## 📞 Support

For issues or questions:
1. Check the [LOCAL_DATA_STORAGE.md](LOCAL_DATA_STORAGE.md) file
2. Review browser console for errors
3. Check that all files are in correct directories
4. Verify browser localStorage is enabled

---

## ✨ Key Highlights

🔒 **Privacy First** - All data stored locally only
📱 **Responsive** - Works on any device
⚡ **Fast** - No network latency
🚀 **Ready to Scale** - Backend structure prepared
💪 **Full Featured** - Users and admin panels
🎨 **Professional Design** - Orange and dark theme

---

**TRUCKER: Professional Truck Repair Management - Your Data, Your Device, Your Control** 🚚
