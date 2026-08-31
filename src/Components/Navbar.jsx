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
    <nav className="bg-black text-white flex justify-between items-center m-0 p-0">

      {/* Logo */}
      <Link to="/" className="flex items-center m-0 p-0">
        <FaDumbbell className="text-blue-500 text-3xl m-0 p-0" />
        <h1 className="text-3xl font-bold m-0 p-0">
          Fit<span className="text-blue-500">Book</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="hidden md:flex items-center m-0 p-0">
        <li className="m-0 p-0">
          <Link to="/" className="hover:text-blue-500 transition m-0 p-0">
            Home
          </Link>
        </li>
        <li className="m-0 p-0">
          <Link to="/classes" className="hover:text-blue-500 transition m-0 p-0">
            Classes
          </Link>
        </li>
        <li className="m-0 p-0">
          <Link to="/trainers" className="hover:text-blue-500 transition m-0 p-0">
            Trainers
          </Link>
        </li>
        <li className="m-0 p-0">
          <Link to="/about" className="hover:text-blue-500 transition m-0 p-0">
            About
          </Link>
        </li>
        <li className="m-0 p-0">
          <Link to="/contact" className="hover:text-blue-500 transition m-0 p-0">
            Contact
          </Link>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center m-0 p-0">
        {user ? (
          <>
            {/* Dashboard */}
            <Link
              to="/dashboard"
              title="Dashboard"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 transition m-0 p-0"
            >
              <FaTachometerAlt className="m-0 p-0" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 rounded-lg hover:bg-red-700 transition m-0 p-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link to="/login" className="m-0 p-0">
              <button className="border border-white rounded-lg hover:bg-white hover:text-black transition m-0 p-0">
                Login
              </button>
            </Link>

            {/* Register */}
            <Link to="/register" className="m-0 p-0">
              <button className="bg-blue-600 rounded-lg hover:bg-blue-700 transition m-0 p-0">
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
