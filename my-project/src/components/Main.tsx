import Header from "./Header";
import TrainingList from "./TrainingList";

const Main = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="w-[1160px]">
        <Header />

        <div className="mt-[60px] flex justify-between">
          <h1 className="h-[120px] w-[850px] text-6xl font-medium">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="relative h-[102px] w-[288px] rounded-[5px] bg-[#BCEC30] px-[20px] py-[16px] text-[32px] leading-[35px]">
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
