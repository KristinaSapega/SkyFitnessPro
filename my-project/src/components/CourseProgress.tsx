import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../firebase";

type WorkoutsType = {
  [key: string]: number;
};

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
  const [userWorkouts, setUserWorkouts] = useState<WorkoutsType>({});

  const uid = "MHXTXLvPRwO8LhSJGiApQFvLoRH3";

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
    const dataRef = ref(database, `users/${uid}/workouts`);
    onValue(dataRef, (snapshot) => {
      const data: WorkoutsType = snapshot.val() || {};
      setUserWorkouts(data);
    });
  }, []);

  // Массив с выборками { Курс: [Тренировка1, ...]}
  const allCourses = items.map((item) => ({
    [item._id]: item.workouts,
  }));

  // Фильтрация тренировок с упражнениями
  const trainingWithExercise = workouts.filter(
    (item) => item.exercises && item.exercises.length > 0,
  );

  // Фильтрация тренировок без упражнений
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

  // Базовый прогресс всех тренировок
  const allTrainingProgress = [
    ...progressTrainingWithExercise,
    ...progressTrainingWithoutExercise,
  ];

  // Преобразование для быстрого поиска
  const speedSearch = allTrainingProgress.reduce((acc, obj) => {
    const key = Object.keys(obj)[0];
    acc[key] = obj[key];
    return acc;
  }, {} as WorkoutsType);

  // Подсчитываем сумму для каждого объекта в курсах
  const totalSums = allCourses.map((course) => {
    const courseId = Object.keys(course)[0];
    const exercises = course[courseId] as string[];
    const total = exercises.reduce(
      (sum, id) => sum + (speedSearch[id] || 0),
      0,
    );
    return { [courseId]: total };
  });

  // Поиск текущего курса
  const currenCourse = allCourses.find((item) =>
    courseID ? item.hasOwnProperty(courseID) : false,
  );

  // Подсчет суммы тренировок пользователя для текущего курса
  const currenCourseSum: WorkoutsType = {};

  if (currenCourse && courseID) {
    const exercises = currenCourse[courseID] as string[];
    const sum = exercises.reduce(
      (total, id) => total + (userWorkouts[id] || 0),
      0,
    );
    currenCourseSum[courseID] = sum;
  }

  // Найдем объект с ключом тренировки
  const targetObject = totalSums.find((item) =>
    courseID ? item[courseID] !== undefined : false,
  );

  // Вычислим процентное соотношение
  let progress = 0;
  if (targetObject && courseID) {
    const totalValue = targetObject[courseID];
    if (totalValue) {
      progress = (currenCourseSum[courseID] / totalValue) * 100;
      if (progress > 100) {
        progress = 100;
      }
    }
  }

  return Math.floor(progress);
};
