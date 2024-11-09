import { useState } from "react";
import Header from "./Header";
import { UserCabinet } from "./User";

const items = [
  {
    id: 1,
    urlImg: "yoga.png",
    trainType: "Йога",
    calendar: "25 дней",
    time: "20-50 мин/день",
    level: "Сложность",
    progress: 40,
  },
  {
    id: 2,
    urlImg: "stretching.png",
    trainType: "Стретчинг",
    calendar: "25 дней",
    time: "20-50 мин/день",
    level: "Сложность",
    progress: 0,
  },
  {
    id: 3,
    urlImg: "danceFitness.png",
    trainType: "Зумба",
    calendar: "25 дней",
    time: "20-50 мин/день",
    level: "Сложность",
    progress: 100,
  },
];

export const Profile = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleMouseDown = (id: number) => {
    setActiveButton(id);
  };

  const handleMouseUp = () => {
    setActiveButton(null);
  };
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
            {items.map((course) => (
              <div
                key={course.id}
                className="relative h-[649px] w-[360px] rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]"
              >
                <button
                  className="group cursor-[url(coursor.svg),_pointer] absolute right-[20px] top-[20px]"
                  onClick={() => console.log("Delete course", course.id)}
                >
                  <img
                    src="/remove-in-Circle.svg"
                    alt="minus"
                    width={32}
                    height={32}
                  />
                  <div className="absolute hidden group-hover:block left-[43px] top-[45px] w-[100px] h-[27px] border-[0.5px] border-black rounded-[5px] bg-white z-10"><p className="text-sm mt-1">Удалить курс</p></div>
                </button>
                <div className="h-[325px] overflow-hidden rounded-[30px]">
                  <img
                    className="w-full object-cover"
                    src={course.urlImg}
                    alt={course.trainType}
                  />
                </div>
                <div className="px-[30px] py-[24px]">
                  <h3 className="mb-[20px] text-3xl font-medium">
                    {course.trainType}
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
                    className={`mb-[15px] mt-[40px] h-[52px] w-full rounded-full bg-btnPrimaryRegular hover:bg-btnPrimaryHover active:bg-btnPrimaryActive ${
                      activeButton === course.id ? "text-white" : "text-black"
                    }`}
                    onMouseDown={() => handleMouseDown(course.id)}
                    onMouseUp={handleMouseUp}
                    onClick={() => console.log("Start training")}
                  >
                    {course.progress === 0
                      ? "Начать тренировки"
                      : course.progress === 100
                        ? "Начать заново"
                        : "Продолжить"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
