
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Service/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/forgot-password",
        {
          email: trimmedEmail,
        },
        {
          timeout: 15000,
        }
      );

      toast.success(
        response.data?.message ||
          "Password reset link sent to your email"
      );

      setEmail("");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error?.code === "ECONNABORTED") {
        message = "Request timed out. Please try again.";
      } else if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-[92%] max-w-md bg-white shadow-xl rounded-2xl border border-gray-100 flex flex-col gap-6"
      >
        <div className="w-[88%] self-center flex flex-col gap-6">

          <h2 className="text-3xl font-bold text-center font-serif">
            Forgot Password
          </h2>

          {error && (
            <div className="w-full min-h-12 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
              <span className="indent-3">
                {error}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              className="font-bold font-serif"
              htmlFor="email"
            >
              Email
            </label>

            <input
              className="w-full h-12 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 indent-3"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full min-h-12 text-white rounded-lg font-bold font-serif text-lg flex items-center justify-center transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          <div className="w-full min-h-12 bg-blue-50 border border-blue-100 text-gray-700 font-bold font-serif rounded-lg flex items-center justify-center text-center">
            Password Remembered?{" "}
            <Link
              to="/login"
              className="text-blue-600 underline"
            >
              Login
            </Link>
          </div>

        </div>
      </form>

    </div>
  );
};

export default ForgotPassword;

