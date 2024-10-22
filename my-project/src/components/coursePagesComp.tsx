"use client";

import { useState } from "react";
import { HeroImage } from "./heroImages";
import { HeaderUserPopUp } from "./headerPopUp";

export const CoursePagesComp = () => {
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
      <div className="relative w-[1440px] px-[140px]">
        {/* Шапка сайта */}
        <header className="flex justify-between">
          <div className="logoContainer">
            <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
            <p className="mt-[16px] font-[roboto] text-[18px] font-normal leading-[19.8px] text-[#00000050]">
              Онлайн-тренировки для занятий дома
            </p>
          </div>
          {isLoggedIn === false ? (
            <button
              onClick={handleLogin}
              className="buttonPrimary w-[103px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
            >
              Войти
            </button>
          ) : (
            <div className="flex items-start">
              <div
                onClick={handlePopupOpen}
                className="flex cursor-pointer items-center"
              >
                <img src="/profile.svg" alt="logo" width={42} height={42} />
                <p className="ml-[16px] mr-[12px] select-none font-[roboto] text-[24px] font-normal">
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
        <p className="mb-[40px] font-[roboto] text-[44px] font-semibold text-black">
          Подойдет для вас, если:
        </p>
        <div className="flex gap-x-[17px]">
          <div className="box-border flex h-[141px] w-[368px] items-center gap-x-[25px] rounded-[20px] bg-gradient-to-r from-[#151720] to-[#1E212E] p-[20px]">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              1
            </p>
            <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-white">
              Давно хотели попробовать йогу, но не решались начать
            </p>
          </div>
          <div className="box-border flex h-[141px] w-[431px] items-center gap-x-[25px] rounded-[20px] bg-gradient-to-r from-[#151720] to-[#1E212E] p-[20px]">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              2
            </p>
            <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-white">
              Хотите укрепить позвоночник, избавиться от болей в спине и
              суставах
            </p>
          </div>
          <div className="box-border flex h-[141px] w-[327px] items-center gap-x-[25px] rounded-[20px] bg-gradient-to-r from-[#151720] to-[#1E212E] p-[20px]">
            <p className="font-[roboto] text-[75px] font-medium text-[#BCEC30]">
              3
            </p>
            <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-white">
              Ищете активность, полезную для тела и души
            </p>
          </div>
        </div>

        {/* Направления, когда будет готова база, перепишу чтоб можно было map-ать из данных с сервера */}
        <div className="mt-[60px]">
          <p className="mb-[40px] font-[roboto] text-[44px] font-semibold text-black">
            Направления
          </p>
          <div className="box-border flex h-[146px] w-[1160px] justify-around gap-x-[124px] rounded-[30px] bg-[#BCEC30] p-[30px]">
            <div className="flex flex-col gap-y-[34px]">
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Йога для новичков
                </p>
              </div>
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Классическая йога
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-[34px]">
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Йогатерапия
                </p>
              </div>
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Кундалини-йога
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-[34px]">
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Хатха-йога
                </p>
              </div>
              <div className="flex items-center gap-x-[8px]">
                <img src="/star.svg" alt="logo" width={26} height={26} />
                <p className="font-[roboto] text-[24px] font-normal leading-[26.4px] text-black">
                  Аштанга-йога
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Начните путь к новому телу */}
        <div className="mb-[60px] mt-[102px]">
          <div className="relative box-border flex h-[486px] w-[1160px] rounded-[30px] bg-white bg-[url(/vector_6084.png)] bg-[right_55px_top_120px] bg-no-repeat p-[40px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)]">
            <div className="pb-[40px]">
              <p className="mb-[28px] font-[roboto] text-[60px] font-semibold leading-[60px] text-black">
                Начните путь <br /> к новому телу
              </p>
              <ul className="mb-[28px] pl-[20px]">
                <li className="list-disc font-[roboto] text-[24px] text-[rgba(0,0,0,0.6)]">
                  проработка всех групп мышц
                </li>
                <li className="list-disc font-[roboto] text-[24px] text-[rgba(0,0,0,0.6)]">
                  тренировка суставов
                </li>
                <li className="list-disc font-[roboto] text-[24px] text-[rgba(0,0,0,0.6)]">
                  улучшение циркуляции крови
                </li>
                <li className="list-disc font-[roboto] text-[24px] text-[rgba(0,0,0,0.6)]">
                  упражнения заряжают бодростью
                </li>
                <li className="list-disc font-[roboto] text-[24px] text-[rgba(0,0,0,0.6)]">
                  помогают противостоять стрессам
                </li>
              </ul>
              <button className="buttonPrimary w-[437px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive">
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
