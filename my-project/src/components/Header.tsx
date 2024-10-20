import React from "react";

const Header = () => {
  return (
    <header className="just flex justify-between">
      <div>
        <a href="">
          <img src="skyFitness1.png" alt="logo" />
        </a>
        <p className="mt-[15px] opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <button className="h-[52px] w-[103px] rounded-[46px] bg-[#BCEC30]">
        Войти
      </button>
    </header>
  );
};

export default Header;
