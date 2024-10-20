import { createBrowserRouter } from "react-router-dom";
import { RegistryPage } from "./pages/registryPage";
import App from "./App";
import { MainPage } from "./pages/mainPage";
import { LoginPage } from "./pages/loginPage";
import { TaskPage } from "./pages/taskPage";
import CoursePage from "./pages/coursePage";
import UserPage from "./pages/userPage";

export const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/registry", element: <RegistryPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/task", element: <TaskPage /> },
      { path: "/course", element: <CoursePage /> },
    ],
  },
]);
