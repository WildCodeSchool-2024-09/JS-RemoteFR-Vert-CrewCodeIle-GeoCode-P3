import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
//import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      {/* <HomePage /> */}
      <NavBar />
      <Outlet />
    </>
  );
}
