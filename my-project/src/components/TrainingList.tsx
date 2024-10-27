import React from "react";
import TrainingItem from "./TrainingItem";
import { useNavigate } from "react-router-dom";
import { items } from "../data";

const TrainingList = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/course")
  }
  return (
    <ul onClick={handleClick} className="mt-[50px] flex flex-wrap gap-[40px]">
      {items.map((train) => (
        <TrainingItem train={train} key={train.id} />
      ))}
    </ul>
  );
};

export default TrainingList;
