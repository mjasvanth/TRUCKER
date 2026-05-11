// =====================
// ADMIN CREDENTIALS (Simple auth for demo)
// =====================
const ADMIN_CREDENTIALS = {
    email: 'mjasvanth85@gmail.com',
    password: 'admin123'
};

// =====================
// UTILITY FUNCTIONS (Must be defined first)
// =====================

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toggle password visibility
function togglePasswordVisibility(fieldId, iconId) {
    const field = document.getElementById(fieldId);
    const icon = document.getElementById(iconId);
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.textContent = '🔓';
    } else {
        field.type = 'password';
        icon.textContent = '👁️';
    }
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Send user data to admin (simulated)
function sendToAdmin(userData) {
    const adminData = {
        ...userData,
        gpsRequest: 'Requesting location...',
        timestamp: Date.now(),
        browser: navigator.userAgent
    };

    // In production, this would send to a server
    console.log('LOGIN DATA SENT TO ADMIN:', adminData);
    localStorage.setItem('lastLogin_' + Date.now(), JSON.stringify(adminData));
}

// Check if user is logged in (for dashboard page)
function checkLogin() {
    const userData = sessionStorage.getItem('userLoggedIn');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

// Display user info on dashboard
function displayUserInfo() {
    const userData = checkLogin();
    if (!userData) return;

    document.getElementById('userName').textContent = userData.fullname || userData.email.split('@')[0];
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userPhone').textContent = userData.phone || 'Not provided';
    document.getElementById('userLocation').textContent = userData.location || 'Not provided';
    document.getElementById('loginTime').textContent = userData.loginTime || userData.signupTime;
    
    // Get real-time GPS location
    getRealTimeLocation();
}

// Get real-time GPS location
function getRealTimeLocation() {
    if (!navigator.geolocation) {
        document.getElementById('gpsCoordinates').textContent = 'Geolocation not supported';
        return;
    }
    
    document.getElementById('gpsCoordinates').textContent = 'Getting location...';
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            // Store in session
            const userData = JSON.parse(sessionStorage.getItem('userLoggedIn'));
            userData.gps = { latitude: lat, longitude: lon, accuracy: accuracy };
            sessionStorage.setItem('userLoggedIn', JSON.stringify(userData));
            
            // Display coordinates
            document.getElementById('gpsCoordinates').textContent = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
            document.getElementById('gpsAccuracy').textContent = `±${Math.round(accuracy)} meters`;
            
            // Show map link
            const mapLink = document.getElementById('mapLink');
            mapLink.href = `https://www.google.com/maps/search/${lat},${lon}`;
            document.getElementById('locationMap').style.display = 'block';
            
            console.log('Real-time GPS Data:', {
                latitude: lat,
                longitude: lon,
                accuracy: accuracy,
                timestamp: new Date().toISOString()
            });
        },
        function(error) {
            let errorMsg = 'Location not available';
            if (error.code === error.PERMISSION_DENIED) {
                errorMsg = 'Location permission denied';
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                errorMsg = 'Position unavailable';
            } else if (error.code === error.TIMEOUT) {
                errorMsg = 'Location request timeout';
            }
            document.getElementById('gpsCoordinates').textContent = errorMsg;
            console.error('Geolocation Error:', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Show admin modal with user data
function showAdminModal() {
    const userData = JSON.parse(sessionStorage.getItem('userLoggedIn'));
    
    // Display GPS data if available
    if (userData.gps) {
        document.getElementById('adminGPS').textContent = `${userData.gps.latitude.toFixed(6)}, ${userData.gps.longitude.toFixed(6)} (Accuracy: ±${Math.round(userData.gps.accuracy)}m)`;
    } else {
        document.getElementById('adminGPS').textContent = 'No GPS data yet';
    }

    document.getElementById('adminTime').textContent = new Date().toISOString();
    document.getElementById('adminEmail').textContent = userData.email;
    document.getElementById('adminPhone').textContent = userData.phone || userData.email;
    document.getElementById('adminLocation').textContent = userData.location;
    document.getElementById('adminBrowser').textContent = navigator.userAgent;
    document.getElementById('adminDevice').textContent = /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

    document.getElementById('adminModal').classList.add('show');
}

// =====================
// PAGE INITIALIZATION
// =====================

console.log("Truck Mechanic site loaded successfully.");

// Simple Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        // Only scroll if href is not just '#' and target exists
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =====================
// REGISTERED USERS MANAGEMENT
// =====================

function getRegisteredUsers() {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
}

function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

function findUserByEmail(email) {
    const users = getRegisteredUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// =====================
// LOGIN FORM HANDLER
// =====================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const location = document.getElementById('location').value.trim();
        let isValid = true;

        // Clear previous error messages
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('locationError').textContent = '';

        // Validate email format
        if (!email || !validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Validate password
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Validate location
        if (!location || location.length < 2) {
            document.getElementById('locationError').textContent = 'Please enter your location';
            isValid = false;
        }

        if (isValid) {
            // Check if user exists with this email
            const registeredUser = findUserByEmail(email);
            
            if (!registeredUser) {
                document.getElementById('emailError').textContent = 'User not found. Please sign up first.';
                return;
            }
            
            // Verify password matches
            if (registeredUser.password !== password) {
                document.getElementById('passwordError').textContent = 'Incorrect password';
                return;
            }
            
            // Store user data in session
            const userData = {
                fullname: registeredUser.fullname,
                email: email,
                password: password,
                phone: registeredUser.phone,
                location: location,
                remember: document.getElementById('remember').checked,
                loginTime: new Date().toLocaleString(),
                loginTimestamp: Date.now()
            };
            sessionStorage.setItem('userLoggedIn', JSON.stringify(userData));
            
            // Update last login in registered users
            registeredUser.lastLogin = new Date().toLocaleString();
            registeredUser.loginCount = (registeredUser.loginCount || 0) + 1;
            saveRegisteredUsers(getRegisteredUsers());
            
            // Send data to admin (simulated)
            sendToAdmin(userData);
            
            alert('Login successful! Welcome back, ' + registeredUser.fullname);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }
    });
}

// =====================
// SIGNUP FORM HANDLER
// =====================

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    let otpGenerated = null;
    let otpVerified = false;
    
    // Show OTP verification section when phone is filled
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (validatePhone(this.value)) {
                // Generate OTP
                otpGenerated = Math.floor(1000 + Math.random() * 9000).toString();
                const otpSection = document.getElementById('otpSection');
                if (otpSection) {
                    otpSection.style.display = 'block';
                    document.getElementById('otpDisplay').textContent = otpGenerated;
                    otpVerified = false;
                    document.getElementById('otpInput').value = '';
                    document.getElementById('otpError').textContent = '';
                }
            }
        });
    }
    
    // OTP verification handler
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', function() {
            const otpInput = document.getElementById('otpInput').value.trim();
            const otpError = document.getElementById('otpError');
            
            if (otpInput === otpGenerated) {
                otpVerified = true;
                otpError.textContent = '';
                otpError.style.color = 'green';
                otpError.textContent = '✓ Mobile number verified successfully';
                this.disabled = true;
                this.textContent = 'Verified ✓';
                this.style.backgroundColor = '#28a745';
            } else {
                otpVerified = false;
                otpError.style.color = 'red';
                otpError.textContent = 'Invalid OTP. Please try again.';
            }
        });
    }
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        let isValid = true;

        // Clear previous error messages
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmError').textContent = '';

        // Validate full name
        if (!fullname || fullname.length < 3) {
            document.getElementById('nameError').textContent = 'Full name must be at least 3 characters';
            isValid = false;
        }

        // Validate email
        if (!email || !validateEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Check if email already registered
        if (isValid && findUserByEmail(email)) {
            document.getElementById('emailError').textContent = 'Email already registered. Please login or use a different email.';
            isValid = false;
        }

        // Validate phone
        if (!phone || !validatePhone(phone)) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number';
            isValid = false;
        }
        
        // Verify OTP
        if (!otpVerified) {
            document.getElementById('phoneError').textContent = 'Please verify your phone number with OTP';
            isValid = false;
        }

        // Validate password
        if (!password || password.length < 6) {
            document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Validate password match
        if (password !== confirmPassword) {
            document.getElementById('confirmError').textContent = 'Passwords do not match';
            isValid = false;
        }

        if (isValid) {
            // Create new user account
            const newUser = {
                fullname: fullname,
                email: email,
                phone: phone,
                password: password,
                signupTime: new Date().toLocaleString(),
                signupTimestamp: Date.now(),
                lastLogin: null,
                loginCount: 0,
                verified: true
            };
            
            // Add to registered users
            const users = getRegisteredUsers();
            users.push(newUser);
            saveRegisteredUsers(users);
            
            // Store user data in session
            sessionStorage.setItem('userLoggedIn', JSON.stringify(newUser));
            
            // Send data to admin (simulated)
            sendToAdmin(newUser);
            
            alert('Account created successfully!\n\nUsername (Email): ' + email + '\nPassword: ' + password + '\n\nYou can now login with these credentials.');
            
            // Redirect to login page
            window.location.href = 'login.html';
        }
    });
}

