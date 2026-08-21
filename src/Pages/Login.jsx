import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaDumbbell } from "react-icons/fa";
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

    console.log("LOGIN BUTTON CLICKED");

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

      console.log("LOGIN RESPONSE:", response.data);
      console.log("User from backend:", response.data.user);
      console.log("Role from backend:", response.data.role);
      console.log("Token exists:", !!response.data.token);

      // -----------------------------
      // Get login response data
      // -----------------------------
      const token = response.data.token;
      const role = response.data.role;
      const user = response.data.user;

      if (!token || !user) {
        throw new Error("Invalid login response from server.");
      }

      // -----------------------------
      // Create complete user object
      // -----------------------------
      const loggedInUser = {
        ...user,
        role: role,
      };

      console.log("Complete logged in user:", loggedInUser);

      // -----------------------------
      // Save authentication data
      // -----------------------------
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log(
        "Saved user:",
        JSON.parse(localStorage.getItem("user"))
      );

      console.log(
        "Saved role:",
        localStorage.getItem("role")
      );

      // -----------------------------
      // Update AuthContext
      // -----------------------------
      login(loggedInUser);

      toast.success(
        response.data.message || "Login successful!"
      );

      // -----------------------------
      // Redirect according to role
      // -----------------------------
      if (role === "admin") {
        console.log("Going to ADMIN");
        navigate("/admin", { replace: true });

      } else if (role === "trainer") {
        console.log("Going to TRAINER");
        navigate("/trainer", { replace: true });

      } else if (role === "user") {
        console.log("Going to USER PROFILE");
        navigate("/dashboard/profile", { replace: true });

      } else {
        console.log("Unknown role:", role);
        setError("Invalid user role.");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR MESSAGE:", error.message);

      const message =
        error.response?.data?.message ||
        "Invalid email or password.";

      setError(message);
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg">
            <FaDumbbell className="text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue your fitness journey
          </p>

        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">

            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

          </div>

          {/* Password */}
          <div className="mb-3">

            <div className="flex justify-between items-center mb-2">

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
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
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
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Register */}
          <p className="text-center text-gray-600 text-sm mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;