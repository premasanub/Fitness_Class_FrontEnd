
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaDumbbell,
  FaCalendarCheck,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaGift,
} from "react-icons/fa";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Trainers",
      path: "/admin/trainers",
      icon: <FaUserTie />,
    },
    {
      name: "Classes",
      path: "/admin/classes",
      icon: <FaDumbbell />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Referral Offers",
      path: "/admin/referral-offer",
      icon: <FaGift />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setSidebarOpen(false);
    navigate("/");
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 max-w-[85vw] flex-col
          overflow-y-auto bg-gray-900 text-white shadow-xl
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:h-screen md:translate-x-0
          md:shrink-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex min-h-20 items-center justify-between border-b border-gray-700 px-5 sm:px-6">
          <h1 className="text-xl font-bold sm:text-2xl">
            Fit<span className="text-blue-400">Admin</span>
          </h1>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white md:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* ADMIN INFO */}
        <div className="border-b border-gray-700 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600">
              <FaUserTie className="text-xl" />
            </div>

            <div className="min-w-0">
              <p className="font-semibold">Admin</p>
              <p className="text-sm text-gray-400">
                Administrator
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-5 sm:px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex min-h-12 w-full items-center gap-4 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="flex w-5 shrink-0 items-center justify-center text-lg">
                {item.icon}
              </span>

              <span className="break-words">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-gray-700 px-3 py-4 sm:px-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-12 w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 md:static md:px-8">
          <div className="flex min-w-0 items-center gap-3">

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              aria-label="Open admin menu"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 md:hidden"
            >
              <FaBars size={20} />
            </button>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-800 sm:text-xl">
                Admin Panel
              </h2>

              <p className="hidden text-sm text-gray-500 sm:block">
                Manage your fitness platform
              </p>
            </div>
          </div>

          {/* DESKTOP ADMIN INFO */}
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                Admin
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
              <FaUserTie />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <section className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8">
            <Outlet />
          </section>
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;
