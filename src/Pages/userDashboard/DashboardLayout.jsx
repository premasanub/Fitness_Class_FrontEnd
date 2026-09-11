

import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;