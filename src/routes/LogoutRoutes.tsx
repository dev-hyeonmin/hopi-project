import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/page.tsx";

export default function LogoutRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
