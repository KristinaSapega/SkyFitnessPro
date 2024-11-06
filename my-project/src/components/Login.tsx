import { signInWithEmailAndPassword } from "firebase/auth";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import { auth } from "../firebase";

type EntryType = {
  email: string;
  pass: string;
  rePass: string;
  matchPasswords: boolean;
  isEmptyField: boolean;
  err: boolean;
};

const Form = () => {
  const refLogin = useRef<HTMLInputElement | null>(null);
  const refPass = useRef<HTMLInputElement | null>(null);
  const refBtn = useRef<HTMLButtonElement | null>(null);

  const { changeModal, changeValue } = useModal();

  const [entry, setEntry] = useState<EntryType>({
    email: "",
    pass: "",
    rePass: "",
    matchPasswords: true,
    isEmptyField: false,
    err: false,
  });
  const { email, pass, matchPasswords, isEmptyField, err } = entry;

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
      matchPasswords: true,
      isEmptyField: false,
    });
  };

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !pass) {
      refBtn.current?.setAttribute("disabled", "");
      setEntry({ ...entry, isEmptyField: true });
      !email && refLogin.current?.classList.add("border-red-600");
      !pass && refPass.current?.classList.add("border-red-600");
      return;
    }
  };

  // авторизация Firebase
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, entry.email, entry.pass)
      .then(() => {
        changeValue();
      })
      .catch((data) => {
        if (data) {
          setEntry({ ...entry, err: true });
        }
      });
  };

  return (
    <form onSubmit={loginUser} noValidate>
      <div className="mt-12 flex flex-col gap-[10px]">
        <input
          ref={refLogin}
          className="focus:invalid:border-red-600"
          type="email"
          name="email"
          onChange={inputChange}
          onClick={() => console.log(refLogin)}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            refLogin.current?.classList.remove("border-red-600");
            refBtn.current?.removeAttribute("disabled");
          }}
          placeholder="Логин"
          required
        />
        <input
          ref={refPass}
          className="focus:invalid:border-red-600"
          type="password"
          name="pass"
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            refPass.current?.classList.remove("border-red-600");
            refBtn.current?.removeAttribute("disabled");
          }}
          placeholder="Пароль"
          required
        />
      </div>
      <div className="h-[34px]">
        {isEmptyField && (
          <h3 className="err animate-err">Заполните все поля!</h3>
        )}
        {!matchPasswords && (
          <h3 className="err animate-err">Пароли не совпадают</h3>
        )}
        {err && <h3 className="err animate-err">Не верный логин или пароль</h3>}
      </div>
      <div className="m-0 flex flex-col gap-[10px] p-0">
        <button
          onClick={handleLogin}
          ref={refBtn}
          name="reg"
          className="buttonPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
          type="submit"
        >
          Войти
        </button>
        <button
          name="reg"
          className="buttonSecondary w-[278px] border-[1px] border-solid border-black bg-white invalid:bg-btnSecondaryInactive hover:bg-btnSecondaryHover active:bg-btnSecondaryActive"
          onClick={changeModal}
        >
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const { isOpen, changeValue } = useModal();
  if (!isOpen) return null;

  return (
    <div
      className="entry fixed left-0 top-0 z-50 h-full w-full min-w-[375px]"
      onClick={() => changeValue()}
    >
      <div className="flex h-full w-full items-center justify-center bg-black/[.04]">
        <section
          className="flex h-[425px] w-[360px] flex-col items-center rounded-[30px] bg-white p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={"/"}>
            <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
          </Link>
          <Form />
          {/* <p onClick={handleLogin} className="pt-[9px] cursor-pointer text-cyan-500">Харкодный вход</p> */}
        </section>
      </div>
    </div>
  );
};
export default Login;