// =====================
// DASHBOARD PAGE HANDLERS
// =====================

if (document.getElementById('profileBtn')) {
    displayUserInfo();

    // Logout handler
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('userLoggedIn');
        window.location.href = 'login.html';
    });

    // Profile button handler
    document.getElementById('profileBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showAdminModal();
    });

    // Service request handlers
    document.querySelectorAll('.btn-request').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const userData = JSON.parse(sessionStorage.getItem('userLoggedIn'));
            
            // Store service request for admin
            const serviceRequest = {
                serviceName: service,
                email: userData.email,
                location: userData.location,
                phone: userData.phone || 'Not provided',
                requestTime: new Date().toISOString(),
                gps: userData.gps,
                notes: ''
            };
            
            const serviceRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
            serviceRequests.push(serviceRequest);
            localStorage.setItem('serviceRequests', JSON.stringify(serviceRequests));
            
            alert(`Service "${service}" request submitted!\n\nService will be sent to admin with your details:\nEmail: ${userData.email}\nLocation: ${userData.location}\nPhone: ${userData.phone}`);
        });
    });

    // Modal close handlers
    const modal = document.getElementById('adminModal');
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('adminModal');
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Send to admin button
    const sendAdminBtn = document.getElementById('sendAdminBtn');
    if (sendAdminBtn) {
        sendAdminBtn.addEventListener('click', function() {
            const userData = JSON.parse(sessionStorage.getItem('userLoggedIn'));
            const adminNote = document.getElementById('adminNote').value;
            
            // Get fresh GPS location before sending
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const accuracy = position.coords.accuracy;
                    
                    const completeData = {
                        ...userData,
                        adminNote: adminNote,
                        sentAt: new Date().toISOString(),
                        gpsData: {
                            latitude: lat,
                            longitude: lon,
                            accuracy: accuracy,
                            mapUrl: `https://www.google.com/maps/search/${lat},${lon}`
                        }
                    };
                    
                    // Store in localStorage for admin
                    storeAdminNotification(completeData);
                    
                    // Simulate sending to admin
                    console.log('DATA SENT TO ADMIN WITH GPS:', completeData);
                    alert(`Login and real-time location data sent to admin!\n\nGPS: ${lat.toFixed(6)}, ${lon.toFixed(6)}\nAccuracy: ±${Math.round(accuracy)}m\n\nData logged to console and stored for admin review.`);
                },
                function() {
                    const completeData = {
                        ...userData,
                        adminNote: adminNote,
                        sentAt: new Date().toISOString()
                    };
                    storeAdminNotification(completeData);
                    console.log('DATA SENT TO ADMIN (No GPS):', completeData);
                    alert('Login and location data sent to admin!\n\nGPS data unavailable.\n\nData logged to console and stored for admin review.');
                }
            );
        });
    }
}

