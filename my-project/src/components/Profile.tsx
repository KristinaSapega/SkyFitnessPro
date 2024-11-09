import { useState, useEffect } from "react";
import Header from "./Header";
import { UserCabinet } from "./User";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { MainCardsImage } from "./MainCardsImage";

export const Profile = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserCourses = async (uid: string) => {
      try {
        const userCoursesRef = ref(database, `users/${uid}/courses`);
        const coursesSnapshot = await get(userCoursesRef);

        if (coursesSnapshot.exists()) {
          const courseIDs = coursesSnapshot.val();

          const allCoursesRef = ref(database, "courses");
          const allCoursesSnapshot = await get(allCoursesRef);
          const allCoursesData = allCoursesSnapshot.exists()
            ? allCoursesSnapshot.val()
            : [];

          const allCourses = Array.isArray(allCoursesData)
            ? allCoursesData
            : Object.values(allCoursesData);

          const userCoursesData = allCourses
            .filter((course: any) => courseIDs.includes(course._id))
            .map((course: any) => ({
              ...course,
              calendar: "30 дней",
              time: "20-50 мин/день",
              level: "Сложность",
              progress: 0,
            }));

          setUserCourses(userCoursesData);
        }
      } catch (error) {
        console.error("Ошибка при получении данных пользователя", error);
      } finally {
        setIsLoading(false);
      }
    };

    const initialize = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await fetchUserCourses(user.uid);
        } else {
          setIsLoading(false);
        }
      });
    };

    initialize();
  }, []);

  const handleMouseDown = (id: number) => {
    setActiveButton(id);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  if (isLoading) {
    return "";
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[1160px]">
        <Header />
        <div className="mt-14">
          <UserCabinet />
          <h1 className="my-8 text-lg font-bold md:text-xl lg:text-4xl">
            Мои курсы
          </h1>
          <div className="mt-12 flex justify-start gap-[40px]">
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
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
                  <MainCardsImage param={course._id} />

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
