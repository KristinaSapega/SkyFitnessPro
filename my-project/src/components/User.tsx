import { useState } from "react";

export const User = () => {
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    return (
        <>
            <h1 className="text-lg md:text-xl lg:text-4xl font-bold mb-8">Профиль</h1>
            <div className="border rounded-3xl bg-white p-6 shadow-lg mt-10 mb-12">
                <div className="flex flex-wrap gap-6">
                    <div className="flex justify-center items-center mx-auto">
                        <img
                            src="Mask group.svg"
                            className="max-w-full h-auto justify-center"
                            alt="Profile"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        <p className="font-bold text-3xl">Сергей</p>
                        <div>
                            <span className="text-[18px] font-small">Логин: sergey.petrov96</span>
                            <p className="text-[18px] font-small">Пароль: 4fkhdj880d</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-2 max-w-full">
                            <button
                                className={`flex-1 text-xl h-[52px] max-w-60 min-w-60 bg-btnPrimaryRegular hover:bg-btnPrimaryHover  active:bg-btnPrimaryActive py-2 px-4 rounded-full 
                                    ${isButtonPressed ? "text-white" 
                                        : "text-black"
                                    }`}
                                onMouseDown={() => setIsButtonPressed(true)}
                                onMouseUp={() => setIsButtonPressed(false)}
                            >
                                Изменить пароль
                            </button>
                            <button className="flex-1 text-xl h-[52px] max-w-60 min-w-60 border border-black  hover:bg-btnSecondaryHover active:bg-btnSecondaryActive py-2 px-4 rounded-full">
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
