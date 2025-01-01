import { auth } from './firebase.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');
const tabs = document.querySelectorAll('.tab-link');
const forms = document.querySelectorAll('.auth-form');

// Get redirect URL from query parameters
const urlParams = new URLSearchParams(window.location.search);
const redirectUrl = urlParams.get('redirect') || 'index.html';
sessionStorage.setItem('redirectUrl', redirectUrl);

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding form
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === tabName) {
                form.classList.add('active');
            }
        });
    });
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = loginForm['loginEmail'].value;
    const password = loginForm['loginPassword'].value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage('تم تسجيل الدخول بنجاح!', 'success');
        const redirect = sessionStorage.getItem('redirectUrl') || 'index.html';
        window.location.href = redirect;
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Handle Registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = registerForm['registerEmail'].value;
    const password = registerForm['registerPassword'].value;
    const confirmPassword = registerForm['confirmPassword'].value;
    
    if (password !== confirmPassword) {
        showMessage('كلمة المرور غير متطابقة', 'error');
        return;
    }
    
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        showMessage('تم إنشاء الحساب بنجاح!', 'success');
        const redirect = sessionStorage.getItem('redirectUrl') || 'index.html';
        window.location.href = redirect;
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Show Messages
function showMessage(message, type) {
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = 'block';
    
    setTimeout(() => {
        authMessage.style.display = 'none';
    }, 5000);
}

// Check Admin Status
async function checkAdminStatus(user) {
    try {
        const database = getDatabase();
        const adminRef = ref(database, `admins/${user.uid}`);
        const snapshot = await get(adminRef);
        return snapshot.exists() && snapshot.val() === true;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// Check Auth State and Handle Session Persistence
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        console.log('User is logged in:', user.email);
        
        // Check admin status
        const isAdmin = await checkAdminStatus(user);
        
        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify({
            email: user.email,
            uid: user.uid,
            isAdmin: isAdmin
        }));
    } else {
        // User is signed out
        console.log('User is logged out');
        // Clear user data from sessionStorage
        sessionStorage.removeItem('user');
    }
});

// Check Authentication on Page Load
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        console.log('User is already logged in:', user.email);
        return true;
    }
    return false;
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!checkAuth()) {
        window.location.href = 'auth.html';
    }
}

// Initialize authentication check on page load
document.addEventListener('DOMContentLoaded', () => {
    // For pages that require authentication
    if (document.body.classList.contains('require-auth')) {
        requireAuth();
    }
});
