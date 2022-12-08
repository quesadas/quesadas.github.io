import { app, auth, provider, db, onAuthStateChanged, signInWithPopup, signOut } from './firebase.js';

const signInButton = document.getElementById('signInButton');
const signOutButton = document.getElementById('signOutButton');

signInButton.onclick = () => signInWithPopup(auth, provider);
signOutButton.onclick = () => {
    signOut(auth, provider);
    location.reload()
}


onAuthStateChanged(auth, (user) => {
    let signedInSection = document.getElementById('signedInSection');
    let userDetails = document.getElementById('userDetails')
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