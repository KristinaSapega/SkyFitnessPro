import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { HeaderUserPopUp } from "./HeaderPopUp";
import { useModal } from "../hooks/useModal";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import Registry from "./Registry";

function UserHeaderItem() {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { changeOpenValue, kindOfModal } = useModal();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeOpenValue();
  };

  const togglePopup = () => {
    setPopupOpen((prev) => !prev);
  };

  return (
    <>
      {isAuth ? (
        <>
          <div className="z-40 flex items-start">
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
                {auth.currentUser?.displayName ?? "Гость"}
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
            onClick={openModal}
            className="buttonPrimary z-40 h-[36px] w-[83px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive sm:h-auto sm:w-[103px]"
          >
            Войти
          </button>
        </>
      )}
      {popupOpen && (
        <div className="box absolute right-[0px] top-[70px] z-50">
          <HeaderUserPopUp setPopupOpen={setPopupOpen} />
        </div>
      )}
      {kindOfModal === "login" && <Login />}
      {kindOfModal === "registry" && <Registry />}
    </>
  );
}

export default UserHeaderItem;