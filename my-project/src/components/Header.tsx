import { useState } from "react";
import WorkoutSelectPopup from "./WorkoutSelectPopup";
import MyProgressPopup from "./MyProgressPopup";

const Header = () => {
  const [isTrainPopupOpen, setIsTrainPopupOpen] = useState(false);
  const [isProgressPopupOpen, setIsProgressPopupOpen] = useState(false);

  const openTrainPopup = () => setIsTrainPopupOpen(true);
  const closeTrainPopup = () => setIsTrainPopupOpen(false);

  const openProgressPopup = () => setIsProgressPopupOpen(true);
  const closeProgressPopup = () => setIsProgressPopupOpen(false);

  return (
    <header className="just flex justify-between">
      <div>
        <a href="/">
          <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
        </a>
        <p className="mt-[16px] text-[18px] font-normal leading-[19.8px] text-[#00000050]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
        <button onClick={openTrainPopup}>
          Попап тренировки
        </button>
        <button onClick={openProgressPopup}>
          Попап прогресса
        </button>
      <button className="buttonPrimary w-[103px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive">
        Войти
      </button>
      {isTrainPopupOpen && <WorkoutSelectPopup onClose={closeTrainPopup} />}
      {isProgressPopupOpen && <MyProgressPopup onClose={closeProgressPopup} />}
    </header>
  );
};

export default Header;
