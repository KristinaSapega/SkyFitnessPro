import React from "react";
import TrainingItem from "./TrainingItem";
import { items } from "../data/data";


const TrainingList = () => {
  return (
    <ul className="mt-[50px] flex flex-wrap gap-[40px]">
      {items.map((train) => (
        <TrainingItem train={train} />
      ))}
    </ul>
  );
};

export default TrainingList;
