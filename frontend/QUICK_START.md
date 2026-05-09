# 🚚 TRUCKER - Quick Reference Guide

## 🎯 What is TRUCKER?
A truck repair management system where **all your data stays on your device only**. No servers, no tracking, just your local data.

---

## ✅ Local Data Guarantee

| ✅ What's Protected | ❌ What's NOT |
|---|---|
| Data stored locally only | Encryption at rest |
| No external transmission | Device-level security |
| No third-party tracking | Multi-device sync |
| Offline capable | Backup to cloud |
| User can clear anytime | Recovery after clear |

---

## 🚀 Getting Started

### 1. Open the App
- Open `index.html` in your browser
- No installation needed
- Works offline

### 2. Create Account
- Go to "Sign Up"
- Fill in details
- OTP appears on screen
- Enter OTP to verify
- Account created ✓

### 3. Login
- Use your email and password
- Location is captured automatically
- GPS coordinates saved to your device
- Dashboard displays your data

### 4. Request Services
- Choose a service from dashboard
- Details saved locally
- Confirmation shows "saved locally"
- Admin can view in admin dashboard

---

## 👤 Admin Access

### Admin Login
```
Email: admin@mjasvanth85@gmail.com
Password: admin123
```

### Admin Dashboard Shows
- **Users**: All registered users
- **Logins**: Login history with GPS locations
- **Services**: All service requests
- **Locations**: Map of GPS coordinates

### Admin Actions
- ✅ View all user data
- ✅ Export data as CSV
- ✅ Clear all data (with confirmation)
- ✅ Search and filter data

---

## 📱 Features

### User Dashboard
- 👤 Profile information
- 📍 Real-time GPS location
- 🔗 Google Maps link to your location
- 🔧 Service request buttons

### Service Options
- 🏗️ Engine Diagnostics
- 🛑 Brake & Suspension
- 🔧 General Maintenance
- ⚡ Electrical Systems
- 🚛 Transmission Repair
- 🛠️ Welding & Fabrication

### Data Available to Admin
- User registrations
- Login timestamps and locations
- Service requests with details
- GPS coordinates with accuracy
- All stored **locally only**

---

## 🔒 Privacy Features

### Data Storage
- 📦 Stored in browser localStorage
- 🚫 No external servers
- 🚫 No cloud upload
- 🚫 No third-party services
- ✅ Fully under your control

### Clear Your Data
**Option 1: Using App**
1. Login to admin dashboard
2. Click "Clear All Data"
3. Confirm
4. All data deleted

**Option 2: Browser Settings**
1. Browser Settings
2. Privacy/Clear browsing data
3. Select "Cookies and Site Data"
4. Choose domain → Clear

**Option 3: Browser Console**
```javascript
localStorage.clear()
```

---

## 📊 View Your Data

### Using Browser DevTools
1. Press `F12` (or right-click → Inspect)
2. Go to **Application** tab
3. Click **Local Storage** on left
4. Select your domain
5. View all stored data

### Console Commands
```javascript
// See all users
JSON.parse(localStorage.getItem('registeredUsers'))

// See all logins
JSON.parse(localStorage.getItem('adminNotifications'))

// See all service requests
JSON.parse(localStorage.getItem('serviceRequests'))

// Clear all data
localStorage.clear()
```

---

## 🐛 Troubleshooting

### "Data Not Saving"
- ✅ Check if browser is in private mode (disable it)
- ✅ Check if localStorage is enabled
- ✅ Try different browser
- ✅ Check browser console (F12) for errors

### "GPS Not Working"
- ✅ Allow location permission when prompted
- ✅ Check if device has GPS/location
- ✅ Disable private browsing mode
- ✅ Try in different browser

### "Lost All Data"
- ✅ Normal if you cleared browser data
- ✅ Check if you're in private mode (clears on close)
- ✅ Create new account and redo data entry
- ✅ Check browser cache/history before clearing

