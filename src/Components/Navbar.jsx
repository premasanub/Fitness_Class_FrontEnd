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
    <nav className="bg-black text-white flex justify-between items-center">

      {/* Logo (No gap) */}
      <Link to="/" className="flex items-center">
        <FaDumbbell className="text-blue-500 text-3xl" />
        <h1 className="text-3xl font-bold">
          Fit<span className="text-blue-500">Book</span>
        </h1>
      </Link>

      {/* Navigation (No gap) */}
      <ul className="hidden md:flex items-center">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/classes" className="hover:text-blue-500">
            Classes
          </Link>
        </li>
        <li>
          <Link to="/trainers" className="hover:text-blue-500">
            Trainers
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </li>
      </ul>

      {/* Right side (No gap) */}
      <div className="flex items-center">

        {user ? (
          <>
            {/* Dashboard */}
            <Link
              to="/dashboard"
              title="Dashboard"
              className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
            >
              <FaTachometerAlt />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link to="/login">
              <button className="border border-white hover:bg-white hover:text-black">
                Login
              </button>
            </Link>

            {/* Register */}
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700">
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
