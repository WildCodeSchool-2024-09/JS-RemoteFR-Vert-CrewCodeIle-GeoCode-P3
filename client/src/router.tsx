import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import ModalVehiculeRegistration from "./components/ModalVehiculeRegistration";
import ModalRegistration from "./components/ModalRegistration";

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
        path: "/formulaire",
        element: <ModalRegistration />,
      },
      {
        path: "/formulaire/vehicule",
        element: <ModalVehiculeRegistration />,
      },
    ],
  },
]);
