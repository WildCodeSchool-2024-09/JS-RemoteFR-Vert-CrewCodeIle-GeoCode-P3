import { Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      <HomePage />
      <main>
        <Outlet />
      </main>
    </>
  );
}
