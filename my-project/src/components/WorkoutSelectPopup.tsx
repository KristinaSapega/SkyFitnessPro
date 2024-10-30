import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WorkoutOption {
  id: number;
  name: string;
  description: string;
}

interface WorkoutSelectPopupProps {
  onClose: () => void;
}

const WorkoutSelectPopup: React.FC<WorkoutSelectPopupProps> = ({ onClose }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSelection = (id: number) => {
    setSelectedWorkout(id === selectedWorkout ? null : id);
  };

  const handleStart = () => {
    if (selectedWorkout !== null) {
      navigate(`/task/${selectedWorkout}`);
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

  const workoutOptions: WorkoutOption[] = [
    { id: 1, name: "Утренняя практика", description: "Йога на каждый день / 1 день" },
    { id: 2, name: "Красота и здоровье", description: "Йога на каждый день / 2 день" },
    { id: 3, name: "Асаны стоя", description: "Йога на каждый день / 3 день" },
    { id: 4, name: "Растягиваем мышцы бедра", description: "Йога на каждый день / 4 день" },
    { id: 5, name: "Гибкость спины", description: "Йога на каждый день / 5 день" },
    { id: 6, name: "Гибкость спины", description: "Йога на каждый день / 6 день" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popupRef} className="bg-white rounded-[30px] p-10 w-[460px]">
        <h2 className="text-center text-3xl font-normal mb-4">Выберите тренировку</h2>
        <form className="h-[450px] max-w-[400px] mt-12 w-full overflow-auto">
          <ul>
            {workoutOptions.map((workout) => (
              <li
                key={workout.id}
                className="p-3 border-b flex justify-between items-center"
              >
                <div>
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      name="workout"
                      value={workout.id}
                      checked={selectedWorkout === workout.id}
                      onChange={() => handleSelection(workout.id)}
                      className="hidden peer"
                    />
                    <span
                      className={`w-5 h-5 rounded-full border-2 border-gray-300 flex justify-center items-center mr-3 peer-checked:border-btnPrimaryRegular`}
                      style={{
                        backgroundImage: selectedWorkout === workout.id
                          ? "url('../../../checked.svg')"
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></span>
                    <div>
                      <p className="font-normal text-2xl">{workout.name}</p>
                      <p className="text-base font-normal">{workout.description}</p>
                    </div>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </form>
        <button
          onClick={handleStart}
          className="w-full mt-4 buttonPrimary active:text-white bg-btnPrimaryRegular rounded-[46px]  hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
        >
          Начать
        </button>
      </div>
    </div>
  );
};

export default WorkoutSelectPopup;
