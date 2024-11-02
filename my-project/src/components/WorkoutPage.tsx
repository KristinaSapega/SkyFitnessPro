import Header from "./Header";
import { workout } from "./dataList";
import MyProgressPopup from "./MyProgressPopup"; // Import the popup component
import { useState } from "react";

export const WorkoutPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[375px] px-[16px] desktop:w-[1440px] desktop:px-[140px]">
        <Header />
        <main className="">
          <section className="">
            <h1 className="mb-[10px] text-[24px] font-medium desktop:mb-6 desktop:text-[60px]">
              Йога
            </h1>
            <h3 className="text-[18px] underline desktop:text-[32px] ">
              {workout.name}
            </h3>
            <iframe
              className="my-6 aspect-video h-auto w-full max-w-full rounded-[8.87px] desktop:my-[40px] desktop:rounded-3xl"
              src={workout.video}
            ></iframe>
          </section>
          <div className="mb-[84px] rounded-[30px] shadow-[0px_4px_67px_-12px_#00000021] desktop:mb-[200px] desktop:rounded-3xl">
            <section className="p-[30px] desktop:p-[40px]">
              <h2 className="text-[32px]">Упражнения тренировки 2</h2>
              <ul className="flex grid-cols-3 flex-col gap-6 pt-5 desktop:grid desktop:gap-x-[60px]">
                {workout.exercises.map((items, index) => (
                  <li key={index} className="flex flex-col">
                    <label
                      className="pb-[10px] text-[18px] desktop:text-lg"
                      htmlFor=""
                    >
                      {items.name} {100 / items.quantity}%
                    </label>
                    <progress
                      className="h-[6px] w-[283px] desktop:w-80 [&::-moz-progress-bar]:bg-[#00C1FF] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-value]:bg-[#00C1FF]"
                      id="progress"
                      value="5"
                      max={items.quantity}
                    ></progress>
                  </li>
                ))}
              </ul>
              <button
                onClick={openPopup}
                className="mt-10 h-[52px] w-[283px] rounded-full bg-[#BCEC30] text-lg hover:bg-[#C6FF00] active:bg-black active:text-white desktop:w-80"
              >
                Заполнить свой прогресс
              </button>
            </section>
          </div>
        </main>
      </div>
      {isPopupVisible && <MyProgressPopup onClose={closePopup} />}
    </div>
  );
};

export default WorkoutPage;