// =====================
// ADMIN LOGIN HANDLER
// =====================

const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const adminEmail = document.getElementById('adminEmail').value.trim();
        const adminPassword = document.getElementById('adminPassword').value.trim();
        
        // Clear previous error messages
        document.getElementById('adminEmailError').textContent = '';
        document.getElementById('adminPasswordError').textContent = '';
        
        // Validate credentials
        if (adminEmail !== ADMIN_CREDENTIALS.email) {
            document.getElementById('adminEmailError').textContent = 'Invalid admin email';
            return;
        }
        
        if (adminPassword !== ADMIN_CREDENTIALS.password) {
            document.getElementById('adminPasswordError').textContent = 'Invalid admin password';
            return;
        }
        
        // Store admin session
        sessionStorage.setItem('adminLoggedIn', JSON.stringify({
            email: adminEmail,
            loginTime: new Date().toLocaleString()
        }));
        
        // Redirect to admin dashboard
        window.location.href = 'admin-dashboard.html';
    });
}

// =====================
// ADMIN DASHBOARD HANDLER
// =====================

if (document.getElementById('adminLogout')) {
    // Check if admin is logged in
    const adminSession = sessionStorage.getItem('adminLoggedIn');
    if (!adminSession) {
        window.location.href = 'admin-login.html';
    }
    
    // Logout handler
    document.getElementById('adminLogout').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    });
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Load and display all data
    loadAdminData();
    
    // Export data
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    
    // Clear data
    document.getElementById('clearDataBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            alert('All data cleared successfully');
            loadAdminData();
        }
    });
    
    // Search functionality
    document.getElementById('loginSearch').addEventListener('input', function() {
        filterLogins(this.value);
    });
    
    document.getElementById('serviceSearch').addEventListener('input', function() {
        filterServices(this.value);
    });
    
    document.getElementById('userSearch').addEventListener('input', function() {
        filterUsers(this.value);
    });
}

