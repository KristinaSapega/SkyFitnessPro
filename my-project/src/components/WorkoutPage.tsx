export const WorkoutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[1440px] px-[140px]">
        <header className="h-[145px] flex justify-between items-center">
          <div className="">
            <a href="">
              <img src="logo.svg" alt="logo" />
            </a>
          </div>
          <nav className="flex items-center gap-[20px]">
            <img className="" src="avatar_mini.svg" alt="avatar" />
            <a className="flex gap-2 items-center" href="">
              <h3 className="text-2xl">Сергей</h3>
              <div className="size-2 border-b-2 border-l-2 border-black rotate-[-45deg]"></div>
            </a>
          </nav>
        </header>
        <main className="">
          <section className="">
            <h1 className="text-6xl font-medium mb-6">Йога</h1>
            <h2 className="text-[32px] underline underline-offset-6">
              Красота и здоровье / Йога на каждый день / 2 день
            </h2>
            <iframe
              className="my-[40px] w-full aspect-video h-auto max-w-full rounded-3xl"
              src="https://www.youtube.com/embed/v-xTLFDhoD0"
            ></iframe>
          </section>
          <div className="mb-[200px] rounded-3xl shadow-[0px_4px_67px_-12px_#00000021]">
            <section className="p-[40px]">
              <h2 className="text-[32px]">Упражнения тренировки 2</h2>
              <ul className="grid grid-cols-3  gap-x-[60px]">
                <li className=" flex flex-col">
                  <label className="text-lg pb-[10px]" htmlFor="">
                    Название упражнения %
                  </label>
                  <progress
                    className="w-80 h-[6px] [&::-webkit-progress-bar]:rounded-3xl [&::-webkit-progress-value]:rounded-3xl [&::-webkit-progress-bar]:bg-[#F7F7F7] [&::-webkit-progress-value]:bg-[#00C1FF] [&::-moz-progress-bar]:bg-[#00C1FF]"
                    id="progress"
                    value="15"
                    max="100"
                  ></progress>
                </li>
              </ul>
              <button className="mt-10 bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-black active:text-white w-80 h-[52px] rounded-full text-lg">
                {/* Если прогесс заполнен то текст на кнопке используем `Обновить свой прогресс` */}
                Заполнить свой прогресс
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
