import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaDumbbell,
} from "react-icons/fa";

import api from "../Service/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!password.trim()) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/auth/reset-password/${id}/${token}`,
        {
          password,
        }
      );

      toast.success(
        response.data.message ||
          "Password updated successfully."
      );

      navigate("/login");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to reset password.";

      setError(message);
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">

      <div className="w-full max-w-md">

        <div className="text-center mb-6">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg">
            <FaDumbbell className="text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new password for your account.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}


          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            New Password
          </label>


          <div className="relative">

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your new password"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>


          <p className="text-xs text-gray-500 mt-2">
            Password must contain at least 6 characters.
          </p>


          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>


          <p className="text-center text-gray-600 text-sm mt-6">

            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Back to Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;