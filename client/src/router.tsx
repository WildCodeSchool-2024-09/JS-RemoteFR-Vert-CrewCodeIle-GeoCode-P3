import App from "./App";

import { createBrowserRouter } from "react-router-dom";

import AdminBrandPage from "./pages/AdminBrandPage";
import AdminCarsPage from "./pages/AdminCarsPage";
import AdminContactPage from "./pages/AdminContactPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import PresentationPage from "./pages/PresentationPage";
import UpdateStationsPage from "./pages/UpdateStationsPage";

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
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/update-charging-stations",
    element: <UpdateStationsPage />,
  },
  {
    path: "/admin/messages",
    element: <AdminContactPage />,
  },
  {
    path: "/admin/cars/brand-model",
    element: <AdminCarsPage />,
    children: [
      {
        path: "/admin/cars/brand-model",
        element: <AdminBrandPage />,
      },
    ],
  },
]);
