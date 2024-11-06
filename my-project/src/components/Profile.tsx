import { useState, useEffect } from "react";
import Header from "./Header";
import { User } from "./User";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";

export const Profile = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserCourses = async (uid: string) => {
      try {
        const userRef = ref(database, "users/" + uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.courses) {
            setUserCourses(data.courses);
          }
        }
      } catch (error) {
        console.error("Error fetching user courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAllCourses = async () => {
      const coursesData = [
        { _id: "6i67sm", urlImg: "stepAirobic.png", nameRU: "Степ-аэробика", calendar: "30 дней", time: "20-50 мин/день", level: "Сложность", progress: 40 },
        { _id: "ab1c3f", urlImg: "yoga.png", nameRU: "Йога", calendar: "25 дней", time: "20-50 мин/день", level: "Сложность", progress: 0 },
        { _id: "kfpq8e", urlImg: "stretching.png", nameRU: "Стретчинг", calendar: "25 дней", time: "20-50 мин/день", level: "Сложность", progress: 0 },
        { _id: "q02a6i", urlImg: "bodyFlex.png", nameRU: "Бодифлекс", calendar: "30 дней", time: "20-50 мин/день", level: "Сложность", progress: 20 },
        { _id: "ypox9r", urlImg: "danceFitness.png", nameRU: "Зумба", calendar: "25 дней", time: "20-50 мин/день", level: "Сложность", progress: 100 },
      ];
      setAllCourses(coursesData);
    };

    const initialize = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await fetchUserCourses(user.uid);
        } else {
          setIsLoading(false);
        }
      });

      await fetchAllCourses();
    };

    initialize();
  }, []);

  const handleMouseDown = (id: number) => {
    setActiveButton(id);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  const filteredCourses = allCourses.filter((course) =>
    userCourses.includes(course._id)
  );

  if (isLoading) {
    return "";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[1160px]">
        <Header />
        <div className="mt-14">
          <User />
          <h1 className="my-8 text-lg font-bold md:text-xl lg:text-4xl">
            Мои курсы
          </h1>
          <div className="mt-12 flex justify-start gap-[40px]">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="relative h-[649px] w-[360px] rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]"
                >
                  <button
                    className="absolute right-[20px] top-[20px]"
                    onClick={() => alert("Курс успешно удален")}
                  >
                    <img
                      src="/remove-in-Circle.svg"
                      alt="minus"
                      width={32}
                      height={32}
                    />
                  </button>
                  <div className="h-[325px] overflow-hidden rounded-[30px]">
                    <img
                      className="w-full object-cover"
                      src={course.urlImg}
                      alt={course.nameRU}
                    />
                  </div>
                  <div className="px-[30px] py-[24px]">
                    <h3 className="mb-[20px] text-3xl font-medium">
                      {course.nameRU}
                    </h3>
                    <ul className="flex flex-wrap gap-[6px]">
                      <li className="flex items-center gap-[7.5px] rounded-[50px] bg-btnPrimaryInactive p-[10px] text-base">
                        <img src="/calendar.svg" alt="" />
                        {course.calendar}
                      </li>
                      <li className="flex items-center gap-[7.5px] rounded-[50px] bg-btnPrimaryInactive p-[10px] text-base">
                        <img src="/time.svg" alt="" />
                        {course.time}
                      </li>
                      <li className="flex items-center gap-[7.5px] rounded-[50px] bg-btnPrimaryInactive p-[10px] text-base">
                        <img src="/level.svg" alt="" />
                        {course.level}
                      </li>
                    </ul>
                    <div className="mt-5">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс: {course.progress}%</span>
                      </div>
                      <div className="h-2 rounded bg-gray-200">
                        <div
                          className="h-full rounded bg-blue-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      className={`mt-[40px] mb-[15px] h-[52px] w-full rounded-full bg-btnPrimaryRegular hover:bg-btnPrimaryHover active:bg-btnPrimaryActive ${
                        activeButton === course._id ? "text-white" : "text-black"
                      }`}
                      onMouseDown={() => handleMouseDown(course._id)}
                      onMouseUp={handleMouseUp}
                      onClick={() => alert("Начать тренировку")}
                    >
                      {course.progress === 0
                        ? "Начать тренировки"
                        : course.progress === 100
                        ? "Начать заново"
                        : "Продолжить"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>У вас пока нет добавленных курсов.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
