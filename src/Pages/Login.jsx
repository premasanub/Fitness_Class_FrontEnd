
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaDumbbell,
} from "react-icons/fa";
import api from "../Service/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const token = response.data?.token;
      const role = response.data?.role;
      const user = response.data?.user;

      if (!token) {
        throw new Error("Token is missing from server response.");
      }

      if (!user) {
        throw new Error("User data is missing from server response.");
      }

      if (!role) {
        throw new Error("User role is missing from server response.");
      }

      const loggedInUser = {
        ...user,
        role,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      login(loggedInUser);

      toast.success(
        response.data?.message || "Login successful!"
      );

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "trainer") {
        navigate("/trainer", { replace: true });
      } else if (role === "user") {
        navigate("/dashboard/profile", { replace: true });
      } else {
        setError("Invalid user role.");
        toast.error("Invalid user role.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="w-[92%] max-w-md flex flex-col gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">

          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center">
            <FaDumbbell className="text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Sign in to continue your fitness journey
          </p>

        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-5"
        >
          <div className="w-[88%] self-center flex flex-col gap-5">

            {error && (
              <div className="min-h-12 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center">
                <span className="indent-3">
                  {error}
                </span>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
                className="w-full h-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition indent-3"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">

              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full h-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition indent-3"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 flex items-center justify-center w-8 h-8"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create Account
              </Link>
            </p>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;

