
import { Outlet, NavLink } from "react-router-dom";
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
import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Button */}
      <button
        type="button"
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 w-11 h-11 bg-blue-600 text-white rounded-lg md:hidden shadow-lg flex items-center justify-center"
        aria-label="Toggle admin menu"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-40
          w-64
          h-screen
          bg-gray-900
          text-white
          flex flex-col
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-700">
          <h1 className="text-2xl font-bold">
            Fit<span className="text-blue-400">Admin</span>
          </h1>
        </div>

        {/* Admin Info */}
        <div className="h-24 flex items-center border-b border-gray-700">
          <div className="w-[84%] self-center flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
              <FaUserTie className="text-xl" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold">
                Admin
              </p>

              <p className="text-sm text-gray-400">
                Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-[88%] self-center flex flex-col gap-2 py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                min-h-12
                w-full
                flex items-center gap-4
                rounded-lg
                font-medium
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
                `
              }
            >
              <span className="w-5 flex items-center justify-center text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="h-20 border-t border-gray-700 flex items-center">
          <div className="w-[88%] self-center">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full min-h-11 flex items-center gap-4 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              <FaSignOutAlt />

              <span>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between">
          <div className="w-[92%] self-center flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-gray-800">
                Admin Panel
              </h2>

              <p className="text-sm text-gray-500">
                Manage your fitness platform
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="flex flex-col gap-1 text-right">
                <p className="font-semibold text-gray-800">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <FaUserTie />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="w-[92%] max-w-[1600px] self-center py-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;

