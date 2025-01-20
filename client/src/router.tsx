import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import ModalRegistration from "./components/ModalRegistration";

import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import ModalProfil from "./components/ModalProfil";

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
        path: "/home/profil",
        element: <ModalProfil />,
      },
    ],
  },
]);
