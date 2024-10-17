import TrainingList from "./trainingList";

const Main = () => {
  return (
    <main className="pt-[60px]">
    <div className="relative">
      <h1 className="w-[850px] h-[120px] font-medium text-6xl ">
        Начните заниматься спортом и улучшите качество жизни
      </h1>
      <img
        className="absolute right-0 top-0"
        src="cloudImage.png"
        alt="text"
      />
    </div>
    <TrainingList />
    <div className="flex justify-center mt-[34px] mb-[81px]">
      <button className="w-[127px] h-[52px] rounded-[46px] bg-[#BCEC30]">
        Наверх ↑
      </button>
    </div>
  </main>
  );
};

export default Main;
