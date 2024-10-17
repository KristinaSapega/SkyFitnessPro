import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between just ">
      <div>
        <a href="">
          <img src="skyFitness1.png" alt="logo" />
        </a>
        <p className="mt-[15px] opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <button className="w-[103px] h-[52px] bg-[#BCEC30] rounded-[46px]">
        Войти
      </button>
    </header>
  );
};

export default Header;
