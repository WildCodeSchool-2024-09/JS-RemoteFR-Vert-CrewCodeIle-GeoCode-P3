import App from "./App";

import { createBrowserRouter } from "react-router-dom";
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
        element: <RegistrationPage />,
        loader: () => fetch(`${import.meta.env.VITE_API_BRAND}`),
      },
    ],
  },
]);
