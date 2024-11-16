import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase";

type Course = { [key: string]: string[] };
type Progress = { [key: string]: number };
type CurrentCourse = { [courseId: string]: string[] };
type UserEx = { [workoutId: string]: { [exerciseId: string]: number } };
type CourseProgress = { [courseId: string]: number };
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

  // Загрузка всех курсов
  useEffect(() => {
    const dataRef = ref(database, "/courses");
    onValue(dataRef, (snapshot) => {
      const data: TrainingItem[] = snapshot.val() || [];
      setItems(data);
    });
  }, []);

  // Загрузка всех тренировок
  useEffect(() => {
    const dataRef = ref(database, "/workouts");
    onValue(dataRef, (snapshot) => {
      const data: AllWorkoutsType[] = snapshot.val() || [];
      setWorkouts(data);
    });
  }, []);

  // Загрузка тренировок пользователя
  useEffect(() => {
    const dataRef = ref(database, `users/${uid}/userExercises`);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val() || {};
      setUserEx(data);
    });
  }, []);

  // Массив с выборками { Курс: [Тренировка1, ...]}
  const allCourses: Course[] = items.map((item) => ({
    [item._id]: item.workouts,
  }));

  // Базовый прогресс всех тренировок
  const baseProgress: Progress = allCourses.reduce<Progress>((acc, item) => {
    const [key, values] = Object.entries(item)[0];
    acc[key] = values.length;
    return acc;
  }, {});

  // Поиск текущего курса
  const currentCourse: CurrentCourse | undefined = allCourses.find((item) =>
    courseID ? item.hasOwnProperty(courseID) : false,
  );

  // Прогресс текущего курса
  const currentCourseprogress: CourseProgress = {};

  for (const courseId in currentCourse) {
    const workoutIds = currentCourse[courseId];
    let totalProgress = 0;

    workoutIds.forEach((workoutId) => {
      // Ищем тренировку
      const workoutObj = userEx.find((obj) => obj[workoutId]);

      if (workoutObj) {
        const exercises = workoutObj[workoutId];
        // Определяем прогресс для текущей тренировки 
        const progress = Object.values(exercises).some((value) => value > 0)
          ? 1
          : 0;
        totalProgress += progress;
      }
    });

    // Присваиваем вычисленный прогресс в currentCourseprogress
    currentCourseprogress[courseId] = totalProgress;
  }
  // Вычислим процентное соотношение текущей тренировки от общего прогресса 
  let progress: number = 0;
  for (const courseId in currentCourseprogress) {
    if (baseProgress[courseId] !== undefined) {
      const current = currentCourseprogress[courseId];
      const base: number = Number(baseProgress[courseId]);
      progress = (current / base) * 100;
    }
  }

  return Math.floor(progress);
};
