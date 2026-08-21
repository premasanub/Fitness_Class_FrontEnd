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

    console.log("========== LOGIN START ==========");

    setError("");

    // -----------------------------
    // Validation
    // -----------------------------
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // API Login
      // -----------------------------
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password: password,
      });

      console.log("LOGIN RESPONSE:", response);
      console.log("LOGIN DATA:", response.data);

      // -----------------------------
      // Get backend response
      // -----------------------------
      const token = response.data?.token;
      const role = response.data?.role;
      const user = response.data?.user;

      console.log("TOKEN:", token);
      console.log("ROLE:", role);
      console.log("USER:", user);

      // -----------------------------
      // Validate response
      // -----------------------------
      if (!token) {
        console.error("Token missing from backend response");
        throw new Error("Token is missing from server response.");
      }

      if (!user) {
        console.error("User missing from backend response");
        throw new Error("User data is missing from server response.");
      }

      if (!role) {
        console.error("Role missing from backend response");
        throw new Error("User role is missing from server response.");
      }

      // -----------------------------
      // Create complete user object
      // -----------------------------
      const loggedInUser = {
        ...user,
        role: role,
      };

      console.log("COMPLETE USER:", loggedInUser);

      // -----------------------------
      // Save token
      // -----------------------------
      localStorage.setItem("token", token);

      // -----------------------------
      // Save role
      // -----------------------------
      localStorage.setItem("role", role);

      // -----------------------------
      // Save user
      // -----------------------------
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log(
        "LOCAL STORAGE USER:",
        localStorage.getItem("user")
      );

      console.log(
        "LOCAL STORAGE ROLE:",
        localStorage.getItem("role")
      );

      console.log(
        "LOCAL STORAGE TOKEN EXISTS:",
        !!localStorage.getItem("token")
      );

      // -----------------------------
      // Update AuthContext
      // -----------------------------
      login(loggedInUser);

      console.log("AUTH CONTEXT UPDATED");

      // -----------------------------
      // Success message
      // -----------------------------
      toast.success(
        response.data?.message || "Login successful!"
      );

      // -----------------------------
      // Redirect
      // -----------------------------
      if (role === "admin") {
        console.log("REDIRECT → ADMIN");

        navigate("/admin", {
          replace: true,
        });

      } else if (role === "trainer") {
        console.log("REDIRECT → TRAINER");

        navigate("/trainer", {
          replace: true,
        });

      } else if (role === "user") {
        console.log("REDIRECT → USER PROFILE");

        navigate("/dashboard/profile", {
          replace: true,
        });

      } else {
        console.error("UNKNOWN ROLE:", role);

        setError("Invalid user role.");
        toast.error("Invalid user role.");
      }

      console.log("========== LOGIN SUCCESS ==========");

    } catch (error) {
      console.error("========== LOGIN ERROR ==========");
      console.error("Error:", error);
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response);
      console.error("Error response data:", error?.response?.data);
      console.error("Error status:", error?.response?.status);

      // Backend error
      if (error?.response) {
        const message =
          error.response.data?.message ||
          "Login failed. Please check your credentials.";

        setError(message);
        toast.error(message);
      }

      // Frontend error after successful API response
      else {
        const message =
          error?.message ||
          "Something went wrong on the frontend.";

        setError(message);
        toast.error(message);
      }

      console.log("================================");

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