import Header from "./Header";
import Login from "./Login";
import TrainingList from "./TrainingList";
import { useModal } from "../hooks/useModal";
import Registry from "./Registry";

const Main = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="min-w-[375px] max-w-[1160px] py-[16px] ">
        <Header />
        <div className="mt-[60px] flex justify-between">
          <h1 className="h-[105px] max-w-[327px] text-left text-[32px] text-right text-[32px]  font-medium leading-[35.2px] underline decoration-transparent sm:h-[120px] sm:max-w-[850px] sm:text-6xl sm:leading-normal">
            Начните заниматься спортом и улучшите качество жизни
          </h1>

          <div className="relative hidden h-[102px] max-w-[288px] rounded-[5px] bg-[#BCEC30] px-[20px] text-[32px] leading-[35px] 2xl:block">
            <p>Измени своё тело за полгода!</p>
            <img
              className="absolute bottom-[-24px] right-[140px]"
              src="Polygon 1.svg"
              alt="text"
            />
          </div>
        </div>
        <TrainingList />
        <div className="mb-[81px] mt-[34px] flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="buttonPrimary h-[52px] w-[127px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
          >
            Наверх ↑
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;