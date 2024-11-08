import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { HeroImage } from "./HeroImages";
import { useModal } from "../hooks/useModal";
import Registry from "./Registry";
import Login from "./Login";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { useEffect, useState } from "react";


type TrainingItem = {
  _id: string | undefined;
  urlImg: string;
  trainType: string;
  nameRU: string;
  calendar: string;
  time: string;
  level: string;
  workouts: [];
  fitting: string[];
  directions: string[];
};

const ItemsComponent: React.FC<{ index: number; item: string }> = ({
  index,
  item,
}) => {
  return (
    <>
      <div
        key={index}
        className="corPageBlockGradient box-border flex h-[141px] w-[368px] items-center gap-x-[25px] rounded-[20px] p-[20px]"
      >
        <p className="text-[75px] font-medium text-btnPrimaryRegular">
          {index + 1}
        </p>
        <p className="text-[20px] font-normal leading-[22.4px] text-white">
          {item}
        </p>
      </div>
    </>
  );
};
const ItemsComponentItem: React.FC<{ index: number; item: string }> = ({
  index,
  item,
}) => {
  return (
    <>
      <div key={index}>
        <div className="flex items-center gap-x-[8px]">
          <img src="/star.svg" alt="logo" width={26} height={26} />
          <p className="text-[24px] font-normal leading-[26.4px] text-black">
            {item}
          </p>
        </div>
      </div>
    </>
  );
};
import { useModal } from "../hooks/useModal";
import Registry from "./Registry";
import Login from "./Login";
import { auth, database } from "../firebase";
import { useEffect, useState } from "react";
import { ref, set, get, update } from "firebase/database";

