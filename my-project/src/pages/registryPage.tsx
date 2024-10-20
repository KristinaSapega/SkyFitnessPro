import Main from "../components/Main";
import Registry from "../components/Registry";

type IAppProps = {};

export function RegistryPage(props: IAppProps) {
  return (
    <>
      <Main />
      <div className="absolute top-0 h-full w-full">
        <Registry />
      </div>
    </>
  );
}
