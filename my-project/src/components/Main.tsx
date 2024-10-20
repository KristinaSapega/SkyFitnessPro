import TrainingList from "./TrainingList";

const Main = () => {
  return (
    <main className="w-full p-16 pt-[60px]">
      <header className="flex justify-between">
        <h1 className="h-[120px] w-[850px] text-6xl font-medium">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <img className="" src="cloudImage.png" alt="text" />
      </header>
      <TrainingList />
      <div className="mb-[81px] mt-[34px] flex justify-center">
        <button className="h-[52px] w-[127px] rounded-[46px] bg-[#BCEC30]">
          Наверх ↑
        </button>
      </div>
    </main>
  );
};

export default Main;
