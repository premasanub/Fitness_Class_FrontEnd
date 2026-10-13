
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaStar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function TrainerDashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsSidebarOpen(false);
    logout();
    navigate("/");
  };

  const handleNavClick = () => {
    setIsSidebarOpen(false);
  };

  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 ${
      isActive
        ? "bg-yellow-500 text-gray-900 font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 max-w-[85vw] flex-col
          overflow-y-auto bg-gray-900 text-white
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:h-screen md:translate-x-0
          md:shrink-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-6 sm:px-6">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Trainer Panel
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your classes
            </p>
          </div>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 md:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-5 sm:px-4">
          <ul className="flex flex-col gap-2">

            <li>
              <NavLink
                to="/trainer"
                end
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/profile"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaUser />
                <span>My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/schedule"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaCalendarAlt />
                <span>My Schedule</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/bookings"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaBook />
                <span>Bookings</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/students"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaUsers />
                <span>Students</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/reviews"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaStar />
                <span>Reviews</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/add-class"
                onClick={handleNavClick}
                className={getNavClass}
              >
                <FaBook />
                <span>Add Class</span>
              </NavLink>
            </li>

            {/* LOGOUT */}
            <li className="pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-gray-300 transition hover:bg-gray-800 hover:text-red-400"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>

          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">

        {/* MOBILE TOPBAR */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg bg-gray-900 p-3 text-white transition hover:bg-gray-800"
          >
            <FaBars size={20} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-gray-900">
              Trainer Panel
            </h2>
            <p className="text-xs text-gray-500">
              Manage your classes
            </p>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 overflow-x-hidden bg-gray-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default TrainerDashboardLayout;
