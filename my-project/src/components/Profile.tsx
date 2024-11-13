import { useState, useEffect } from "react";
import Header from "./Header";
import { UserCabinet } from "./User";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { MainCardsImage } from "./MainCardsImage";
import WorkoutSelectPopup from "./WorkoutSelectPopup";
import { courseProgress } from "./CourseProgress";

const MyCorses = ({
  userCourses,
  setSelectedCourseId,
  setShowWorkoutPopup,
}) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleMouseDown = (id: number) => {
    setActiveButton(id);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };

  const handleWorkoutButtonClick = (courseId: string) => {
    setSelectedCourseId(courseId); // Устанавливаем выбранный курс
    setShowWorkoutPopup(true); // Открываем попап
  };

  function dayTitle(number: number) {
    let lastNum;
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return "дней";
    lastNum = number % 10;
    if (lastNum == 1) return "День";
    if ([2, 3, 4].includes(lastNum)) return "Дня";
    if ([5, 6, 7, 8, 9, 0].includes(lastNum)) return "Дней";
  }

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-[40px]">
      {userCourses.length > 0 ? (
        userCourses.map((course) => (
          <div
            key={course._id}
            className="relative h-[649px] w-[343px] desktop:w-[360px] rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]"
          >
            <button
              className="group absolute right-[20px] top-[20px] cursor-[url(coursor.svg),_pointer]"
              onClick={() =>
                alert("Удалим в следующий раз, а пока время тренировок")
              }
            >
              <img
                src="/remove-in-Circle.svg"
                alt="minus"
                width={32}
                height={32}
              />
              <div className="absolute left-[43px] top-[45px] z-10 hidden h-[27px] w-[100px] rounded-[5px] border-[0.5px] border-black bg-white group-hover:block">
                <p className="mt-1 text-sm">Удалить курс</p>
              </div>
            </button>
            <MainCardsImage param={course._id} />

            <div className="px-[30px] py-[24px]">
              <h3 className="mb-[20px] text-3xl font-medium">
                {course.nameRU}
              </h3>
              <ul className="flex flex-wrap gap-[6px]">
                <li className="flex items-center gap-[7.5px] rounded-[50px] bg-btnPrimaryInactive p-[10px] text-base">
                  <img src="/calendar.svg" alt="" />
                  {course.workouts.length} {dayTitle(course.workouts.length)}
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
                  <span>Прогресс: {courseProgress(course._id)}%</span>
                </div>
                <div className="h-2 rounded bg-gray-200">
                  <div
                    className="h-full rounded bg-blue-500"
                    style={{ width: `${courseProgress(course._id)}%` }}
                  ></div>
                </div>
              </div>
              <button
                className={`mb-[15px] mt-[40px] h-[52px] w-full rounded-full bg-btnPrimaryRegular hover:bg-btnPrimaryHover active:bg-btnPrimaryActive ${
                  activeButton === course._id ? "text-white" : "text-black"
                }`}
                onMouseDown={() => handleMouseDown(course._id)}
                onMouseUp={handleMouseUp}
                onClick={() => handleWorkoutButtonClick(course._id)}
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
  );
};

export const Profile = () => {
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showWorkoutPopup, setShowWorkoutPopup] = useState<boolean>(false);
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

          const userrrrCoursesData = allCourses.filter((course: any) =>
            courseIDs.includes(course._id),
          );

          const userCoursesData = userrrrCoursesData.map((course: any) => ({
            ...course,
            calendar: "30 дней",
            time: "20-50 мин/день",
            level: "Сложность",
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

  if (isLoading) {
    return "";
  }

  return (
    <div className="flex flex-col items-center py-[50px]">
      <div className="max-w-[1160px]">
        <Header />
        <div className="mt-14">
          <UserCabinet />
          <h1 className="mb-[24px] ml-[16px] text-[24px] font-bold leading-[26.4px] desktop:ml-[0px] desktop:text-[40px] desktop:leading-[44px]">
            Мои курсы
          </h1>
          <MyCorses
            userCourses={userCourses}
            setSelectedCourseId={setSelectedCourseId}
            setShowWorkoutPopup={setShowWorkoutPopup}
          />
        </div>
      </div>
      {/* WorkoutSelectPopup отображается при showWorkoutPopup */}
      {showWorkoutPopup && selectedCourseId && (
        <WorkoutSelectPopup
          courseId={selectedCourseId}
          onClose={() => setShowWorkoutPopup(false)}
        />
      )}
    </div>
  );
};
