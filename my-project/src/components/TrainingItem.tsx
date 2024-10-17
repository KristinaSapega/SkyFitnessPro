import React from "react";
import Tags from "./Tags";

interface Train {
  id: number;
  urlImg: string;
  trainType: string;
  calendar: string;
  time: string;
  level: string;
}

const TrainingItem: React.FC<{ train: Train }> = ({ train }) => {
  return (
    <li className="w-[360px] h-[510px] rounded-[30px] bg-[white] shadow-[0px_4px_67px_-12px_#00000021] relative">
      <div className="overflow-hidden h-[325px] rounded-[30px]">
        <img
          className="w-full object-cover"
          src={train.urlImg}
          alt={train.trainType}
        />
      </div>
      <div className="py-[24px] px-[30px]">
        <h3 className="font-medium text-3xl mb-[20px]">{train.trainType}</h3>
        <ul className="flex flex-wrap gap-[6px]">
          {[train.calendar, train.time, train.level].map((tag, index) => (
            <Tags tag={tag} index={index}/>
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
