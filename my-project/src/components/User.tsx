import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export type UserType = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export const User = () => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState<{
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
  }>({
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserinfo({
          uid: user.uid ?? "",
          email: user.email ?? "",
          displayName: user.displayName ?? "",
          photoURL: user.photoURL ?? "",
        });
      }
    });
  }, [auth]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <h1 className="mb-8 text-lg font-bold md:text-xl lg:text-4xl">Профиль</h1>
      <div className="mb-12 mt-10 rounded-3xl border bg-white p-6 shadow-lg">
        <div className="flex flex-wrap gap-6">
          <div className="mx-auto flex items-center justify-center">
            <img
              //   src="Mask group.svg"
              src={auth.currentUser?.photoURL ?? "Mask group.svg"}
              className="h-auto max-w-full justify-center rounded-[20px]"
              alt="Profile"
              width={205}
              height={205}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6">
            <p className="text-3xl font-bold">{userinfo.displayName}</p>
            <div>
              <span className="font-small text-[18px]">
                Логин: {userinfo.email}
              </span>
              <div className="font-small flex items-center text-[18px]">
                <p>Пароль:</p>
                <input
                  className="border-none"
                  type="password"
                  placeholder="😊😊😊😊"
                  readOnly
                />
              </div>
            </div>

            <div className="flex max-w-full flex-col items-center gap-2 md:flex-row">
              <button
                className={`h-[52px] min-w-60 max-w-60 flex-1 rounded-full bg-btnPrimaryRegular px-4 py-2 text-xl hover:bg-btnPrimaryHover active:bg-btnPrimaryActive ${
                  isButtonPressed ? "text-white" : "text-black"
                }`}
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
              >
                Изменить пароль
              </button>
              <button
              onClick={handleLogout}
              className="h-[52px] min-w-60 max-w-60 flex-1 rounded-full border border-black px-4 py-2 text-xl hover:bg-btnSecondaryHover active:bg-btnSecondaryActive">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
