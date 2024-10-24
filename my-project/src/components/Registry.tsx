import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

  const [entry, setEntry] = useState<EntryType>({
    email: "",
    pass: "",
    rePass: "",
    matchPasswords: true,
    isEmptyField: false,
  });
  const { email, pass, rePass, matchPasswords, isEmptyField } = entry;

  const navigate = useNavigate();

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
        navigate("/login");
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
          <h3 className="animate-err err">Заполните все поля!</h3>
        )}
        {!matchPasswords && (
          <h3 className="animate-err err">Пароли не совпадают</h3>
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
        <Link to={"/login"} className="w">
          <button
            name="reg"
            className="buttonSecondary hover:bg-btnSecondaryHover active:bg-btnSecondaryActive invalid:bg-btnSecondaryInactive w-[278px] border-[1px] border-solid border-black bg-white"
          >
            Войти
          </button>
        </Link>
      </div>
    </form>
  );
};

const Registry = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black/[.4]">
      <section className="flex h-[487px] w-[360px] flex-col items-center rounded-[30px] bg-white p-10">
        <Link to={"/"}>
          <img className="w-55 h-[35px]" src="/logo.svg" alt="logo"></img>
        </Link>
        <Form />
      </section>
    </div>
  );
};
export default Registry;
