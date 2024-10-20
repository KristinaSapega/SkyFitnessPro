import React from "react";

const Tags: React.FC<{ index: number; tag: string }> = ({ index, tag }) => {
  return (
    <li className="flex items-center gap-[7.5px] rounded-[50px] bg-[#F7F7F7] p-[10px] text-base box-border h-[38px]">
      <img
        src={
          index === 0 ? "calendar.svg" : index === 1 ? "time.svg" : "level.svg"
        }
        alt=""
      />
      {tag}
    </li>
  );
};

export default Tags;
