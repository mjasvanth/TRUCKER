// =====================
// AUTHENTICATION CONTROLLER
// =====================

const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter configuration (using Gmail or your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your_email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password'
    }
});

// Alternative: For testing without real email
const mockTransporter = {
    sendMail: async (mailOptions) => {
        console.log('MOCK EMAIL SENT:', mailOptions);
        return { messageId: 'mock-' + Date.now() };
    }
};

// Use mock transporter in development if real credentials not provided
const emailTransporter = process.env.EMAIL_USER ? transporter : mockTransporter;

const registerUser = (email, fullname, phone, password) => {
    // In production:
    // 1. Hash password using bcrypt
    // 2. Validate email uniqueness
    // 3. Create user document in database
    // 4. Return user object (without password)
    return {
        email,
        fullname,
        phone,
        createdAt: new Date()
    };
};

const loginUser = (email, password) => {
    // In production:
    // 1. Find user by email
    // 2. Compare password with bcrypt
    // 3. Generate JWT token
    // 4. Return token and user info
    return {
        token: 'jwt_token_here',
        user: {
            email,
            id: 'user_id'
        }
    };
};

const loginAdmin = (email, password) => {
    // In production:
    // 1. Verify admin credentials
    // 2. Check role
    // 3. Generate admin JWT token
    // 4. Return token
    return {
        token: 'admin_jwt_token_here',
        admin: {
            email,
            role: 'admin'
        }
    };
};

const forgotPassword = async (email) => {
    try {
        // In production:
        // 1. Check if user exists with this email
        // 2. Generate secure reset token
        // 3. Store token and expiration in database
        // 4. Send email with reset link
        
        // Generate secure reset token (32 bytes)
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Token expiration time (1 hour)
        const tokenExpiry = new Date(Date.now() + 3600000);
        
        // In production, save this token to database:
        // await User.findOneAndUpdate(
        //     { email },
        //     { 
        //         resetToken: crypto.createHash('sha256').update(resetToken).digest('hex'),
        //         resetTokenExpiry: tokenExpiry
        //     }
        // );
        
        // For demo purposes, store in memory
        if (!global.resetTokens) {
            global.resetTokens = {};
        }
        global.resetTokens[email] = {
            token: crypto.createHash('sha256').update(resetToken).digest('hex'),
            expiry: tokenExpiry,
            used: false
        };
        
        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&email=${email}`;
        
        // Email template
        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@tamiltrucker.com',
            to: email,
            subject: '🔐 Password Reset Request - Tamil Trucker Repair',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #007bff 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">Password Reset Request</h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Tamil Trucker Repair Services</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
                        <p style="color: #333; font-size: 16px;">Hi ${email.split('@')[0]},</p>
                        
                        <p style="color: #555; line-height: 1.6;">
                            We received a request to reset your password for your Tamil Trucker Repair account. 
                            If you didn't make this request, you can safely ignore this email.
                        </p>
                        
                        <p style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" style="background: linear-gradient(135deg, #007bff 0%, #6366f1 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                                Reset Your Password
                            </a>
                        </p>
                        
                        <p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
                            This link will expire in 1 hour. If you need a new link, 
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/forgot-password" style="color: #007bff; text-decoration: none;">request a new password reset</a>.
                        </p>
                        
                        <p style="color: #999; font-size: 12px;">
                            <strong>Direct Link:</strong> ${resetLink}
                        </p>
                        
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">
                            If you have any issues, contact us at <a href="mailto:mjasvanth85@gmail.com" style="color: #007bff;">mjasvanth85@gmail.com</a>
                        </p>
                    </div>
                </div>
            `,
            text: `
                Password Reset Request - Tamil Trucker Repair
                
                Hi ${email.split('@')[0]},
                
                We received a request to reset your password. Click the link below to proceed:
                
                ${resetLink}
                
                This link will expire in 1 hour.
                
                If you didn't request this, ignore this email.
                
                For support: mjasvanth85@gmail.com
            `
        };
        
        // Send email
        const info = await emailTransporter.sendMail(mailOptions);
        
        console.log('Password reset email sent to:', email);
        console.log('Message ID:', info.messageId);
        
        return {
            success: true,
            message: 'Password reset link has been sent to your email',
            email: email,
            tokenExpiry: tokenExpiry
        };
        
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email: ' + error.message);
    }
};

const resetPasswordWithToken = async (token, email, newPassword) => {
    try {
        // In production:
        // 1. Hash the token to compare with stored hash
        // 2. Check if token matches and hasn't expired
        // 3. Hash new password with bcrypt
        // 4. Update user password
        // 5. Clear reset token from database
        
        // For demo purposes, check memory
        if (!global.resetTokens || !global.resetTokens[email]) {
            throw new Error('Password reset token not found or expired');
        }
        
        const storedToken = global.resetTokens[email];
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        
        if (storedToken.token !== tokenHash) {
            throw new Error('Invalid password reset token');
        }
        
        if (new Date() > storedToken.expiry) {
            delete global.resetTokens[email];
            throw new Error('Password reset token has expired');
        }
        
        if (storedToken.used) {
            throw new Error('Password reset token has already been used');
        }
        
        // Mark token as used
        storedToken.used = true;
        
        // In production, hash password with bcrypt:
        // const hashedPassword = await bcrypt.hash(newPassword, 10);
        // await User.findOneAndUpdate({ email }, { password: hashedPassword });
        
        console.log('Password reset successful for:', email);
        
        return {
            success: true,
            message: 'Password has been reset successfully. Please login with your new password.'
        };
        
    } catch (error) {
        console.error('Error resetting password:', error);
        throw new Error('Failed to reset password: ' + error.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
    forgotPassword,
    resetPasswordWithToken
};
