"use client";

import { useState } from "react";
import { HeroImage } from "./heroImages";
import { HeaderUserPopUp } from "./coursePageLoginPopUp";

export const CoursePage = () => {
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // состояние попапа
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // обработчик авторизации
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // обработчик открытия попапа
  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="flex flex-col items-center bg-[#FAFAFA]">
      <div className="relative w-[1440px]  pt-[50px] px-[140px]">
        {/* Шапка сайта */}
        <header className="flex justify-between">
          <div className="logoContainer">
            <img src="/skyFitnessPro.svg" alt="logo" width={220} height={35} />
            <p className="font-[roboto] font-normal text-[18px] text-[#00000050] leading-[19.8px] mt-[16px]">
              Онлайн-тренировки для занятий дома
            </p>
          </div>
          {isLoggedIn === false ? (
            <button
              onClick={handleLogin}
              className="w-[103px] h-[52px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-black active:text-white font-[roboto] rounded-[46px] ">
              Войти
            </button>
          ) : (
            <div className="flex items-start">
              <div
                onClick={handlePopupOpen}
                className="flex items-center cursor-pointer">
                <img src="/profile.svg" alt="logo" width={42} height={42} />
                <p className="font-[roboto] ml-[16px] mr-[12px] text-[24px] font-normal select-none	">
                  Сергей
                </p>
                <img
                  src="/rectangle_3765.svg"
                  alt="logo"
                  width={14}
                  height={11}
                />
              </div>
            </div>
          )}
        </header>

        {/* PopUP - ЛК */}
        {isPopupOpen && <HeaderUserPopUp />}

        {/* Главная картинка - компонент возвращает картинку по пропсу, сам пропс берем с сервера, такое решение ввиду разных размеров img */}
        <HeroImage param={"yoga"} />

        {/* Подойдет для Вас, если - когда будет готова база, перепишу чтоб можно было map-ать из данных с сервера  */}
        <p className="font-[roboto] text-[44px] font-semibold  text-black mb-[40px]">
          Подойдет для вас, если:
        </p>
        <div className="flex gap-x-[17px]">
          <div className="flex items-center gap-x-[25px] bg-gradient-to-r from-[#151720] to-[#1E212E] w-[368px] h-[141px] p-[20px] rounded-[20px] box-border">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              1
            </p>
            <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-white">
              Давно хотели попробовать йогу, но не решались начать
            </p>
          </div>
          <div className="flex items-center gap-x-[25px] bg-gradient-to-r from-[#151720] to-[#1E212E] w-[431px] h-[141px] p-[20px] rounded-[20px] box-border">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              2
            </p>
            <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-white">
              Хотите укрепить позвоночник, избавиться от болей в спине и
              суставах
            </p>
          </div>
          <div className="flex items-center gap-x-[25px] bg-gradient-to-r from-[#151720] to-[#1E212E] w-[327px] h-[141px] p-[20px] rounded-[20px] box-border">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              3
            </p>
            <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-white">
              Ищете активность, полезную для тела и души
            </p>
          </div>
        </div>

        {/* Направления, когда будет готова база, перепишу чтоб можно было map-ать из данных с сервера */}
        <div className="mt-[60px]">
          <p className="font-[roboto] text-[44px] font-semibold  text-black mb-[40px]">
            Направления
          </p>
          <div className="flex justify-around gap-x-[124px] w-[1160px] h-[146px] rounded-[30px] bg-[#BCEC30] p-[30px] box-border">
            <div className="flex flex-col gap-y-[34px]">
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Йога для новичков
                </p>
              </div>
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Классическая йога
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-[34px]">
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Йогатерапия
                </p>
              </div>
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Кундалини-йога
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-[34px]">
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Хатха-йога
                </p>
              </div>
              <div className="flex gap-x-[8px] items-center">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] leading-[26.4px] font-normal text-black">
                  Аштанга-йога
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Начните путь к новому телу */}
        <div className="mt-[102px] mb-[60px] ">
          <div className="bg-[url(/vector_6084.png)] bg-no-repeat bg-[right_55px_top_120px] flex relative w-[1160px] h-[486px] p-[40px] box-border bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)]">
            <div className="pb-[40px]">
              <p className="font-[roboto] text-[60px] leading-[60px] font-semibold  text-black mb-[28px] ">
                Начните путь <br /> к новому телу
              </p>
              <ul className="pl-[20px] mb-[28px]">
                <li className="font-[roboto] list-disc text-[rgba(0,0,0,0.6)] text-[24px]">
                  проработка всех групп мышц
                </li>
                <li className="font-[roboto] list-disc text-[rgba(0,0,0,0.6)] text-[24px]">
                  тренировка суставов
                </li>
                <li className="font-[roboto] list-disc text-[rgba(0,0,0,0.6)] text-[24px]">
                  улучшение циркуляции крови
                </li>
                <li className="font-[roboto] list-disc text-[rgba(0,0,0,0.6)] text-[24px]">
                  упражнения заряжают бодростью
                </li>
                <li className="font-[roboto] list-disc text-[rgba(0,0,0,0.6)] text-[24px]">
                  помогают противостоять стрессам
                </li>
              </ul>
              <button className="  hover:bg-[#C6FF00] active:bg-black active:text-white font-[roboto] text-black text-[18px] leading-[19.8px]  w-[437px] h-[52px] p-[16px] bg-[#BCEC30] rounded-[46px]">
                Войдите, чтобы добавить курс
              </button>
            </div>{" "}
            <img
              className="absolute bottom-5 right-10"
              src="/forestGump.png"
              alt="logo"
              width={505}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
