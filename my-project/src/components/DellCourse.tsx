import { getDatabase, ref, get, set, } from "firebase/database";
import { auth } from "../firebase";

const deleteCourseData = async (courseId: string) => {
  try {
    const db = getDatabase();

    // Удаление курса из списка курсов пользователя
    const coursesRef = ref(db, `users/${auth.currentUser?.uid}/courses`);
    const coursesSnapshot = await get(coursesRef);

    if (coursesSnapshot.exists()) {
      const courses = coursesSnapshot.val();
      if (courses && Array.isArray(courses)) {
        const updatedCourses = courses.filter(
          (course: string) => course !== courseId,
        );
        await set(coursesRef, updatedCourses);
      } 
    }
  } catch (error) {
    console.error("Ошибка при удалении курса и упражнений:", error);
  }
};

export { deleteCourseData };
