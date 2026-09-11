

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
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:text-blue-400"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col gap-8 shrink-0">

      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-blue-500">
          FitBook
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex flex-col gap-5">

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

          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-lg text-gray-300 hover:text-red-400 transition text-left"
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

