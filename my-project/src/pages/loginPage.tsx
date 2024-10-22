import Login from "../components/Login";
import Main from "../components/Main";

type IAppProps = {};

export function LoginPage(props: IAppProps) {
  return (
    <div className="w-full px-[140px]">
      <Main />
      <div className="absolute left-0 top-0 h-full w-full min-w-[375px]">
        <Login />
      </div>
    </div>
  );
}
