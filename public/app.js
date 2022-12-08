import { app, auth, provider, db, onAuthStateChanged, signInWithPopup, signOut } from './firebase.js';

const signInButton = document.getElementById('signInButton');
const signOutButton = document.getElementById('signOutButton');
const headerText = document.getElementById("introH");
const headerP = document.getElementById("introP");
const points = document.getElementById("listings");
const pointsHeader = document.getElementById("listTitle");


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
        headerText.hidden = true;
        headerP.hidden = true;
        pointsHeader.hidden = false;
        points.hidden = false;

        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3>`;
    } else {
        userDetails.innerHTML = '';
        signInButton.hidden = false;
        signOutButton.hidden = true;
        headerText.hidden = false;
        headerP.hidden = false;
        pointsHeader.hidden = true;
        points.hidden = true;
    }
});