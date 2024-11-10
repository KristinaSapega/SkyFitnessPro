import { MainCardsImage } from "./MainCardsImage";
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";

import { useModal } from "../hooks/useModal";
import Login from "./Login";
import Registry from "./Registry";

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

  const handleClickAddTrain = () => {
    alert("Пользователь не авторизован");
    changeOpenValue();
  };

  const handleClick = () => {
    navigate(`/course/${train._id}`);
  };

  function dayTitle(number: number) {
    console.log(number);
    let lastNum;
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return "дней";
    lastNum = number % 10;
    if (lastNum == 1) return "день";
    if ([2, 3, 4].includes(lastNum)) return "дня";
    if ([5, 6, 7, 8, 9, 0].includes(lastNum)) return "дней";
  }

  return (
    <li className="relative h-[492px] w-[343px] cursor-pointer rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]  desktop:h-[501px] desktop:w-[360px]">
      <button
        onClick={handleClickAddTrain}
        className="absolute right-[20px] top-[20px]"
      >
        <img src="add-in-Circle.svg" alt="plus" />
      </button>
      <div onClick={handleClick}>
        <MainCardsImage param={train._id} />

        <div className="pb-[15px] pl-[21.5px] pt-[24px] desktop:pb-[15px] desktop:pl-[30px] desktop:pt-[24px]">
          <h3 className="mb-[20px] text-[24px] font-medium desktop:text-[32px] desktop:leading-[32.5px]">
            {train.nameRU}
          </h3>
          <ul className="flex flex-wrap gap-[6px]">
            {[
              `${train.workouts.length} ${dayTitle(train.workouts.length)}`,
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
