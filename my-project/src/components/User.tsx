export const User = () => {
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
                            <span className="text-xl font-small">Логин: sergey.petrov96</span>
                            <p className="text-xl font-small">Пароль: 4fkhdj880d</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-2 max-w-full">
                            <button className="flex-1 text-xl h-[52px] max-w-60 min-w-60 bg-[#BCEC30] text-black py-2 px-4 rounded-full">
                                Изменить пароль
                            </button>
                            <button className="flex-1 text-xl h-[52px] max-w-60 min-w-60 border border-black py-2 px-4 rounded-full">
                                Выйти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
