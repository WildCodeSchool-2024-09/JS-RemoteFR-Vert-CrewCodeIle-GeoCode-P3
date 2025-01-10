import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import RegistrationPage from "./pages/RegistrationPage";

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
