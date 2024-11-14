import { useState } from "react";
import ProgressSuccess from "./ProgressSuccess";

interface MyProgressPopupProps {
  onClose: () => void;
  updateProgress: (index: number, value: number) => void;
}

function MyProgressPopup({ onClose, updateProgress }: MyProgressPopupProps) {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [inputs, setInputs] = useState(["0", "0", "0"]);

  const handleSave = () => {
    inputs.forEach((input, index) => {
      const value = Math.min(Number(input), 100);
      updateProgress(index, value);
    });

    setIsPopupVisible(false);
    setIsSuccessPopupVisible(true);

    setTimeout(() => {
      setIsSuccessPopupVisible(false);
      onClose();
    }, 2000);
  };

  const handleChange = (index:number, value:string) => {
    setInputs(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  return (
    <>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative w-[426px] bg-white p-10 rounded-[30px] shadow-lg z-10">
            <h2 className="text-3xl font-semibold mb-4">Мой прогресс</h2>
            <form className="h-[380px] max-w-[346px] w-full overflow-auto">
              {["Сколько раз вы сделали наклоны вперед?", "Сколько раз вы сделали наклоны назад?", "Сколько раз вы сделали поднятие ног, согнутых в коленях?"].map((label, index) => (
                <div key={index} className="flex flex-col mb-4 max-w-[320px] w-full">
                  <label className="text-lg mb-2">{label}</label>
                  <input
                    type="text"
                    value={inputs[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    placeholder="0"
                    className="py-3 px-[18px] rounded-lg border-solid border-[1px] border-borderInputPrimary"
                  />
                </div>
              ))}
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
