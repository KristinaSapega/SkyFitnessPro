import { useModal } from "../hooks/useModal";

const Header = () => {
  const { changeValue } = useModal();

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    changeValue();
  };
  return (
    <header className="just flex justify-between">
      <div>
        <a href="/">
          <img src="/skyFitness.svg" alt="logo" width={220} height={35} />
        </a>
        <p className="mt-[16px] text-[18px] font-normal leading-[19.8px] text-[#00000050]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <button
        className="buttonPrimary w-[103px] hover:bg-btnPrimaryHover active:bg-btnPrimaryActive disabled:bg-btnPrimaryInactive"
        onClick={openModal}
      >
        Войти
      </button>
    </header>
  );
};

export default Header;
