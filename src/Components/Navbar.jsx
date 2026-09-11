


import { FaDumbbell, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between gap-6 min-h-16">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 shrink-0"
      >
        <FaDumbbell className="text-blue-500 text-3xl" />

        <h1 className="text-3xl font-bold">
          Fit<span className="text-blue-500">Book</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="hidden md:flex items-center justify-center gap-8 flex-1">
        <li>
          <Link
            to="/"
            className="hover:text-blue-500 transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/classes"
            className="hover:text-blue-500 transition"
          >
            Classes
          </Link>
        </li>

        <li>
          <Link
            to="/trainers"
            className="hover:text-blue-500 transition"
          >
            Trainers
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="hover:text-blue-500 transition"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4 shrink-0">
        {user ? (
          <>
            <Link
              to="/dashboard"
              title="Dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <FaTachometerAlt />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="border border-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

