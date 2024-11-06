import { ChangeEvent, useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { User } from "firebase/auth";

export type UserType = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  currentUser: User | null;
};

type EntryType = {
  name: string;
  pass: string;
  err: boolean;
  loadings: boolean;
};

export const UserCabinet = () => {
  const [activInputName, setactivInputName] = useState(true);
  const [activInpuPass, setactivInputPass] = useState(true);
  const [userinfo, setUserinfo] = useState<UserType>({
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    currentUser: null,
  });
  const navigate = useNavigate();

  const [entry, setEntry] = useState<EntryType>({
    name: "",
    pass: "",
    err: false,
    loadings: false,
  });

  // Получение данных пользователя
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserinfo({
          uid: user.uid ?? "",
          email: user.email ?? "",
          displayName: user.displayName ?? "",
          photoURL: user.photoURL ?? "",
          currentUser: user,
        });
      }
    });
  }, [auth]);

  // Выход из учетной записи
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // Обработчик изменения имени
  const handleNameChange = () => {
    setactivInputName(!activInputName);

    if (!activInputName && userinfo.currentUser && entry.name) {
      updateProfile(userinfo.currentUser, { displayName: entry.name }).then(
        () => {
          navigate("/user");
          alert("Ваше имя изменено");
        },
      );
    }
  };

  // Инпуты логина и пароля
  const refName = useRef<HTMLInputElement | null>(null);
  const refPass = useRef<HTMLInputElement | null>(null);

  // ОБработчик ввода
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  // Обработчик изменения пароля
  const handlePassChange = () => {
    setactivInputPass(!activInpuPass);
    if (!activInpuPass && userinfo.currentUser && entry.pass) {
      updatePassword(userinfo.currentUser, entry.pass).then(() => {
        navigate("/user");
        alert("Ваш пароль изменен");
      });
    }
  };

  return (
    <>
      <h1 className="mb-8 text-lg font-bold md:text-xl lg:text-4xl">Профиль</h1>
      <div className="mb-12 mt-10 rounded-3xl border bg-white p-6 shadow-lg">
        <div className="flex flex-wrap gap-6">
          <div className="mx-auto flex items-center justify-center">
            <img
              src={auth.currentUser?.photoURL ?? "Mask group.svg"}
              className="h-auto max-w-full justify-center rounded-[20px]"
              alt="Profile"
              width={205}
              height={205}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-[12px]">
            <div className="relative flex items-center gap-[12px]">
              <input
                ref={refName}
                name="name"
                onChange={inputChange}
                className={
                  activInputName
                    ? "w-[240px] border-none pb-3 pl-0 text-3xl font-bold placeholder-black"
                    : "w-[240px] pb-3 text-3xl font-bold"
                }
                type="text"
                placeholder={auth.currentUser?.displayName ?? "Гость"}
                readOnly={activInputName}
              />
              {activInputName && (
                <button
                  className="left-[100px] top-[18px]"
                  onClick={handleNameChange}
                >
                  ✏️
                </button>
              )}
              {!activInputName && (
                <button
                  className="left-[270px] text-[24px]"
                  onClick={handleNameChange}
                >
                  ✅
                </button>
              )}
            </div>

            <div className="flex flex-col gap-[18px]">
              <span className="font-small text-[18px]">
                Логин: {userinfo.email}
              </span>
              <div className="font-small flex items-center text-[18px]">
                <p>Пароль:</p>
                <input
                  ref={refPass}
                  name="pass"
                  onChange={inputChange}
                  className={
                    activInpuPass
                      ? "box-border h-[36px] w-[170px] border-none placeholder-black"
                      : "ml-[6px] box-border h-[36px] w-[170px]"
                  }
                  type="password"
                  placeholder="••••••••"
                  readOnly={activInpuPass}
                />
              </div>
            </div>

            <div className="flex max-w-full flex-col items-center gap-2 md:flex-row">
              <button
                onClick={handlePassChange}
                className="buttonPrimary w-[192px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
              >
                {activInpuPass ? "Изменить пароль" : "Сохранить"}
              </button>
              <button
                onClick={handleLogout}
                className="buttonSecondary w-[192px] border-[1px] border-solid border-black bg-white invalid:bg-btnSecondaryInactive hover:bg-btnSecondaryHover active:bg-btnSecondaryActive"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
