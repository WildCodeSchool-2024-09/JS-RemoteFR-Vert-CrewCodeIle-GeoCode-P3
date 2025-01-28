import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import ModalLogin from "./components/ModalLogin";
import ModalRegistration from "./components/ModalRegistration";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <PresentationPage />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/home/formulaire",
        element: <ModalRegistration />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/login",
        element: <ModalLogin />,
      },
    ],
  },
]);
