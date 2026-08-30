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
    <nav className="bg-black text-white px-10 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <FaDumbbell className="text-blue-500 text-3xl" />

        <h1 className="text-3xl font-bold">
          Fit<span className="text-blue-500">Book</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="hidden md:flex items-center gap-8">

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

      {/* Right side */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            {/* Dashboard */}
            <Link
              to="/dashboard"
              title="Dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <FaTachometerAlt />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link to="/login">
              <button className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>

            {/* Register */}
            <Link to="/register">
              <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Register
              </button>
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;