export const CoursePagesComp = () => {
  const params = useParams<{ nameEN: string | undefined }>();
  const { isRegistry, changeValue } = useModal();
  const [items, setItems] = useState([]);

  const train: TrainingItem = items.find(
    (item: TrainingItem) => item._id === params?.nameEN,
  );

  const fittings: string[] = train ? train.fitting : [];
  const directions: string[] = train ? train.directions : [];

  useEffect(() => {
    const dataRef = ref(database, "/courses");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setItems(data);
    });
  }, [database]);

  const { isRegistry, changeValue } = useModal();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuth(!!user);
      if (user) fetchUserCourses(user.uid);
    });
  }, []);

  const fetchUserCourses = async (uid: string) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя ", error);
    }
  };

  const writeUserDataInBase = async (uid: string, courseID: string) => {
    try {
      const coursesRef = ref(database, "/courses");
      const coursesSnapshot = await get(coursesRef);
      const allCourses = coursesSnapshot.val();

      if (!allCourses || !Array.isArray(allCourses)) {
        console.error("Courses data массив не правильного формата");
        return;
      }

      const courseData = allCourses.find((course: any) => course._id === courseID);
      if (!courseData) {
        console.error("в Course data не найден course ID:", courseID);
        return;
      }

      const courseWorkouts = courseData.workouts || [];
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const currentCourses = userData.courses || [];
        const currentWorkouts = userData.workouts || [];

        if (!currentCourses.includes(courseID)) {
          await update(userRef, {
            courses: [...currentCourses, courseID],
            workouts: [...new Set([...currentWorkouts, ...courseWorkouts])],
          });
          setUserCourses([...currentCourses, courseID]);
        }
      } else {
        const newUserData = {
          _id: uid,
          courses: [courseID],
          workouts: courseWorkouts,
        };
        await set(userRef, newUserData);
        setUserCourses([courseID]);
      }
    } catch (error) {
      console.error("Ошибка при добавлении данных к пользователю", error);
    }
  };

  const handleAddCourse = async () => {
    if (auth.currentUser && params.nameEN) {
      await writeUserDataInBase(auth.currentUser.uid, params.nameEN);
      navigate("/user");
    } else {
      console.error("Пользователь не авторизован или идентификатор курса отсутствует");
    }
  };

  const isCourseAdded = userCourses.includes(params.nameEN || "");

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[1440px] px-[140px]">
        <Header />

        <HeroImage param={params.nameEN} />
        <p className="mb-[40px] text-[44px] font-semibold text-black">
          Подойдет для вас, если:
        </p>
        <div className="flex gap-x-[17px]">
          <div className="corPageBlockGradient box-border flex h-[141px] w-[368px] items-center gap-x-[25px] rounded-[20px] p-[20px]">
            <p className="text-btnPrimaryRegular text-[75px] font-medium">1</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Давно хотели попробовать йогу, но не решались начать
            </p>
          </div>
          <div className="corPageBlockGradient box-border flex h-[141px] w-[431px] items-center gap-x-[25px] rounded-[20px] p-[20px]">
            <p className="text-btnPrimaryRegular text-[75px] font-medium">2</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Хотите укрепить позвоночник, избавиться от болей в спине и суставах
            </p>
          </div>
          <div className="corPageBlockGradient box-border flex h-[141px] w-[327px] items-center gap-x-[25px] rounded-[20px] p-[20px]">
            <p className="text-btnPrimaryRegular text-[75px] font-medium">3</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Ищете активность, полезную для тела и души
            </p>
          </div>
        </div>
        <section>
          <div className="mt-[60px]">
            <p className="mb-[40px] text-[44px] font-semibold text-black">
              Направления
            </p>
            <div className="bg-btnPrimaryRegular box-border flex h-[146px] w-[1160px] justify-around gap-x-[124px] rounded-[30px] p-[30px]">
              <div className="flex flex-col gap-y-[34px]">
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Йога для новичков
                  </p>
                </div>
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Классическая йога
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-[34px]">
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Йогатерапия
                  </p>
                </div>
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Кундалини-йога
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-[34px]">
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Хатха-йога
                  </p>
                </div>
                <div className="flex items-center gap-x-[8px]">
                  <img src="/star.svg" alt="logo" width={26} height={26} />
                  <p className="text-[24px] font-normal leading-[26.4px] text-black">
                    Аштанга-йога
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[60px] mt-[102px]">
            <div className="shadowBlack013 relative box-border flex h-[486px] w-[1160px] rounded-[30px] bg-white bg-[url(/vector_6084.png)] bg-[right_55px_top_120px] bg-no-repeat p-[40px]">
              <div className="pb-[40px]">
                <p className="mb-[28px] text-[60px] font-semibold leading-[60px] text-black">
                  Начните путь <br /> к новому телу
                </p>
                <ul className="mb-[28px] pl-[20px]">
                  <li className="corPageTextBlack06 list-disc text-[24px]">
                    проработка всех групп мышц
                  </li>
                  <li className="corPageTextBlack06 list-disc text-[24px]">
                    тренировка суставов
                  </li>
                  <li className="corPageTextBlack06 list-disc text-[24px]">
                    улучшение циркуляции крови
                  </li>
                  <li className="corPageTextBlack06 list-disc text-[24px]">
                    упражнения заряжают бодростью
                  </li>
                  <li className="corPageTextBlack06 list-disc text-[24px]">
                    помогают противостоять стрессам
                  </li>
                </ul>
                {isAuth ? (
                  isCourseAdded ? (
                    <button
                      className="buttonPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryActive w-[437px]"
                    >
                      Перейти
                    </button>
                  ) : (
                    <button
                      className="buttonPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryActive w-[437px]"
                      onClick={handleAddCourse}
                    >
                      Добавить курс
                    </button>
                  )
                ) : (
                  <button
                    className="buttonPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryActive w-[437px]"
                    onClick={changeValue}
                  >
                    Войдите, чтобы добавить курс
                  </button>
                )}
              </div>
              <img
                className="absolute bottom-5 right-10"
                src="/forestGump.png"
                alt="logo"
                width={505}
                height={100}
              />
            </div>
          </div>
        </section>
        {isRegistry ? <Registry /> : <Login />}
      </div>
    </div>
  );
};
