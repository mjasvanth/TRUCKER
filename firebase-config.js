// =====================
// FIREBASE CONFIGURATION
// =====================
// To use Firebase, sign up at https://firebase.google.com/

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firestore Database
const db = firebase.firestore();

// Initialize Firebase Storage
const storage = firebase.storage();

// =====================
// FIREBASE UTILITIES
// =====================

/**
 * Register user with Firebase Authentication
 */
async function registerUserWithFirebase(email, password, fullname, phone) {
    try {
        // Create user account
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            fullname: fullname,
            phone: phone,
            createdAt: new Date().toISOString(),
            verified: false,
            loginCount: 0,
            lastLogin: null
        });

        console.log('User registered successfully:', user.uid);
        return user;
    } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
    }
}

/**
 * Login user with Firebase Authentication
 */
async function loginUserWithFirebase(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Update last login timestamp
        await db.collection('users').doc(user.uid).update({
            lastLogin: new Date().toISOString(),
            loginCount: firebase.firestore.FieldValue.increment(1)
        });

        console.log('User logged in successfully:', user.uid);
        return user;
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}

/**
 * Logout user from Firebase
 */
async function logoutUserFromFirebase() {
    try {
        await auth.signOut();
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
}

/**
 * Get current user
 */
function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Store user login record with GPS data
 */
async function storeLoginRecordWithGPS(userId, email, location, gpsData, browserInfo) {
    try {
        await db.collection('loginRecords').add({
            userId: userId,
            email: email,
            location: location,
            gps: {
                latitude: gpsData?.latitude || null,
                longitude: gpsData?.longitude || null,
                accuracy: gpsData?.accuracy || null
            },
            browserInfo: browserInfo,
            timestamp: new Date().toISOString(),
            deviceType: /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
        });

        console.log('Login record stored successfully');
    } catch (error) {
        console.error('Error storing login record:', error.message);
        throw error;
    }
}

/**
 * Store service request
 */
async function storeServiceRequest(userId, email, serviceName, location, phone, gpsData) {
    try {
        const docRef = await db.collection('serviceRequests').add({
            userId: userId,
            email: email,
            serviceName: serviceName,
            location: location,
            phone: phone,
            gps: {
                latitude: gpsData?.latitude || null,
                longitude: gpsData?.longitude || null,
                accuracy: gpsData?.accuracy || null
            },
            status: 'pending',
            requestTime: new Date().toISOString(),
            notes: ''
        });

        console.log('Service request stored:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error storing service request:', error.message);
        throw error;
    }
}

/**
 * Get user profile from Firestore
 */
async function getUserProfile(userId) {
    try {
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log('User document not found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user profile:', error.message);
        throw error;
    }
}

/**
 * Update user profile
 */
async function updateUserProfile(userId, updates) {
    try {
        await db.collection('users').doc(userId).update({
            ...updates,
            updatedAt: new Date().toISOString()
        });

        console.log('User profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error.message);
        throw error;
    }
}

/**
 * Get user's service requests
 */
async function getUserServiceRequests(userId) {
    try {
        const querySnapshot = await db.collection('serviceRequests')
            .where('userId', '==', userId)
            .orderBy('requestTime', 'desc')
            .get();

        const requests = [];
        querySnapshot.forEach(doc => {
            requests.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return requests;
    } catch (error) {
        console.error('Error getting service requests:', error.message);
        throw error;
    }
}

/**
 * Get all login records (Admin)
 */
async function getLoginRecords() {
    try {
        const querySnapshot = await db.collection('loginRecords')
            .orderBy('timestamp', 'desc')
            .limit(1000)
            .get();

        const records = [];
        querySnapshot.forEach(doc => {
            records.push(doc.data());
        });

        return records;
    } catch (error) {
        console.error('Error getting login records:', error.message);
        throw error;
    }
}

/**
 * Get all service requests (Admin)
 */
async function getAllServiceRequests() {
    try {
        const querySnapshot = await db.collection('serviceRequests')
            .orderBy('requestTime', 'desc')
            .get();

        const requests = [];
        querySnapshot.forEach(doc => {
            requests.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return requests;
    } catch (error) {
        console.error('Error getting service requests:', error.message);
        throw error;
    }
}

/**
 * Get all users (Admin)
 */
async function getAllUsers() {
    try {
        const querySnapshot = await db.collection('users')
            .orderBy('createdAt', 'desc')
            .get();

        const users = [];
        querySnapshot.forEach(doc => {
            users.push({
                uid: doc.id,
                ...doc.data()
            });
        });

        return users;
    } catch (error) {
        console.error('Error getting users:', error.message);
        throw error;
    }
}

/**
 * Delete user account (Admin)
 */
async function deleteUserAccount(userId) {
    try {
        // Delete user from Firestore
        await db.collection('users').doc(userId).delete();

        // Delete associated login records
        const loginRecords = await db.collection('loginRecords')
            .where('userId', '==', userId)
            .get();

        loginRecords.forEach(doc => {
            doc.ref.delete();
        });

        // Delete associated service requests
        const serviceRequests = await db.collection('serviceRequests')
            .where('userId', '==', userId)
            .get();

        serviceRequests.forEach(doc => {
            doc.ref.delete();
        });

        console.log('User account deleted successfully');
    } catch (error) {
        console.error('Error deleting user account:', error.message);
        throw error;
    }
}

/**
 * Listen for authentication state changes
 */
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User is logged in:', user.uid);
        sessionStorage.setItem('firebaseUser', JSON.stringify({
            uid: user.uid,
            email: user.email
        }));
    } else {
        console.log('User is logged out');
        sessionStorage.removeItem('firebaseUser');
    }
});

export {
    auth,
    db,
    storage,
    registerUserWithFirebase,
    loginUserWithFirebase,
    logoutUserFromFirebase,
    getCurrentUser,
    storeLoginRecordWithGPS,
    storeServiceRequest,
    getUserProfile,
    updateUserProfile,
    getUserServiceRequests,
    getLoginRecords,
    getAllServiceRequests,
    getAllUsers,
    deleteUserAccount
};
