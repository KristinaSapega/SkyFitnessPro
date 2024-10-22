import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="w-screen max-w-full bg-[#FAFAFA] px-[140px] py-[50px]">
      {/* <div className="w-full"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}

export default App;
