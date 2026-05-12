# Forgot Password Implementation Guide

## Overview
The forgot password process has been fully implemented with the following features:
- Frontend form to request password reset
- Email notification with reset token
- Password reset page with strength validation
- Backend API endpoints for both request and reset

## System Architecture

### Frontend Files
1. **forgot-password.html** - User enters their email to request a password reset
2. **reset-password.html** - User enters new password after clicking email link

### Backend Files
1. **routes/auth.js** - Two new endpoints:
   - `POST /api/auth/forgot-password` - Request password reset
   - `POST /api/auth/reset-password` - Complete password reset

2. **controllers/authController.js** - Two new functions:
   - `forgotPassword()` - Generates reset token and sends email
   - `resetPasswordWithToken()` - Validates token and updates password

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Email Service

#### Option A: Using Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to myaccount.google.com
   - Select Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to myaccount.google.com
   - Select Security
   - Find "App passwords" (appears after 2FA is enabled)
   - Select "Mail" and "Windows Computer"
   - Gmail generates a 16-character password
   - Copy this password

3. **Create .env file** in the backend directory:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   FRONTEND_URL=http://localhost:3000
   ```

#### Option B: Using Other Email Services

**Outlook/Hotmail:**
```
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
```

**SendGrid:**
```
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.your_sendgrid_api_key
```

### 3. Start the Backend Server
```bash
npm run dev
# or
npm start
```

The server should run on `http://localhost:3000`

### 4. Update Frontend Configuration
If your backend is on a different URL, update the `API_BASE_URL` in:
- `forgot-password.html`
- `reset-password.html`
- `frontend/forgot-password.html`
- `frontend/reset-password.html`

```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

## How It Works

### User Flow

1. **User Request Reset**
   - User visits forgot-password.html
   - Enters their email address
   - Clicks "Send Reset Link"

2. **Email Sent**
   - Backend generates a secure reset token
   - Email is sent with reset link containing token
   - Example: `http://localhost:3000/reset-password?token=abc123&email=user@example.com`

3. **User Resets Password**
   - User clicks link in email
   - Directed to reset-password.html with token and email in URL
   - Enters new password (with strength validation)
   - Submits form

4. **Password Updated**
   - Backend validates token and expiry
   - Password is updated (marked as used)
   - User redirected to login

### API Endpoints

#### Request Password Reset
```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
    "email": "user@example.com"
}

Response (200):
{
    "success": true,
    "message": "Password reset link has been sent to your email",
    "email": "user@example.com",
    "tokenExpiry": "2024-01-15T12:30:00.000Z"
}
```

#### Reset Password with Token
```bash
POST /api/auth/reset-password
Content-Type: application/json

{
    "token": "reset_token_from_email",
    "email": "user@example.com",
    "password": "NewPassword123",
    "confirmPassword": "NewPassword123"
}

Response (200):
{
    "success": true,
    "message": "Password has been reset successfully. Please login with your new password."
}
```

## Features

### Security Features
1. **Secure Token Generation** - 32-byte random tokens
2. **Token Hashing** - Tokens are hashed with SHA256 before storage
3. **Token Expiry** - Tokens expire after 1 hour
4. **One-Time Use** - Tokens can only be used once
5. **Email Validation** - Regex validation on email format
6. **Password Requirements** - Minimum 6 characters (can be enhanced)

### User Experience
1. **Real-time Password Strength** - Visual feedback while typing
2. **Password Requirements** - Clear checklist of requirements
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
3. **Password Visibility Toggle** - Show/hide password buttons
4. **Password Match Validation** - Real-time confirmation password matching
5. **Loading States** - Button shows status during request
6. **Error Messages** - Clear, specific error messages
7. **Success Messages** - Confirmation when actions complete

### Email Features
1. **Professional HTML Template** - Well-formatted emails
2. **Plain Text Fallback** - For email clients that don't support HTML
3. **Direct Link in Email** - Users can copy/paste link if button doesn't work
4. **Troubleshooting Tips** - Help text in both email and website

