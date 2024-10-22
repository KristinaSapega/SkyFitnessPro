"use client";

type ImageType = {
  param: string;
};

export const HeroImage = ({ param }: ImageType) => {
  if (param === "yoga") {
    return (
      <div className="w-[1160px] h-[310px] my-[60px] rounded-[30px] bg-[#FFC700] bg-[url('/yoga.jpg')] bg-[right_-232px_top_-230px] bg-no-repeat">
        <p className="font-[roboto] text-[66px] p-[40px] text-white">Йога</p>
      </div>
    );
  }
  if (param === "stretching") {
    return (
      <div className="w-[1160px] h-[310px] my-[60px] rounded-[30px] bg-[#2491D2] bg-[url('/stretching.jpg')] bg-[right_0px_top_0px] bg-no-repeat">
        <p className="font-[roboto] text-[66px] p-[40px] text-white">
          Стретчинг
        </p>
      </div>
    );
  }
  if (param === "danceFitness") {
    return (
      <div className="w-[1160px] h-[310px] my-[60px] rounded-[30px] bg-[#F7A012] bg-[url('/danceFitness.jpg')] bg-[right_-292px_top_-32px] bg-no-repeat">
        <p className="font-[roboto] text-[66px] p-[40px] text-white">Зумба</p>
      </div>
    );
  }
  if (param === "stepAirobic") {
    return (
      <div className="w-[1160px] h-[310px] my-[60px] rounded-[30px] bg-[#FF7E65] bg-[url('/stepAirobic.jpg')] bg-[right_23px_top_-715px] bg-no-repeat">
        <p className="font-[roboto] text-[66px] p-[40px] text-white">
          Степ-аэробика
        </p>
      </div>
    );
  }
  if (param === "bodyFlex") {
    return (
      <div className="w-[1160px] h-[310px] my-[60px] rounded-[30px] bg-[#7D458C] bg-[url('/bodyFlex.jpg')] bg-[right_-120px_top_-165px] bg-no-repeat">
        <p className="font-[roboto] text-[66px] p-[40px] text-white">
          Бодифлекс
        </p>
      </div>
    );
  }
};