### "Admin Dashboard Empty"
- ✅ Create accounts and submit service requests first
- ✅ Make sure you're logged in as admin
- ✅ Check browser console for errors
- ✅ Refresh the page (F5)

---

## 💾 Backup Your Data

### Export as CSV
1. Login to admin dashboard
2. Click "Export Data" button
3. CSV file downloads to your computer
4. Open in Excel or Google Sheets

### Manual Backup
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `JSON.stringify(JSON.parse(localStorage.getItem('registeredUsers')))`
4. Copy the output
5. Save to text file

---

## 📋 Storage Capacity

| Browser | Storage |
|---------|---------|
| Chrome | 10 MB per domain |
| Firefox | 10 MB per domain |
| Safari | 5 MB per domain |
| Edge | 10 MB per domain |

**Current Usage**: ~50-100 KB per user (plenty of space)

---

## 🔄 What's Stored?

### User Registration
```json
{
  "fullname": "Your Name",
  "email": "your@email.com",
  "phone": "(123) 456-7890",
  "location": "City, State"
}
```

### Login Records
```json
{
  "email": "your@email.com",
  "loginTime": "2024-01-01T12:00:00Z",
  "gps": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "accuracy": 15
  }
}
```

### Service Requests
```json
{
  "service": "Engine Diagnostics",
  "email": "your@email.com",
  "location": "City, State",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## ✨ Key Selling Points

| Feature | Benefit |
|---------|---------|
| 🔒 Local Only | Your data, your device |
| 🚀 Fast | No network latency |
| 📱 Responsive | Works on all devices |
| 🌐 Offline | No internet needed |
| 🎨 Beautiful | Modern, clean design |
| 📊 Analytics | See all your data |
| 🚫 No Tracking | Complete privacy |

---

## 🚀 Tips & Tricks

### Faster Login
- Keep browser tab open
- Data persists in sessionStorage
- No re-login needed

### Multiple Users
- Use different browsers/profiles
- Each has separate localStorage
- Or clear data between users

### Mobile Access
- Works on mobile browsers too
- GPS works better on mobile
- Same data on same browser

### Best Practices
- ✅ Export data regularly
- ✅ Use strong passwords
- ✅ Clear data when sharing device
- ✅ Review privacy settings

---

## 📞 Need Help?

### Common Issues
1. **Check LOCAL_DATA_STORAGE.md** - Complete technical guide
2. **Check DATA_PRIVACY_SUMMARY.md** - Privacy details
3. **View browser console** - Press F12 for errors
4. **Try different browser** - Chrome, Firefox, Edge, Safari
5. **Clear browser cache** - Settings → Clear browsing data

### Security Questions
- All data stored locally: ✅ Yes
- Data sent to servers: ❌ No
- Encrypted transmission: ✅ No transmission
- Third-party access: ❌ No access
- Export available: ✅ Yes (CSV)

---

## ✅ Verification Checklist

- [ ] Downloaded/opened TRUCKER
- [ ] Created test account
- [ ] Verified "saved locally" message
- [ ] Logged in as admin
- [ ] Checked admin dashboard for data
- [ ] Viewed data in browser DevTools
- [ ] Exported data as CSV
- [ ] Tested offline mode
- [ ] Read LOCAL_DATA_STORAGE.md
- [ ] Understood privacy guarantees

---

## 🎯 Bottom Line

**Your data is YOUR data.**
- 📦 Stored on YOUR device
- 🔒 In YOUR browser
- 💼 Under YOUR control
- 🚫 Never shared
- 🚫 Never sold
- 🚫 Never tracked

**TRUCKER: Truck Repair Management You Can Trust** 🚚

---

For more details, see:
- 📖 [LOCAL_DATA_STORAGE.md](LOCAL_DATA_STORAGE.md) - Technical guide
- 🔐 [DATA_PRIVACY_SUMMARY.md](DATA_PRIVACY_SUMMARY.md) - Privacy implementation
- 📋 [README.md](README.md) - Complete documentation
