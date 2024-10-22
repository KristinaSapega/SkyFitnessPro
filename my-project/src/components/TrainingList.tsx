import React from "react";
import TrainingItem from "./TrainingItem";
import { useNavigate } from "react-router-dom";
const items = [
  {
    id: 1,
    urlImg: "yoga.png",
    trainType: "йога",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 2,
    urlImg: "stretching.png",
    trainType: "Стретчинг",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 3,
    urlImg: "danceFitness.png",
    trainType: "Зумба",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 4,
    urlImg: "stepAirobic.png",
    trainType: "Степ-аэробика",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },

  {
    id: 5,
    urlImg: "bodyFlex.png",
    trainType: "Бодифлекс",
    calendar: "25 дней",
    time: "25-50 мин/день",
    level: "Сложность",
  },
];

const TrainingList = () => {
  return (
    <ul className="mt-[50px] flex flex-wrap gap-[40px]">
      {items.map((train) => (
        <TrainingItem train={train} key={train.id} />
      ))}
    </ul>
  );
};

export default TrainingList;
