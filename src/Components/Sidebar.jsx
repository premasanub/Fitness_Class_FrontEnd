import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaCalendarCheck,
  FaCreditCard,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold text-blue-500 mb-10">
        FitBook
      </h1>

      <ul className="space-y-6">

        <NavLink to="/dashboard">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaHome />
    Dashboard
  </li>
</NavLink>
       <NavLink to="/dashboard/profile">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaUser />
    Profile
  </li>
</NavLink>

        <NavLink to="/dashboard/classes">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaDumbbell />
    Classes
  </li>
</NavLink>
       <NavLink to="/dashboard/bookings">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaCalendarCheck />
    My Bookings
  </li>
</NavLink>

<NavLink to="/dashboard/schedule">
  Class Schedule
</NavLink>

<NavLink to="/dashboard/payments">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaCreditCard />
    Payments
  </li>
</NavLink>

<NavLink to="/dashboard/feedback">
  <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
    <FaStar />
    Feedback
  </li>
</NavLink>
        <li className="flex items-center gap-3 cursor-pointer hover:text-red-400">
          <FaSignOutAlt />
          Logout
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;