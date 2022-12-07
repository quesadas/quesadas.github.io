import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { getFirestore, addDoc, collection, query, where, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBOggXZGz4XvOqmhJ1dmU991iTbO_Ifj0s",
    authDomain: "finalproject-fc84e.firebaseapp.com",
    projectId: "finalproject-fc84e",
    storageBucket: "finalproject-fc84e.appspot.com",
    messagingSenderId: "904996038882",
    appId: "1:904996038882:web:772cc4b70d86a1a1a596bb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore database
const db = getFirestore(app);

signInButton.onclick = () => signInWithPopup(auth, provider);
signOutButton.onclick = () => {
    signOut(auth, provider);
    location.reload()
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // If a user signs in:
        signedInSection.hidden = false;
        signInButton.hidden = true;
        signOutButton.hidden = false;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3>`;
    } else {
        userDetails.innerHTML = '';
        signInButton.hidden = false;
        signOutButton.hidden = true;
    }
});


