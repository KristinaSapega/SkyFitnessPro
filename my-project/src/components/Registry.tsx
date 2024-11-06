import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
type EntryType = {
  email: string;
  pass: string;
  rePass: string;
  matchPasswords: boolean;
  isEmptyField: boolean;
};

const Form = () => {
  const refLogin = useRef<HTMLInputElement | null>(null);
  const refPass = useRef<HTMLInputElement | null>(null);
  const refRePass = useRef<HTMLInputElement | null>(null);
  const refBtn = useRef<HTMLButtonElement | null>(null);

  const { changeModal, changeValue } = useModal();

  const [entry, setEntry] = useState<EntryType>({
    email: "",
    pass: "",
    rePass: "",
    matchPasswords: true,
    isEmptyField: false,
  });
  const { email, pass, rePass, matchPasswords, isEmptyField } = entry;

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
      matchPasswords: true,
      isEmptyField: false,
    });
  };

  const regUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !pass || !rePass) {
      setEntry({ ...entry, isEmptyField: true });
      !email && refLogin.current?.classList.add("border-red-600");
      !pass && refPass.current?.classList.add("border-red-600");
      !rePass && refRePass.current?.classList.add("border-red-600");
      refBtn.current?.setAttribute("disabled", "");
      return;
    }

    try {
      if (pass === rePass) {
        await createUserWithEmailAndPassword(auth, email, pass);
        changeValue();
      } else {
        setEntry({ ...entry, matchPasswords: false });
        refPass.current?.classList.add("border-red-600");
        refRePass.current?.classList.add("border-red-600");
        refBtn.current?.setAttribute("disabled", "");
        throw new Error("Пароли не совпадают");
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <form onSubmit={regUser}>
      <div className="mt-12 flex flex-col gap-[10px]">
        <input
          ref={refLogin}
          className="focus:invalid:border-red-600"
          type="email"
          name="email"
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            refLogin.current?.classList.remove("border-red-600");
            refBtn.current?.removeAttribute("disabled");
          }}
          placeholder="Эл. почта"
        />
        <input
          ref={refPass}
          className="focus:invalid:border-red-600"
          type="password"
          name="pass"
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false, matchPasswords: true });
            refPass.current?.classList.remove("border-red-600");
            refBtn.current?.removeAttribute("disabled");
          }}
          placeholder="Пароль"
        />
        <input
          ref={refRePass}
          className=""
          type="password"
          name="rePass"
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false, matchPasswords: true });
            refRePass.current?.classList.remove("border-red-600");
            refBtn.current?.removeAttribute("disabled");
          }}
          placeholder="Повторить пароль"
        />
      </div>
      <div className="h-[34px]">
        {isEmptyField && (
          <h3 className="err animate-err">Заполните все поля!</h3>
        )}
        {!matchPasswords && (
          <h3 className="err animate-err">Пароли не совпадают</h3>
        )}
      </div>
      <div className="m-0 flex flex-col gap-[10px] p-0">
        <button
          ref={refBtn}
          name="reg"
          className="buttonPrimary hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <button
          name="reg"
          className="buttonSecondary w-[278px] border-[1px] border-solid border-black bg-white invalid:bg-btnSecondaryInactive hover:bg-btnSecondaryHover active:bg-btnSecondaryActive"
          onClick={() => changeModal()}
        >
          Войти
        </button>
      </div>
    </form>
  );
};

const Registry = () => {
  const { isOpen, changeValue } = useModal();
  if (!isOpen) return null;
  return (
    <div
      className="entry fixed left-0 top-0 z-50 h-full w-full min-w-[375px]"
      onClick={() => changeValue()}
    >
      <div className="flex h-full w-full items-center justify-center bg-black/[.1]">
        <section
          className="flex h-[487px] w-[360px] flex-col items-center rounded-[30px] bg-white p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={"/"}>
            <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
          </Link>
          <Form />
        </section>
      </div>
    </div>
  );
};
export default Registry;
