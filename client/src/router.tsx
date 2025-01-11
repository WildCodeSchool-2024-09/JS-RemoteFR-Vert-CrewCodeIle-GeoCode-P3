import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./components/ModalRegistration";
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
        element: <RegistrationPage />,
        loader: () => fetch(`${import.meta.env.VITE_API_BRAND}`),
      },
    ],
  },
]);
