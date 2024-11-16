import { ref, set, get, update } from "firebase/database";
import { database } from "../firebase";

// Defining the structure for courses and workouts
interface Course {
  _id: string;
  workouts: string[];
}

interface Exercise {
  name: string;
  quantity: number;
  index: number; // Added index property for consistency
}

interface Workout {
  _id: string;
  name: string;
  exercises?: Exercise[];
}

interface UserExercise {
  [key: string]: { [exerciseKey: string]: number };
}

interface UserData {
  _id: string;
  courses: string[];
  userExercises: UserExercise[];
}

const useWriteDataInBase = async (
  uid: string,
  courseID: string,
  setUserCourses: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  try {
    // Fetching all courses from Firebase
    const coursesRef = ref(database, "/courses");
    const coursesSnapshot = await get(coursesRef);
    const allCourses: Course[] = coursesSnapshot.val() || [];

    if (!Array.isArray(allCourses)) {
      console.error("Courses data is not in the correct format");
      return;
    }

    // Fetching all workouts from Firebase
    const workoutsRef = ref(database, "/workouts");
    const workoutsSnapshot = await get(workoutsRef);
    const allWorkouts: Workout[] = workoutsSnapshot.val() || [];

    const courseData = allCourses.find((course) => course._id === courseID);

    if (!courseData) {
      console.error("Course data not found for course ID:", courseID);
      return;
    }

    const courseWorkouts = courseData.workouts || [];
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);

    // Preparing data structure for saving exercises
    const exercisesData: UserExercise[] = [];
    courseWorkouts.forEach((id) => {
      const item = allWorkouts.find((entry) => entry._id === id);
      if (item) {
        const exerciseObj: UserExercise = {
          [item._id]: {},
        };
        if (item.exercises) {
          item.exercises.forEach((exercise, index) => {
            exerciseObj[item._id][`ex_${index + 1}`] = 0;
          });
        } else {
          exerciseObj[item._id][`ex_1`] = 0; // Default to ex_1 if no exercises exist
        }
        exercisesData.push(exerciseObj);
      }
    });

    if (snapshot.exists()) {
      const userData: UserData = snapshot.val();
      const currentCourses = userData.courses || [];
      const currentWorkouts = userData.userExercises || [];

      if (!currentCourses.includes(courseID)) {
        await update(userRef, {
          courses: [...currentCourses, courseID],
          userExercises: [...currentWorkouts, ...exercisesData],
        });
        setUserCourses([...currentCourses, courseID]);
      }
    } else {
      const newUserData: UserData = {
        _id: uid,
        courses: [courseID],
        userExercises: exercisesData,
      };
      await set(userRef, newUserData);
      setUserCourses([courseID]);
    }
  } catch (error) {
    console.error("Error adding data to the user", error);
  }
};

export default useWriteDataInBase;
