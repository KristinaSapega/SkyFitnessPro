import { useState } from "react";
import ProgressSuccess from "./ProgressSuccess";

interface MyProgressPopupProps {
    onClose: () => void;
  }

function MyProgressPopup({ onClose }: MyProgressPopupProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  const handleSave = () => {
    setIsPopupVisible(false);
    setIsSuccessPopupVisible(true);

    setTimeout(() => {
      setIsSuccessPopupVisible(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative w-[426px] bg-white p-10 rounded-[30px] shadow-lg z-10">
            <h2 className="text-3xl font-semibold mb-4">Мой прогресс</h2>
            <form className="h-[380px] max-w-[346px] w-full overflow-auto">
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали наклоны вперед?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали наклоны назад?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали поднятие ног, согнутых в коленях?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали наклоны вперед?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали наклоны назад?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
              <div className="flex flex-col mb-4 max-w-[320px] w-full">
                <label className="text-lg mb-2">
                  Сколько раз вы сделали поднятие ног, согнутых в коленях?
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                />
              </div>
            </form>
            <button
              className="mt-4 buttonPrimary bg-btnPrimaryRegular px-4 py-2  rounded w-full rounded-full hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive active:text-white"
              onClick={handleSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}

      {isSuccessPopupVisible && <ProgressSuccess />}
    </>
  );
}

export default MyProgressPopup;
