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
    children: [{ path: "/home", element: <RegistrationPage /> }],
  },
]);
