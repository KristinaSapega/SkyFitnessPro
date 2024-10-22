import Main from "../components/Main";
import Registry from "../components/Registry";

type IAppProps = {};

export function RegistryPage(props: IAppProps) {
  return (
    <>
      <Main />
      <div className="absolute left-0 top-0 h-full w-full min-w-[375px]">
        <Registry />
      </div>
    </>
  );
}
