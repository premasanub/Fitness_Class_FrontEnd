// import {
//   FaHome,
//   FaUser,
//   FaDumbbell,
//   FaCalendarCheck,
//   FaCreditCard,
//   FaStar,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { FaGift } from "react-icons/fa";
// function Sidebar() {
//   return (
//     <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

//       <h1 className="text-3xl font-bold text-blue-500 mb-10">
//         FitBook
//       </h1>

//       <ul className="space-y-6">

//         <NavLink to="/dashboard">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaHome />
//     Dashboard
//   </li>
// </NavLink>
//        <NavLink to="/dashboard/profile">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaUser />
//     Profile
//   </li>
// </NavLink>

//         <NavLink to="/dashboard/classes">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaDumbbell />
//     Classes
//   </li>
// </NavLink>
//        <NavLink to="/dashboard/bookings">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaCalendarCheck />
//     My Bookings
//   </li>
// </NavLink>

// <NavLink to="/dashboard/schedule">
//   Class Schedule
// </NavLink>

// <NavLink to="/dashboard/payments">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaCreditCard />
//     Payments
//   </li>
// </NavLink>

// <NavLink to="/dashboard/feedback">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaStar />
//     Feedback
//   </li>
// </NavLink>


// <NavLink to="/dashboard/referral">
//   <li className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
//     <FaGift />
//     Referral
//   </li>
// </NavLink>

// <NavLink >
//  <li
//   onClick={() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   }}
//   className="flex items-center gap-3 cursor-pointer hover:text-blue-400"
// >
//   <FaSignOutAlt />
//   Logout
// </li>
// </NavLink>

//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

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

