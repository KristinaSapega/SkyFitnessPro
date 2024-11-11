import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, get } from "firebase/database";

interface WorkoutOption {
  _id: string;
  name: string;
  description: string;
}

interface WorkoutSelectPopupProps {
  courseId: string;
  onClose: () => void;
}

const WorkoutSelectPopup: React.FC<WorkoutSelectPopupProps> = ({
  courseId,
  onClose,
}) => {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workoutOptions, setWorkoutOptions] = useState<WorkoutOption[]>([]);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSelection = (id: string) => {
    setSelectedWorkout(id);
  };

  const handleStart = () => {
    if (selectedWorkout) {
      navigate(`/task/${selectedWorkout!}`);
      onClose();
    } else {
      alert("Пожалуйста, выберите тренировку");
    }
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

        const dataRef = ref(database, "workouts");
        const workoutsSnapshot = await get(dataRef);
        const allWorkoutsData = workoutsSnapshot.val();

        if (!allWorkoutsData) {
          console.error("Нет данных для тренировок в базе данных.");
          setWorkoutOptions([]);
          return;
        }

        const workoutsArray = Object.values(allWorkoutsData) as WorkoutOption[];

        const filteredWorkouts = workoutsArray.filter((workout) =>
          workoutKeys.includes(workout._id),
        );

        setWorkoutOptions(filteredWorkouts);
      } catch (error) {
        console.error("Ошибка при получении данных о тренировках:", error);
        setWorkoutOptions([]);
      }
    };

    fetchFilteredWorkouts();
  }, [courseId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={popupRef} className="w-[460px] rounded-[30px] bg-white p-10">
        <h2 className="mb-4 text-center text-3xl font-normal">
          Выберите тренировку
        </h2>
        <form className="mt-12 h-[450px] w-full max-w-[400px] overflow-auto">
          <ul>
            {workoutOptions.map((workout) => {
              // Разделяем название тренировки на основную часть и дополнительную информацию
              const [mainTitle, subtitle] = workout.name.split(" / ");

              return (
                <li
                  key={workout._id}
                  className="flex items-center justify-between border-b p-3"
                >
                  <div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="radio"
                        name="workout"
                        value={workout._id}
                        checked={selectedWorkout === workout._id}
                        onChange={() => handleSelection(workout._id)}
                        className="peer hidden"
                      />
                      <span
                        className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 peer-checked:border-btnPrimaryRegular`}
                        style={{
                          backgroundImage:
                            selectedWorkout === workout._id
                              ? "url('../../../checked.svg')"
                              : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></span>
                      <div>
                        <p className="text-2xl">{mainTitle}</p>
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
          onClick={handleStart}
          className="buttonPrimary mt-4 w-full rounded-[46px] bg-btnPrimaryRegular hover:bg-btnPrimaryHover active:bg-btnPrimaryActive active:text-white disabled:bg-btnPrimaryInactive"
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default WorkoutSelectPopup;
