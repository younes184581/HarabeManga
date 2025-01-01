import { auth, database } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, set, get } from "firebase/database";

// Get mangaId from URL
const urlParams = new URLSearchParams(window.location.search);
const mangaId = urlParams.get('mangaId');

// DOM Elements
const accountLink = document.getElementById('account-link');
const accountInfo = document.getElementById('account-info');
const logoutBtn = document.getElementById('logout-btn');
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// Debugging
console.log('Account Link:', accountLink);
console.log('Auth Modal:', authModal);
console.log('Signin Form:', signinForm);
console.log('Signup Form:', signupForm);

// Event Listeners
accountLink.addEventListener('click', toggleAuthModal);
closeModal.addEventListener('click', () => authModal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

signinForm.addEventListener('submit', handleSignIn);
signupForm.addEventListener('submit', handleSignUp);
logoutBtn.addEventListener('click', handleLogout);

// Authentication State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        accountInfo.style.display = 'block';
        document.getElementById('account-email').textContent = user.email;
        accountLink.textContent = 'حسابي';
    } else {
        // User is signed out
        accountInfo.style.display = 'none';
        accountLink.textContent = 'الحساب';
    }
});

function toggleAuthModal(e) {
    e.preventDefault();
    authModal.style.display = 'block';
}

async function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        authModal.style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
}

async function handleSignUp(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        authModal.style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
    } catch (error) {
        alert(error.message);
    }
}

