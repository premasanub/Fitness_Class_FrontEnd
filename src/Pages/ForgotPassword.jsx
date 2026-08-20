import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../Service/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      console.log("Forgot password response:", response.data);

      toast.success(
        response.data.message || "Password reset link sent to your email"
      );

      setEmail("");

      // Go to login after successful response
      navigate("/login");
    } catch (error) {
      console.error("Forgot password error:", error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-lg rounded"
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Forgot Password
        </h2>

        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block font-bold mb-2 font-serif"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
            className="w-full p-2 border border-gray-300 mb-4 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white rounded font-bold font-serif p-2 text-xl ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        <div className="bg-red-100 p-2 mt-4 text-red-600 font-bold font-serif rounded">
          Password Remembered?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;