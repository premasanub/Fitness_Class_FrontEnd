import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaStar
} from "react-icons/fa";

function TrainerDashboardLayout() {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}

      <div className="w-72 bg-gray-900 text-white p-6">

        <h2 className="text-2xl font-bold mb-8">
          Trainer Panel
        </h2>

        <nav className="space-y-4">

          <NavLink
            to="/trainer"
            end
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/trainer/profile"
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaUser />
            My Profile
          </NavLink>

          <NavLink
            to="/trainer/schedule"
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaCalendarAlt />
            My Schedule
          </NavLink>

          <NavLink
            to="/trainer/bookings"
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaBook />
            Bookings
          </NavLink>

          <NavLink
            to="/trainer/students"
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaUsers />
            Students
          </NavLink>

          <NavLink
            to="/trainer/reviews"
            className="flex items-center gap-3 hover:text-yellow-400"
          >
            <FaStar />
            Reviews
          </NavLink>

         <NavLink to="/trainer/add-class"
         className="flex items-center gap-3 hover:text-yellow-400"
           >
         Add Class
             </NavLink>

        </nav>

      </div>

      {/* Content */}

      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}

export default TrainerDashboardLayout;