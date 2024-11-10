import { MainCardsImage } from "./MainCardsImage";
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";

import { useModal } from "../hooks/useModal";
import Login from "./Login";
import Registry from "./Registry";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export type Component = {
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

//список занятий пользователя
const TrainingItem: React.FC<{ train: Component }> = ({ train }) => {
  const navigate = useNavigate();
  const { changeOpenValue, kindOfModal } = useModal();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) setIsAuth(!isAuth);
    });
  }, [])

  const handleClickAddTrain = () => {
    if(!isAuth) {
    alert("Пользователь не авторизован");
    changeOpenValue();
  }
  };

  const handleClick = () => {
    navigate(`/course/${train._id}`);
  };

  function dayTitle(number: number) {
    let lastNum;
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return "дней";
    lastNum = number % 10;
    if (lastNum == 1) return "день";
    if ([2, 3, 4].includes(lastNum)) return "дня";
    if ([5, 6, 7, 8, 9, 0].includes(lastNum)) return "дней";
  }

  return (
    <li className="relative h-[510px] w-[360px] cursor-pointer rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]">
      <button
        onClick={handleClickAddTrain}
        className="group cursor-[url(coursor.svg),_pointer] absolute right-[20px] top-[20px]"
      >
        <img src="add-in-Circle.svg" alt="plus" />
        <div className="absolute hidden group-hover:block left-[43px] top-[45px] w-[110px] h-[27px] border-[0.5px] border-black rounded-[5px] bg-white z-10"><p className="text-sm mt-1">Добавить курс</p></div>
      </button>
      <div onClick={handleClick}>
        <MainCardsImage param={train._id} />

        <div className="px-[30px] py-[24px]">
          <h3 className="mb-[20px] text-3xl font-medium">{train.nameRU}</h3>
          <ul className="flex flex-wrap gap-[6px]">
            {[
              `${train.workouts.length} ${dayTitle(train.workouts.length)}` +
              "",
              "25-50 мин/день",
              "Сложность",
            ].map((tag, index) => (
              <Tags tag={String(tag)} index={index} key={index} />
            ))}
          </ul>
        </div>
      </div>
      {kindOfModal === "login" && <Login />}
      {kindOfModal === "registry" && <Registry />}
    </li>
  );
};

export default TrainingItem;
