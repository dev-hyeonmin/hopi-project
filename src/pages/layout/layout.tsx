import { Outlet } from "react-router-dom";
import { Header } from "./header.tsx";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
