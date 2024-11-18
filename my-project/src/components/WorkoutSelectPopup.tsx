import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, get, onValue } from "firebase/database";

interface WorkoutOption {
  _id: string;
  name: string;
  description: string;
}

interface WorkoutSelectPopupProps {
  courseId: string;
  onClose: () => void;
}

type UserEx = { [workoutId: string]: { [exerciseId: string]: number } };

const WorkoutSelectPopup: React.FC<WorkoutSelectPopupProps> = ({
  courseId,
  onClose,
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOption[]>([]);
  const [userEx, setUserEx] = useState<UserEx[]>([]);

  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const getMatchingIds = (): string[] => {
    const matchingIds: string[] = [];

    workoutOptions.forEach((lesson) => {
      const lessonId = lesson._id;
      const matchingItem = userEx.find((item) => lessonId in item);

      if (
        matchingItem &&
        Object.values(matchingItem[lessonId]).some((ex) => ex > 0)
      ) {
        matchingIds.push(lessonId);
      }
    });

    return matchingIds;
  };

  const completedWorkouts = getMatchingIds();

  const handleSelection = (id: string) => {
    if (completedWorkouts.includes(id)) {
      setSelectedWorkout(id);
    } else {
      setSelectedWorkout(id);
    }
  };

  const handleStart = () => {
    if (selectedWorkout) {
      if (!completedWorkouts.includes(selectedWorkout)) {
        const updatedCompletedWorkouts = [
          ...completedWorkouts,
          selectedWorkout,
        ];
        localStorage.setItem(
          "completedWorkouts",
          JSON.stringify(updatedCompletedWorkouts),
        );
      }
      navigate(`/task/${selectedWorkout}`);
      onClose();
    }
  };

  const handleRestart = () => {
    handleStart();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchFilteredWorkouts = async () => {
      try {
        // Получение всех курсов
        const coursesRef = ref(database, "courses");
        const coursesSnapshot = await get(coursesRef);
        const allCoursesData = coursesSnapshot.val();

        const courseData = Array.isArray(allCoursesData)
          ? allCoursesData.find((course: any) => course._id === courseId)
          : allCoursesData[courseId];

        if (!courseData || !Array.isArray(courseData.workouts)) {
          console.error(
            `Курс с courseId: ${courseId} не найден или workouts отсутствуют.`,
            courseData,
          );
          setWorkoutOptions([]);
          return;
        }

        const workoutKeys = courseData.workouts;

        // Получение всех тренировок
        const dataRef = ref(database, "workouts");
        const workoutsSnapshot = await get(dataRef);
        const allWorkoutsData = workoutsSnapshot.val();

        if (!allWorkoutsData) {
          console.error("Нет данных для тренировок в базе данных.");
          setWorkoutOptions([]);
          return;
        }

        // Получние всех упражнений пользователя
        const dataUsEx = ref(
          database,
          `users/${auth.currentUser?.uid}/userExercises`,
        );
        onValue(dataUsEx, (snapshot) => {
          const data = snapshot.val() || {};
          setUserEx(data);
        });

        const workoutsArray = Object.values(allWorkoutsData) as WorkoutOption[];
        const filteredWorkouts = workoutsArray
          .filter((workout) => workoutKeys.includes(workout._id))
          .sort(
            (a, b) => Number(a.name.match(/\d+/)) - Number(b.name.match(/\d+/)),
          );

        setWorkoutOptions(filteredWorkouts);
      } catch (error) {
        console.error("Ошибка при получении данных о тренировках:", error);
        setWorkoutOptions([]);
      }
    };

    fetchFilteredWorkouts();
  }, [courseId]);

  const isButtonDisabled = !selectedWorkout; // Проверка на состояние кнопки

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="w-[460px] rounded-[30px] bg-white p-10">
        <h2 className="mb-4 text-center text-3xl font-normal">
          Выберите тренировку
        </h2>
        <form className="mb-12 mt-12 max-h-[450px] w-full max-w-[400px] overflow-auto">
          <ul>
            {workoutOptions.map((workout) => {
              const [mainTitle, subtitle] = workout.name.split(" / ");
              const isCompleted = completedWorkouts.includes(workout._id);
              return (
                <li
                  key={workout._id}
                  className="flex cursor-pointer items-center justify-between border-b p-3 hover:bg-gray-200 has-[:checked]:bg-gray-300"
                  onClick={() => handleSelection(workout._id)}
                >
                  <div>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workout"
                        value={workout._id}
                        checked={selectedWorkout === workout._id}
                        readOnly
                        className="peer hidden"
                        disabled={
                          isCompleted && selectedWorkout !== workout._id
                        }
                      />
                      <span
                        className={`mr-3 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-200 active:border-gray-300 ${
                          isCompleted ? "bg-white" : "bg-gray-300"
                        } peer-checked:border-btnPrimaryRegular peer-checked:bg-gray-200`}
                        style={{
                          backgroundImage: isCompleted
                            ? "url('../../../checked.svg')"
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundColor: isCompleted ? "white" : "",
                        }}
                      ></span>
                      <div>
                        <p className="cursor-pointer text-2xl">{mainTitle}</p>
                        <p className="text-base text-gray-600">{subtitle}</p>
                      </div>
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
        <button
          onClick={
            isButtonDisabled
              ? undefined
              : selectedWorkout && completedWorkouts.includes(selectedWorkout)
                ? handleRestart
                : handleStart
          }
          className={`buttonPrimary mt-4 w-full rounded-[46px] ${
            isButtonDisabled
              ? "cursor-not-allowed bg-btnPrimaryInactive"
              : "bg-btnPrimaryRegular hover:bg-btnPrimaryHover active:bg-btnPrimaryActive"
          }`}
          disabled={isButtonDisabled}
        >
          {selectedWorkout && completedWorkouts.includes(selectedWorkout)
            ? "Начать заново"
            : "Начать"}
        </button>
      </div>
    </div>
  );
};

export default WorkoutSelectPopup;
