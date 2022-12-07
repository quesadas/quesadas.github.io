import { db, collection, addDoc, onAuthStateChanged, auth } from './firebase.js';

const coursesRef = collection(db, "courses");
const createCourse = document.getElementById('createCourse');

onAuthStateChanged(auth, (user) => {
    createCourse.onclick = async () => {
        let course_name = document.getElementById('courseName');
        let course_days = document.getElementById('days');

        try {
            const newCoursesRef = await addDoc(coursesRef, {
                uid: user.uid,
                name: course_name.value,
                days: course_days.value,
            });
        } catch(err) {
            console.error("writeToDB failed. reason: ", err)
        }
    }
});
