import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";

function RootLayout() {
  return (
    <div className="h-screen flex pt-8">
      <Sidebar />
      <main className="w-4/5 h-full flex flex-col items-center">
        <Navigation />
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
