import { NavLink, Outlet } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaStar,
} from "react-icons/fa";

function TrainerDashboardLayout() {
  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-yellow-500 text-gray-900"
        : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-72 min-h-screen bg-gray-900 text-white flex flex-col shrink-0">
        {/* HEADER */}
        <div className="px-6 py-7 border-b border-gray-800">
          <h2 className="text-2xl font-bold">
            Trainer Panel
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Manage your classes
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="px-4 py-6">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/trainer"
                end
                className={getNavClass}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/profile"
                className={getNavClass}
              >
                <FaUser />
                <span>My Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/schedule"
                className={getNavClass}
              >
                <FaCalendarAlt />
                <span>My Schedule</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/bookings"
                className={getNavClass}
              >
                <FaBook />
                <span>Bookings</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/students"
                className={getNavClass}
              >
                <FaUsers />
                <span>Students</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/reviews"
                className={getNavClass}
              >
                <FaStar />
                <span>Reviews</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trainer/add-class"
                className={getNavClass}
              >
                <FaBook />
                <span>Add Class</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-100 min-w-0 overflow-x-hidden">
        <div className="w-full min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default TrainerDashboardLayout;
