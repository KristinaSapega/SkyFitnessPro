
("use client");

import { useLocation, useNavigate } from "react-router-dom";
import UserHeaderItem from "./UserHeaderItem";
import React from "react";

const Header = () => {
  const { changeValue } = useModal();

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeValue();
  };

  return (
    <header className="just flex justify-between">
      <div>
        <a href="/">
          <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
          {location !== "/user" && (
            <p className="mt-[16px] text-[18px] font-normal leading-[19.8px] text-[#00000050]">
              Онлайн-тренировки для занятий дома
            </p>
          )}
        </div>
        <UserHeaderItem />
      </header>
    </>
  );
};

export default Header;
