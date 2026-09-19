import { FaDumbbell, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black text-white w-full min-h-16 px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-6">
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
            className="px-2 py-2 hover:text-blue-500 transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/classes"
            className="px-2 py-2 hover:text-blue-500 transition"
          >
            Classes
          </Link>
        </li>

        <li>
          <Link
            to="/trainers"
            className="px-2 py-2 hover:text-blue-500 transition"
          >
            Trainers
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className="px-2 py-2 hover:text-blue-500 transition"
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className="px-2 py-2 hover:text-blue-500 transition"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-3 shrink-0">
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
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
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

