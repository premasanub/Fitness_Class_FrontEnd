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
      icon: <FaCalendarCheck />,
    },
  ];

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");

  //   window.location.href = "/";
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= MOBILE BUTTON ================= */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-lg md:hidden shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>


      {/* ================= SIDEBAR ================= */}

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

        <div className="p-5 border-b border-gray-700">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">
              <FaUserTie className="text-xl" />
            </div>

            <div>
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

        <nav className="flex-1 p-4 space-y-2">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-4 py-3
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

              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </NavLink>

          ))}

        </nav>


        {/* Logout */}

        <div className="p-4 border-t border-gray-700">

          <button
            onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition"
          >

            <FaSignOutAlt />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="flex-1 min-w-0">

        {/* Top Header */}

        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 md:px-8">

          <div className="ml-12 md:ml-0">

            <h2 className="text-xl font-bold text-gray-800">
              Admin Panel
            </h2>

            <p className="text-sm text-gray-500">
              Manage your fitness platform
            </p>

          </div>


          {/* Admin Badge */}

          <div className="hidden sm:flex items-center gap-3">

            <div className="text-right">

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

        </header>


        {/* Page Content */}

        <section className="p-6 md:p-8">

          <Outlet />

        </section>

      </main>

    </div>
  );
}

export default AdminLayout;