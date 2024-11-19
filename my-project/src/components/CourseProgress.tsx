import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";

type Course = { [key: string]: string[] };
type CurrentCourse = { [courseId: string]: string[] };
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
  }, []);

  // Массив курсов
  const allCourses: Course[] = items.map((item) => ({
    [item._id]: item.workouts,
  }));

  // Фильтрация тренировок с и без упражнений
  const trainingWithExercise = workouts.filter(
    (item) => item.exercises && item.exercises.length > 0,
  );

  const trainingWithoutExercise = workouts.filter(
    (item) => !item.exercises || item.exercises.length === 0,
  );

  // Прогресс тренировок без упражнений
  const progressTrainingWithoutExercise = trainingWithoutExercise.map(
    (item) => ({
      [item._id]: 1,
    }),
  );

  // Прогресс тренировок с упражнениями
  const progressTrainingWithExercise = trainingWithExercise.map((item) => {
    const totalQuantity = item.exercises
      ? item.exercises.reduce((sum, exercise) => sum + exercise.quantity, 0)
      : 0;
    return { [item._id]: totalQuantity };
  });

  // Прогресс всех тренировок
  const allTrainingProgress = [
    ...progressTrainingWithExercise,
    ...progressTrainingWithoutExercise,
  ];

  // Поиск текущего курса
  const currentCourse: CurrentCourse | undefined = allCourses.find((item) =>
    courseID ? item.hasOwnProperty(courseID) : false,
  );

  if (!currentCourse) {
    return 0;
  }

  // Прогресс для текущего курса
  const currentCourseTrainingsProgress = userEx.map((obj) => {
    const [key, exercises] = Object.entries(obj)[0];
    if (!exercises) return {};
    const sum = Object.values(exercises).reduce((sum, value) => sum + value, 0);
    return { [key]: sum };
  });

  const allProgressObj = Object.assign({}, ...allTrainingProgress);
  const currentProgressObj: { [key: string]: number } = Object.assign(
    {},
    ...currentCourseTrainingsProgress,
  );

  if (!currentProgressObj || Object.keys(currentProgressObj).length === 0) {
    return 0;
  }

  // Подсчет общего прогресса
  let calculateProgress = 0;

  for (const [key, value] of Object.entries(currentProgressObj)) {
    // value теперь типизировано как number
    if (value >= (allProgressObj[key] || 0)) {
      calculateProgress += 1;
    }
  }

  const progress =
    (calculateProgress * 100) / Object.values(currentCourse)[0].length;

  return Math.floor(progress);
};
