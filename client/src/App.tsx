import RegistrationPage from "./pages/RegistrationPage";

import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <RegistrationPage />

      <main>
        <Outlet />
      </main>
    </>
  );
}
