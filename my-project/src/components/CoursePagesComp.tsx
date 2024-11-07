import Header from "./Header";
import { useParams } from "react-router-dom";
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

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[1440px] px-[140px]">
        <Header />
        <HeroImage param={params.nameEN} />
        <p className="mb-[40px] text-[44px] font-semibold text-black">
          Подойдет для вас, если:
        </p>
        <div className="flex justify-between gap-x-[17px]">
          {fittings.map((item, index) => (
            <ItemsComponent item={item} index={index} key={index} />
          ))}
        </div>
        <section>
          <div className="mt-[60px]">
            <p className="mb-[40px] text-[44px] font-semibold text-black">
              Направления
            </p>
            <div className="box-border grid h-[146px] w-[1160px] grid-cols-3 content-center items-center gap-[34px] rounded-[30px] bg-btnPrimaryRegular pl-[30px]">
              {directions.map((item, index) => (
                <ItemsComponentItem item={item} index={index} key={index} />
              ))}
              {/* <div className="gap-[34px]"></div> */}
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
                <button
                  className="buttonPrimary w-[437px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
                  onClick={changeValue}
                >
                  Войдите, чтобы добавить курс
                </button>
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
