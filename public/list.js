import { db, collection, onAuthStateChanged, auth, query, where, getDocs } from './firebase.js';

const coursesRef = collection(db, "courses");
const courseList = document.getElementById('courseList');

// Find all courses
let findCourses  = async (user) => {
    const q = query(coursesRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    // Debugging
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    const items = querySnapshot.docs.map(doc => {
        return `<li>${doc.data().name}: ${doc.data().days}</li>`
    });
    courseList.innerHTML = items.join('');
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        findCourses(user)
    }
});