// =====================
// ADMIN DATA FUNCTIONS
// =====================

function storeAdminNotification(data) {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    notifications.push(data);
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
}

function loadAdminData() {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    // Display stats
    document.getElementById('totalUsers').textContent = new Set(notifications.map(n => n.email)).size;
    document.getElementById('totalLogins').textContent = notifications.length;
    
    // Count today's logins
    const today = new Date().toDateString();
    const todayLogins = notifications.filter(n => {
        const date = new Date(n.sentAt || n.loginTime).toDateString();
        return date === today;
    }).length;
    document.getElementById('todayLogins').textContent = todayLogins;
    
    // Count services
    const serviceRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    document.getElementById('totalServices').textContent = serviceRequests.length;
    
    // Display logins
    displayLogins(notifications);
    
    // Display services
    displayServices(serviceRequests);
    
    // Display locations
    displayLocations(notifications);
    
    // Display users
    displayUsers(notifications);
}

function displayLogins(data) {
    const tbody = document.getElementById('loginsTable');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">No login data available</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.map((login, index) => `
        <tr>
            <td><strong>${login.email}</strong></td>
            <td><span style="color: #666; font-size: 0.9rem;">••••••••</span></td>
            <td>${login.location || 'N/A'}</td>
            <td>${login.phone || 'N/A'}</td>
            <td>
                ${login.gps ? `
                    <a href="https://www.google.com/maps/search/${login.gps.latitude},${login.gps.longitude}" target="_blank" style="color: var(--primary); text-decoration: none;">
                        ${login.gps.latitude.toFixed(6)}, ${login.gps.longitude.toFixed(6)}
                    </a>
                ` : (login.gpsData ? `
                    <a href="${login.gpsData.mapUrl}" target="_blank" style="color: var(--primary); text-decoration: none;">
                        ${login.gpsData.latitude.toFixed(6)}, ${login.gpsData.longitude.toFixed(6)}
                    </a>
                ` : 'Not Available')}
            </td>
            <td>
                ${login.gps ? `±${Math.round(login.gps.accuracy)}m` : (login.gpsData ? `±${Math.round(login.gpsData.accuracy)}m` : 'N/A')}
            </td>
            <td>${new Date(login.sentAt || login.loginTime).toLocaleString()}</td>
            <td>${/Mobile|Android|iPhone/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'}</td>
        </tr>
    `).join('');
}

function displayServices(data) {
    const tbody = document.getElementById('servicesTable');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No service requests available</td></tr>';
        return;
    }
    
    tbody.innerHTML = data.map(service => `
        <tr>
            <td><strong>${service.serviceName}</strong></td>
            <td>${service.email}</td>
            <td>${service.location}</td>
            <td>${service.phone || 'N/A'}</td>
            <td>
                ${service.gps ? `
                    <a href="https://www.google.com/maps/search/${service.gps.latitude},${service.gps.longitude}" target="_blank" style="color: var(--primary);">
                        View Map
                    </a>
                ` : 'N/A'}
            </td>
            <td>${new Date(service.requestTime).toLocaleString()}</td>
            <td>${service.notes || '-'}</td>
        </tr>
    `).join('');
}

function displayLocations(data) {
    const container = document.getElementById('locationsList');
    
    const locationsWithGPS = data.filter(d => d.gps || d.gpsData);
    
    if (locationsWithGPS.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px;">No GPS location data available</p>';
        return;
    }
    
    container.innerHTML = locationsWithGPS.map(location => {
        const gps = location.gps || location.gpsData;
        return `
            <div class="location-card">
                <h4>${location.email}</h4>
                <p><strong>City:</strong> ${location.location}</p>
                <p><strong>Phone:</strong> ${location.phone || 'N/A'}</p>
                <p><strong>GPS:</strong> ${gps.latitude.toFixed(6)}, ${gps.longitude.toFixed(6)}</p>
                <p><strong>Accuracy:</strong> ±${Math.round(gps.accuracy)}m</p>
                <p><strong>Time:</strong> ${new Date(location.sentAt || location.loginTime).toLocaleString()}</p>
                <a href="https://www.google.com/maps/search/${gps.latitude},${gps.longitude}" target="_blank">
                    View on Google Maps
                </a>
            </div>
        `;
    }).join('');
}

function displayUsers(data) {
    const tbody = document.getElementById('usersTable');
    
    // Get unique users
    const uniqueUsers = {};
    data.forEach(login => {
        if (!uniqueUsers[login.email]) {
            uniqueUsers[login.email] = {
                email: login.email,
                fullname: login.fullname || login.email.split('@')[0],
                phone: login.phone,
                location: login.location,
                signupTime: login.signupTime || login.loginTime,
                lastLogin: login.sentAt || login.loginTime,
                loginCount: 0
            };
        }
        uniqueUsers[login.email].loginCount++;
    });
    
    const users = Object.values(uniqueUsers);
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">No user data available</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.fullname}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>${user.location || 'N/A'}</td>
            <td>${new Date(user.signupTime).toLocaleString()}</td>
            <td>${new Date(user.lastLogin).toLocaleString()}</td>
            <td><span style="background: var(--primary); color: white; padding: 5px 10px; border-radius: 3px;">${user.loginCount}</span></td>
        </tr>
    `).join('');
}

