
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full max-w-full bg-gray-100">

      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hidden max-[500px]:flex fixed left-3 top-3 z-[70]
                   h-10 w-10 items-center justify-center
                   rounded-lg bg-blue-600 text-white shadow-md"
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 min-[501px]:hidden"
        />
      )}

      <div className="flex min-h-screen w-full min-w-0">

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50
            w-64 max-w-[85vw]
            transition-transform duration-300
            min-[501px]:translate-x-0
            min-[501px]:w-64
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          className="min-h-screen w-full min-w-0 flex-1
                     max-w-full overflow-x-hidden
                     min-[501px]:ml-64"
        >
          <div className="w-full min-w-0 max-w-full px-3 pt-16
                          min-[501px]:px-5 min-[501px]:pt-5">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
