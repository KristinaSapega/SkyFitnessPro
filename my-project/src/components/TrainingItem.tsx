import { MainCardsImage } from "./MainCardsImage";
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";

import { useModal } from "../hooks/useModal";
import Registry from "./Registry";
import Login from "./Login";

type Component = {
  train: {
    _id: string;
    urlImg: string;
    trainType: string;
    nameRU: string;
    calendar: string;
    time: string;
    level: string;
    workouts: [];
  };
};
let user = null; //user - берем из состояния
//список занятий пользователя
const TrainingItem: React.FC<{ train: Component }> = ({ train }) => {
  const currentTrain = Object.values(train)[0];
  const navigate = useNavigate();
  const { changeValue, isRegistry } = useModal();

  const handleClickAddTrain = () => {
    alert("Пользователь не авторизован");
    changeValue();
  };

  const handleClick = () => {
    navigate(`/course/${currentTrain._id}`);
  };

  return (
    <li className="relative h-[510px] w-[360px] cursor-pointer rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]">
      <button
        onClick={handleClickAddTrain}
        className="absolute right-[20px] top-[20px]"
      >
        <img src="add-in-Circle.svg" alt="plus" />
      </button>
      <div onClick={handleClick}>
        <MainCardsImage param={currentTrain._id} />

        <div className="px-[30px] py-[24px]">
          <h3 className="mb-[20px] text-3xl font-medium">
            {currentTrain.nameRU}
          </h3>
          <ul className="flex flex-wrap gap-[6px]">
            {[
              currentTrain.workouts.length + " Дней",
              "25-50 мин/день",
              "Сложность",
            ].map((tag, index) => (
              <Tags tag={tag} index={index} key={index} />
            ))}
          </ul>
        </div>
      </div>
      {isRegistry ? <Registry /> : <Login />}
    </li>
  );
};

export default TrainingItem;
