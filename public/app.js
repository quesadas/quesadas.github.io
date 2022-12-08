import { app, auth, provider, db, onAuthStateChanged, signInWithPopup, signOut, collection, query, where, getDocs } from './firebase.js';

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

const tasksRef = collection(db, "tasks");
const toDoList = document.getElementById('listings');

let loadTasks  = async (user) => {
    const q = query(tasksRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    const items = querySnapshot.docs.map(doc => {
        return `<li><b>${doc.data().course_name}</b>: ${doc.data().type} - ${doc.data().text}</li>`
    });

    toDoList.innerHTML = items.join('');
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadTasks(user);
    }
});