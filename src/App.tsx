const items = [
  {
    id: 1,
    urlImg: "yoga.png",
    trainType: "йога",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 2,
    urlImg: "stretching.png",
    trainType: "Стретчинг",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 3,
    urlImg: "danceFitness.png",
    trainType: "Зумба",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 4,
    urlImg: "stepAirobic.png",
    trainType: "Степ-аэробика",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 5,
    urlImg: "bodyFlex.png",
    trainType: "Бодифлекс",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },
  
];

import MyProgressPopup from "./components/MyProgressPopup/MyProgressPopup";
import { useState } from "react";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="flex flex-col items-center bg-[#FAFAFA]">
      <div className="w-[1440px]  pt-[50px] px-[140px]">
        <header className="flex justify-between just ">
          <div>
            <a href="">
              <img src="skyFitness1.png" alt="logo" />
            </a>
            <p className="mt-[15px] opacity-50">
              Онлайн-тренировки для занятий дома
            </p>
          </div>
          <button onClick={openPopup} className="w-[103px] h-[52px] bg-[#BCEC30] rounded-[46px]">
            Войти
          </button>
        </header>
        <main className="pt-[60px]">
          <div className="relative">
            <h1 className="w-[850px] h-[120px] font-medium text-6xl ">
              Начните заниматься спортом и улучшите качество жизни
            </h1>
            <img
              className="absolute right-0 top-0"
              src="cloudImage.png"
              alt="text"
            />
          </div>
          <ul className="flex flex-wrap gap-[40px] mt-[50px]">
            {items.map((train) => (
              <li className="w-[360px] h-[510px] rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021] relative">
                <div className="overflow-hidden h-[325px] rounded-[30px]">
                  <img
                    className="w-full object-cover"
                    src={train.urlImg}
                    alt={train.trainType}
                  />
                </div>
                <div className="py-[24px] px-[30px]">
                  <h3 className="font-medium text-3xl mb-[20px]">
                    {train.trainType}
                  </h3>
                  <ul className="flex flex-wrap gap-[6px]">
                    {[train.calendar, train.time, train.level].map((tag,index) => (
                      <li className=" flex items-center p-[10px] bg-[#F7F7F7] text-base rounded-[50px] gap-[7.5px]">
                        <img src={index===0?"calendar.svg":index===1?"time.svg":"level.svg"} alt="" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="absolute right-[20px] top-[20px]">
                  <img src="add-in-Circle.svg" alt="plus" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-[34px] mb-[81px]">
            <button className="w-[127px] h-[52px] rounded-[46px] bg-[#BCEC30]">
              Наверх ↑
            </button>
          </div>
          {isPopupOpen && <MyProgressPopup onClose={closePopup} />}
        </main>
      </div>
    </div>
  );
}

export default App;
