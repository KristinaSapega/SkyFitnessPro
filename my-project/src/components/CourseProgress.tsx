import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";

type ExerciseProgress = { [key: string]: number };
type UserEx = { [workoutId: string]: { [exerciseId: string]: number } };
type AllWorkoutsType = {
  _id: string;
  exercises?: {
    name: string;
    quantity: number;
  }[];
};
type TrainingItem = {
  _id: string;
  urlImg: string;
  trainType: string;
  nameRU: string;
  calendar: string;
  time: string;
  level: string;
  workouts: string[];
  fitting: string[];
  directions: string[];
};
type CourseIDType = string | undefined;

export const courseProgress = (courseID: CourseIDType) => {
  const [items, setItems] = useState<TrainingItem[]>([]);
  const [workouts, setWorkouts] = useState<AllWorkoutsType[]>([]);
  const [userEx, setUserEx] = useState<UserEx[]>([]);

  const uid = auth.currentUser?.uid;

  // Загрузка данных о курсах
  useEffect(() => {
    const dataRef = ref(database, "/courses");
    onValue(dataRef, (snapshot) => {
      const data: TrainingItem[] = snapshot.val() || [];
      setItems(data);
    });
  }, []);

  // Загрузка данных о тренировках
  useEffect(() => {
    const dataRef = ref(database, "/workouts");
    onValue(dataRef, (snapshot) => {
      const data: AllWorkoutsType[] = snapshot.val() || [];
      setWorkouts(data);
    });
  }, []);

  // Загрузка данных о упражнениях пользователя
  useEffect(() => {
    const dataRef = ref(database, `users/${uid}/userExercises`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUserEx(data);
    });
  }, [uid]);

  // Прогресс тренировок
  const allTrainingProgress = workouts.map((item) => {
    const exercisesProgress = item.exercises?.reduce((acc: ExerciseProgress, exercise, index) => {
      acc[`ex_${index + 1}`] = exercise.quantity;
      return acc;
    }, {}) || {};

    return {
      [item._id]: exercisesProgress,
    };
  });


  const checkTrainingCompletion = (
        userProgress: ExerciseProgress,
    trainingProgress: ExerciseProgress
  ): boolean => {
    for (let exKey in trainingProgress) {
      if (userProgress[exKey] < trainingProgress[exKey]) {
        return false;
      }
    }
    return true;
  };

  // Расчет прогресса для текущего курса
  const course = items.find((item) => item._id === courseID);

  if (!course) return 0;

  const courseWorkouts = course.workouts;
  let completedWorkouts = 0;

  courseWorkouts.forEach((workoutId) => {
    const userWorkout = userEx.find((item) => workoutId in item);
    const userProgress = userWorkout ? userWorkout[workoutId] : {};
    const trainingProgress = allTrainingProgress.find(
      (item) => item[workoutId]
    )?.[workoutId];

    if (trainingProgress && checkTrainingCompletion( userProgress, trainingProgress)) {
      completedWorkouts++;
    }
  });

  const courseProgress = (completedWorkouts / courseWorkouts.length) * 100;


  return Math.floor(courseProgress); 
};
