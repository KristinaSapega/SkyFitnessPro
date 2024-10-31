"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { HeaderUserPopUp } from "./HeaderPopUp";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  const location: string = useLocation().pathname;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [auth]);

  const handleLogin = () => {
    navigate("/login");
  };

  const togglePopup = () => {
    setPopupOpen((prev) => !prev);
  };

  return (
    <>
      <header className="just relative flex justify-between">
        <div>
          <a href="/">
            <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
          </a>
          {location !== "/user" && (
            <p className="mt-[16px] text-[18px] font-normal leading-[19.8px] text-[#00000050]">
              Онлайн-тренировки для занятий дома
            </p>
          )}
        </div>

        {isAuth === true ? (
          <>
            <div className="flex items-start">
              <div
                onClick={() => togglePopup()}
                className="flex cursor-pointer items-center"
              >
                <img
                  className="rounded-[46px]"
                  src={auth.currentUser?.photoURL ?? "/profile.svg"}
                  alt="logo"
                  width={42}
                  height={42}
                />
                <p className="ml-[16px] mr-[12px] select-none font-[roboto] text-[24px] font-normal">
                  {auth.currentUser?.displayName}
                </p>
                <img
                  src="/rectangle_3765.svg"
                  alt="logo"
                  width={14}
                  height={11}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="buttonPrimary w-[103px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
            >
              Войти
            </button>
          </>
        )}
        {popupOpen === true && (
          <div className="absolute right-[0px] top-[70px] z-50">
            <HeaderUserPopUp />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
