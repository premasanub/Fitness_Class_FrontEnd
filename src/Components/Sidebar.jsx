import {
  FaHome,
  FaUser,
  FaDumbbell,
  FaCalendarCheck,
  FaCreditCard,
  FaStar,
  FaSignOutAlt,
  FaGift
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-900 text-white m-0 p-0">
      <h1 className="text-3xl font-bold text-blue-500 m-0 p-0">
        FitBook
      </h1>

      <ul className="m-0 p-0">
        <NavLink to="/dashboard" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaHome className="m-0 p-0" /> Dashboard
          </li>
        </NavLink>

        <NavLink to="/dashboard/profile" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaUser className="m-0 p-0" /> Profile
          </li>
        </NavLink>

        <NavLink to="/dashboard/classes" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaDumbbell className="m-0 p-0" /> Classes
          </li>
        </NavLink>

        <NavLink to="/dashboard/bookings" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaCalendarCheck className="m-0 p-0" /> My Bookings
          </li>
        </NavLink>

        <NavLink to="/dashboard/schedule" className="m-0 p-0">
          Class Schedule
        </NavLink>

        <NavLink to="/dashboard/payments" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaCreditCard className="m-0 p-0" /> Payments
          </li>
        </NavLink>

        <NavLink to="/dashboard/feedback" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaStar className="m-0 p-0" /> Feedback
          </li>
        </NavLink>

        <NavLink to="/dashboard/referral" className="m-0 p-0">
          <li className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0">
            <FaGift className="m-0 p-0" /> Referral
          </li>
        </NavLink>

        <NavLink className="m-0 p-0">
          <li
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="flex items-center cursor-pointer hover:text-blue-400 m-0 p-0"
          >
            <FaSignOutAlt className="m-0 p-0" /> Logout
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
