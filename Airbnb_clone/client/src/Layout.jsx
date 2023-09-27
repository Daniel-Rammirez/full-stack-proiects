import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="py-4 px-20 flex flex-col min-h-screen">
      <Header />
      <div className="border-t-[1px] my-4 w-full"></div>
      <Outlet />
    </div>
  );
}
