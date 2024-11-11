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

const WorkoutSelectPopup: React.FC<WorkoutSelectPopupProps> = ({ courseId, onClose }) => {
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
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
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
        console.log("Запрашиваем данные для всех курсов...");

        const coursesRef = ref(database, 'courses');
        const coursesSnapshot = await get(coursesRef);
        const allCoursesData = coursesSnapshot.val();

        console.log("Все данные курсов:", allCoursesData);

        const courseData = Array.isArray(allCoursesData)
          ? allCoursesData.find((course: any) => course._id === courseId)
          : allCoursesData[courseId];

        if (!courseData || !Array.isArray(courseData.workouts)) {
          console.error(`Курс с courseId: ${courseId} не найден или workouts отсутствуют.`, courseData);
          setWorkoutOptions([]);
          return;
        }

        const workoutKeys = courseData.workouts;
        console.log("Ключи тренировок:", workoutKeys);

        const dataRef = ref(database, 'workouts');
        const workoutsSnapshot = await get(dataRef);
        const allWorkoutsData = workoutsSnapshot.val();

        if (!allWorkoutsData) {
          console.error("Нет данных для тренировок в базе данных.");
          setWorkoutOptions([]);
          return;
        }

        console.log("Все данные тренировок:", allWorkoutsData);

        const workoutsArray = Object.values(allWorkoutsData) as WorkoutOption[];

        const filteredWorkouts = workoutsArray.filter((workout) =>
          workoutKeys.includes(workout._id)
        );

        console.log("Отфильтрованные тренировки:", filteredWorkouts);
        setWorkoutOptions(filteredWorkouts);
      } catch (error) {
        console.error("Ошибка при получении данных о тренировках:", error);
        setWorkoutOptions([]);
      }
    };

    fetchFilteredWorkouts();
  }, [courseId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popupRef} className="bg-white rounded-[30px] p-10 w-[460px]">
        <h2 className="text-center text-3xl font-normal mb-4">Выберите тренировку</h2>
        <form className="h-[450px] max-w-[400px] mt-12 w-full overflow-auto">
          <ul>
            {workoutOptions.map((workout) => {
              // Разделяем название тренировки на основную часть и дополнительную информацию
              const [mainTitle, subtitle] = workout.name.split(" / ");

              return (
                <li key={workout._id} className="p-3 border-b flex justify-between items-center">
                  <div>
                    <label className="cursor-pointer flex items-center">
                      <input
                        type="radio"
                        name="workout"
                        value={workout._id}
                        checked={selectedWorkout === workout._id}
                        onChange={() => handleSelection(workout._id)}
                        className="hidden peer"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 border-gray-300 flex justify-center items-center mr-3 peer-checked:border-btnPrimaryRegular`}
                        style={{
                          backgroundImage: selectedWorkout === workout._id
                            ? "url('../../../checked.svg')"
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></span>
                      <div>
                        <p className="text-2xl ">{mainTitle}</p>
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
          className="w-full mt-4 buttonPrimary active:text-white bg-btnPrimaryRegular rounded-[46px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default WorkoutSelectPopup;
