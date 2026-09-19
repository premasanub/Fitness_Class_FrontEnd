import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaCalendarCheck,
  FaCreditCard,
  FaStar,
  FaSignOutAlt,
  FaGift,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:text-blue-400 hover:bg-gray-800"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col gap-8 shrink-0 px-4 py-6">
      {/* Logo */}
      <div className="px-2">
        <h1 className="text-3xl font-bold text-blue-500">
          FitBook
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-3">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={getNavClass}
            >
              <FaHome />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className={getNavClass}
            >
              <FaUser />
              <span>Profile</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/classes"
              className={getNavClass}
            >
              <FaDumbbell />
              <span>Classes</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/bookings"
              className={getNavClass}
            >
              <FaCalendarCheck />
              <span>My Bookings</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/schedule"
              className={getNavClass}
            >
              <FaCalendarCheck />
              <span>Class Schedule</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/payments"
              className={getNavClass}
            >
              <FaCreditCard />
              <span>Payments</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/feedback"
              className={getNavClass}
            >
              <FaStar />
              <span>Feedback</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/referral"
              className={getNavClass}
            >
              <FaGift />
              <span>Referral</span>
            </NavLink>
          </li>

          <li className="pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-red-400 hover:bg-gray-800 transition text-left"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

