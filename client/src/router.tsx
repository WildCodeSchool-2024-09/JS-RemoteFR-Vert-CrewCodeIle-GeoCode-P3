import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import ModalRegistration from "./components/ModalRegistration";
import ModalVehiculeRegistration from "./components/ModalVehiculeRegistration";
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
