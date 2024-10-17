import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="flex flex-col items-center bg-[#FAFAFA]">
      <div className="w-[1440px]  pt-[50px] px-[140px]">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
