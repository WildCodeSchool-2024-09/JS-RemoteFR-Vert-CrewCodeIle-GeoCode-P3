import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import PresentationPage from "./pages/PresentationPage";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <PresentationPage />,
  },
  { path: "/home", element: <App /> },
]);
