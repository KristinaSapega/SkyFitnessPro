"use client";

export const HeaderUserPopUp = () => {
  return (
    <div className="flex flex-col items-center w-[266px] h-[258px] p-[30px] box-border bg-white rounded-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)] absolute right-[140px] top-[120px]">
      <p className="font-[roboto] text-[18px] font-normal leading-[19.8px] text-black">
        Сергей
      </p>
      <p className="font-[roboto] text-[18px] font-normal leading-[19.8px] text-[#999999] mt-[10px]">
        sergey.petrov96@mail.ru
      </p>

      <button
        // onClick={handleLogin}
        className="w-[206px] h-[52px] mt-[34px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-black active:text-white font-[roboto] rounded-[46px] ">
        Мой профиль
      </button>

      <button
        // onClick={handleLogin}
        className="w-[206px] h-[52px]  mt-[10px] border-solid border-black border-[1px] hover:bg-[#F7F7F7] active:bg-[#E9ECED] font-[roboto] rounded-[46px] ">
        Выйти
      </button>
    </div>
  );
};
