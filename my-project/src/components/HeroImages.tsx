type HeroImageType = {
  param: string | undefined;
};

export const HeroImage = ({ param }: HeroImageType) => {
  let image;

  const commonStyles =
    "my-[20px] h-[389px] w-[343px] rounded-[30px] bg-no-repeat bg-cover bg-center flex items-center justify-center text-center desktop:w-[1160px] desktop:h-[310px]";

  switch (param) {
    case "ab1c3f":
      image = (
        <div
          className={`${commonStyles} bg-[#FFC700] bg-[url('/yoga.jpg')]`}
        >
          <p className="p-[20px] text-[40px] desktop:text-[66px] text-white">
            Йога
          </p>
        </div>
      );
      break;

    case "kfpq8e":
      image = (
        <div
          className={`${commonStyles} bg-[#2491D2] bg-[url('/stretching.jpg')]`}
        >
          <p className="p-[20px] text-[40px] desktop:text-[66px] text-white">
            Стретчинг
          </p>
        </div>
      );
      break;

    case "ypox9r":
      image = (
        <div
          className={`${commonStyles} bg-[#F7A012] bg-[url('/danceFitness.jpg')]`}
        >
          <p className="p-[20px] text-[40px] desktop:text-[66px] text-white">
            Зумба
          </p>
        </div>
      );
      break;

    case "6i67sm":
      image = (
        <div
          className={`${commonStyles} bg-[#FF7E65] bg-[url('/stepAirobic.jpg')]`}
        >
          <p className="p-[20px] text-[40px] desktop:text-[66px] text-white">
            Степ-аэробика
          </p>
        </div>
      );
      break;

    case "q02a6i":
      image = (
        <div
          className={`${commonStyles} bg-[#7D458C] bg-[url('/bodyFlex.jpg')]`}
        >
          <p className="p-[20px] text-[40px] desktop:text-[66px] text-white">
            Бодифлекс
          </p>
        </div>
      );
      break;

    default:
      image = (
        <div className={`${commonStyles} bg-gray-200`}>
          <p className="p-[20px] text-[40px] text-black">Данные не найдены</p>
        </div>
      );
      break;
  }

  return image;
};