## Testing the Implementation

### Manual Testing

1. **Test Forgot Password:**
   ```
   1. Navigate to http://localhost:3000/forgot-password.html
   2. Enter your test email
   3. Click "Send Reset Link"
   4. Check email (or check console if using mock email)
   ```

2. **Test Password Reset:**
   ```
   1. Copy the reset link from email
   2. Paste into browser address bar
   3. Enter new password
   4. Verify password requirements are met
   5. Click "Update Password"
   6. Should redirect to login
   ```

3. **Test Error Cases:**
   ```
   - Invalid email format
   - Expired token (wait 1 hour)
   - Already used token (try same link twice)
   - Password mismatch
   - Weak password
   ```

### Development/Testing Mode

In development, if you don't have email configured:
- Emails are logged to console
- Check the server terminal for email content
- Click the direct link from the console output

### Production Considerations

1. **Email Service Setup**
   - Set up a production email service (SendGrid, Mailgun, AWS SES)
   - Update .env with production credentials

2. **Database Integration**
   - Uncomment and implement database calls in authController.js
   - Store reset tokens in database (not in memory)
   - Add indexes on user email field for performance

3. **Password Hashing**
   - Implement bcrypt hashing for passwords
   - Uncomment bcrypt code in authController.js

4. **Token Security**
   - Increase token expiry based on user preference
   - Consider implementing refresh tokens
   - Add rate limiting to prevent brute force attacks

5. **HTTPS**
   - Ensure all connections are HTTPS in production
   - Update FRONTEND_URL in .env to https://

6. **CORS Configuration**
   - Update CORS in server.js for production domain
   - Restrict to specific origins

## Troubleshooting

### Email Not Sending

1. **Check .env file exists** in backend directory
2. **Verify EMAIL_USER and EMAIL_PASSWORD** are correct
3. **For Gmail users:**
   - Ensure 2FA is enabled
   - Use app-specific password (not account password)
   - Check if Gmail is blocking the app

4. **Check console logs** for error messages:
   ```bash
   npm run dev
   # Watch for error messages
   ```

### Reset Link Not Working

1. **Copy full URL** from email
2. **Check API_BASE_URL** in frontend HTML matches backend URL
3. **Verify backend is running** on correct port
4. **Check browser console** for fetch errors (F12 > Console)

### CORS Errors

If you see CORS errors in browser console:
1. Update `API_BASE_URL` in HTML files to match backend URL
2. Verify backend CORS configuration allows your frontend domain
3. Check that backend server is running

## File Changes Summary

### Created Files
- `reset-password.html` - New password reset page
- `frontend/reset-password.html` - Frontend copy
- `backend/.env.example` - Environment variables template

### Modified Files
- `backend/package.json` - Added nodemailer dependency
- `backend/controllers/authController.js` - Added forgot password functions
- `backend/routes/auth.js` - Added forgot password endpoints
- `forgot-password.html` - Updated to call API
- `frontend/forgot-password.html` - Updated to call API

## Next Steps

1. **Database Integration** - Connect to MongoDB for persistent token storage
2. **Password Hashing** - Implement bcrypt for secure password storage
3. **Email Templates** - Customize email design for your brand
4. **Rate Limiting** - Add rate limiting to prevent abuse
5. **Monitoring** - Set up logging to track password reset requests
6. **Analytics** - Track how many users use forgot password feature

## Support

For issues or questions:
- Check the troubleshooting section above
- Review console logs (backend and browser)
- Check email service documentation
- Contact: mjasvanth85@gmail.com

## Security Best Practices

1. ✓ Use secure random tokens (32 bytes)
2. ✓ Hash tokens before storage
3. ✓ Token expiry (1 hour)
4. ✓ One-time use enforcement
5. ⚠️ TODO: Implement rate limiting (5 requests per 15 minutes)
6. ⚠️ TODO: Log password reset attempts for security monitoring
7. ⚠️ TODO: Implement CAPTCHA to prevent abuse
8. ⚠️ TODO: Hash passwords with bcrypt before storage
