"use client";

type heroImageType = {
  param: string | undefined;
};



export const HeroImage = ({ param }: heroImageType) => {
  let image;


  switch (param) {
    case "ab1c3f":
      image = (
        <div className="my-[60px] h-[310px] w-[1160px] rounded-[30px] bg-[#FFC700] bg-[url('/yoga.jpg')] bg-[right_-232px_top_-230px] bg-no-repeat">
          <p className="p-[40px] text-[66px] text-white">Йога</p>
        </div>
      );
      break;

    case "kfpq8e":
      image = (
        <div className="my-[60px] h-[310px] w-[1160px] rounded-[30px] bg-[#2491D2] bg-[url('/stretching.jpg')] bg-[right_0px_top_0px] bg-no-repeat">
          <p className="p-[40px] text-[66px] text-white">Стретчинг</p>
        </div>
      );
      break;

    case "ypox9r":
      image = (
        <div className="my-[60px] h-[310px] w-[1160px] rounded-[30px] bg-[#F7A012] bg-[url('/danceFitness.jpg')] bg-[right_-292px_top_-32px] bg-no-repeat">
          <p className="p-[40px] text-[66px] text-white">Зумба</p>
        </div>
      );
      break;

    case "6i67sm":
      image = (
        <div className="my-[60px] h-[310px] w-[1160px] rounded-[30px] bg-[#FF7E65] bg-[url('/stepAirobic.jpg')] bg-[right_23px_top_-715px] bg-no-repeat">
          <p className="p-[40px] text-[66px] text-white">Степ-аэробика</p>
        </div>
      );
      break;

    case "q02a6i":
      image = (
        <div className="my-[60px] h-[310px] w-[1160px] rounded-[30px] bg-[#7D458C] bg-[url('/bodyFlex.jpg')] bg-[right_-120px_top_-165px] bg-no-repeat">
          <p className="p-[40px] text-[66px] text-white">Бодифлекс</p>
        </div>
      );
      break;

    default:
      break;
  }
  return image;
};
