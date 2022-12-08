import { db, collection, onAuthStateChanged, auth, query, where, getDocs, addDoc } from './firebase.js';

const coursesRef = collection(db, "courses");
const selectCourse = document.getElementById('selectCourse');

const tasksRef = collection(db, "tasks");

// Load courses for drop-down menu
let loadCourses  = async (user) => {
    const q = query(coursesRef, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);

    // Debugging
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    const items = querySnapshot.docs.map(doc => {
        return `<option value=${doc.id}>${doc.data().name}</option>`;
    });
    selectCourse.innerHTML += items.join('');
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadCourses(user)
    }
});

const editCourse = document.getElementById('editCourse');

onAuthStateChanged(auth, (user) => {
    editCourse.onclick = async () => {
        let selected_course = document.getElementById('selectCourse');
        let task_type = document.getElementById('taskType');
        let task_text = document.getElementById('taskText');

        try {
            const newTaskRef = await addDoc(tasksRef, {
                uid: user.uid,
                course_id: selected_course.value,
                course_name: selected_course.options[selected_course.selectedIndex].text, 
                type: task_type.value,
                text: task_text.value
            });
        } catch(err) {
            console.error("writeToDB failed. reason: ", err)
        }
    }
});