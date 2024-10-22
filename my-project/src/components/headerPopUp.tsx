"use client";

export const HeaderUserPopUp = () => {
  return (
    <div className="absolute right-[140px] top-[70px] box-border flex h-[258px] w-[266px] flex-col items-center rounded-[30px] bg-white p-[30px] shadow-[0_4px_67px_-12px_rgba(0,0,0,0.13)]">
      <p className="font-[roboto] text-[18px] font-normal leading-[19.8px] text-black">
        Сергей
      </p>
      <p className="mt-[10px] font-[roboto] text-[18px] font-normal leading-[19.8px] text-[#999999]">
        sergey.petrov96@mail.ru
      </p>

      <div className="mt-[34px] flex flex-col gap-[10px]">
        <button className="buttonPrimary w-[206px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive">
          Мой профиль
        </button>
        <button className="buttonSecondary w-[206px] border-[1px] border-solid border-black bg-white invalid:bg-btnSecondaryInactive hover:bg-btnSecondaryHover active:bg-btnSecondaryActive">
          Выйти
        </button>
      </div>
    </div>
  );
};
