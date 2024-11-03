import { Outlet } from "react-router-dom";
import UserProvider from "./providers/userProvider";

function App() {
  return (
    <div className="w-screen max-w-full bg-[#FAFAFA] px-[140px] py-[50px]">
      <UserProvider>
        <Outlet />
      </UserProvider>
    </div>
  );
}

export default App;
