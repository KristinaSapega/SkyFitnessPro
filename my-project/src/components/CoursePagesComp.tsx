"use client";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { HeroImage } from "./HeroImages";

export const CoursePagesComp = () => {
  const params = useParams<{ nameEN: string | undefined }>();
  console.log(params);
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
            <p className="text-[75px] font-medium text-btnPrimaryRegular">1</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Давно хотели попробовать йогу, но не решались начать
            </p>
          </div>
          <div className="corPageBlockGradient box-border flex h-[141px] w-[431px] items-center gap-x-[25px] rounded-[20px] p-[20px]">
            <p className="text-[75px] font-medium text-btnPrimaryRegular">2</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Хотите укрепить позвоночник, избавиться от болей в спине и
              суставах
            </p>
          </div>
          <div className="corPageBlockGradient box-border flex h-[141px] w-[327px] items-center gap-x-[25px] rounded-[20px] p-[20px]">
            <p className="text-[75px] font-medium text-btnPrimaryRegular">3</p>
            <p className="text-[24px] font-normal leading-[26.4px] text-white">
              Ищете активность, полезную для тела и души
            </p>
          </div>
        </div>
        <div className="mt-[60px]">
          <p className="mb-[40px] text-[44px] font-semibold text-black">
            Направления
          </p>
          <div className="box-border flex h-[146px] w-[1160px] justify-around gap-x-[124px] rounded-[30px] bg-btnPrimaryRegular p-[30px]">
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
              <button id="tragetSection" className="buttonPrimary w-[437px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive">
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