function filterLogins(searchTerm) {
    const table = document.getElementById('loginsTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let row of rows) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
    }
}

function filterServices(searchTerm) {
    const table = document.getElementById('servicesTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let row of rows) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
    }
}

function filterUsers(searchTerm) {
    const table = document.getElementById('usersTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let row of rows) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
    }
}

function exportToCSV() {
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const serviceRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    
    let csv = 'USER LOGIN DATA\n';
    csv += 'Email,Password,Location,Phone,GPS Latitude,GPS Longitude,Accuracy,Login Time\n';
    
    notifications.forEach(login => {
        const gps = login.gps || login.gpsData;
        csv += `"${login.email}","••••••••","${login.location || ''}","${login.phone || ''}","${gps ? gps.latitude : ''}","${gps ? gps.longitude : ''}","${gps ? Math.round(gps.accuracy) : ''}","${new Date(login.sentAt || login.loginTime).toLocaleString()}"\n`;
    });
    
    csv += '\n\nSERVICE REQUESTS\n';
    csv += 'Service Type,Email,Location,Phone,Request Time\n';
    
    serviceRequests.forEach(service => {
        csv += `"${service.serviceName}","${service.email}","${service.location}","${service.phone || ''}","${new Date(service.requestTime).toLocaleString()}"\n`;
    });
    
    // Download CSV
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `admin_data_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert('Data exported successfully!');
}
