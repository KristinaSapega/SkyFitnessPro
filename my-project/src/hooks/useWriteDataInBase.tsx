import { ref, set, get, update } from "firebase/database";
import { database } from "../firebase";

const useWriteDataInBase = async (
  uid: string,
  courseID: string,
  setUserCourses: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  try {
    const coursesRef = ref(database, "/courses");
    const coursesSnapshot = await get(coursesRef);
    const allCourses = coursesSnapshot.val();

    if (!allCourses || !Array.isArray(allCourses)) {
      console.error("Courses data массив не правильного формата");
      return;
    }

    const courseData = allCourses.find(
      (course: any) => course._id === courseID,
    );
    if (!courseData) {
      console.error("в Course data не найден course ID:", courseID);
      return;
    }

    const courseWorkouts = courseData.workouts || [];
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const currentCourses = userData.courses || [];
      const currentWorkouts = userData.workouts || [];

      if (!currentCourses.includes(courseID)) {
        await update(userRef, {
          courses: [...currentCourses, courseID],
          workouts: {
            ...currentWorkouts,
            ...Object.fromEntries(
              courseWorkouts.map((workout: string) => [workout, 0]),
            ),
          },
        });
        setUserCourses([...currentCourses, courseID]);
      }
    } else {
      const formattedWorkouts = Object.fromEntries(
        courseWorkouts.map((workout: string) => [workout, 0]),
      );

      const newUserData = {
        _id: uid,
        courses: [courseID],
        workouts: formattedWorkouts,
      };
      await set(userRef, newUserData);
      setUserCourses([courseID]);
    }
  } catch (error) {
    console.error("Ошибка при добавлении данных к пользователю", error);
  }
};

export default useWriteDataInBase;
