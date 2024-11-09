import { useLocation, useNavigate } from "react-router-dom";
import UserHeaderItem from "./UserHeaderItem";

const Header = () => {
  const location: string = useLocation().pathname;
  const navigate = useNavigate();
  const handleGoToMainPage = () => {
    navigate("/");
  };

  return (
    <>
      <header className="just relative z-40 flex justify-between">
        <div onClick={handleGoToMainPage} className="cursor-pointer">
          <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
          {location !== "/user" && (
            <p className="mt-[16px] text-[18px] font-normal leading-[19.8px] text-[#00000050] hidden lg:block">
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