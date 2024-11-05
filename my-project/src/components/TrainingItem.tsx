import Tags from "./Tags";
import { useNavigate } from "react-router-dom";

interface Train {
  id: number;
  urlImg: string;
  trainType: string;
  trainName: string;
  calendar: string;
  time: string;
  level: string;
}

const TrainingItem: React.FC<{ train: Train }> = ({ train }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/course/${train.trainName}`);
  };

  return (
    <li
      onClick={handleClick}
      className="relative h-[510px] w-[360px] cursor-pointer rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021]"
    >
      <div className="h-[325px] overflow-hidden rounded-[30px]">
        <img
          className="w-full object-cover"
          src={train.urlImg}
          alt={train.trainType}
        />
      </div>
      <div className="px-[30px] py-[24px]">
        <h3 className="mb-[20px] text-3xl font-medium">{train.trainType}</h3>
        <ul className="flex flex-wrap gap-[6px]">
          {[train.calendar, train.time, train.level].map((tag, index) => (
            <Tags tag={tag} index={index} key={index} />
          ))}
        </ul>
      </div>
      <button className="absolute right-[20px] top-[20px]">
        <img src="add-in-Circle.svg" alt="plus" />
      </button>
    </li>
  );
};

export default TrainingItem;
