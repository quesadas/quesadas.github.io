import { db, collection, onAuthStateChanged, auth, query, where, getDocs } from './firebase.js';

const coursesRef = collection(db, "courses");
const courseList = document.getElementById('courseList');

const tasksRef = collection(db, "tasks");

// Find all courses
let findCourses  = async (user) => {
    const q = query(coursesRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    // Debugging
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });

    let html_string = '';
    for (var i = 0; i < querySnapshot.docs.length; i++) {
        let doc = querySnapshot.docs[i];
        html_string += '<p>' + doc.data().name + ':</p>';
        const q_tasks = query(tasksRef, where('uid', '==', user.uid), where('course_id', '==', doc.id));
        const q_tasks_snapshot = await getDocs(q_tasks);
        const tasks_items = q_tasks_snapshot.docs.map(doct => {
            return `<li>${doct.data().type}: ${doct.data().text}</li>`;
        });
        html_string += tasks_items.join('');
    }

    courseList.innerHTML += html_string;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        findCourses(user)
    }
});