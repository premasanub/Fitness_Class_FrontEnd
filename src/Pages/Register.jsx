
import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaDumbbell,
} from "react-icons/fa";
import api from "../Service/api";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const referralCode = searchParams.get("ref");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Please fill in all fields.");
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

      const response = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        referralCode,
      });

      toast.success(
        response.data?.message ||
          "Account created successfully!"
      );

      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="w-[92%] max-w-md flex flex-col gap-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">

          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center">
            <FaDumbbell className="text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Account
          </h1>

          <p className="text-gray-500">
            Start your fitness journey today
          </p>

        </div>

        {/* Form */}
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

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                disabled={loading}
                className="w-full h-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition indent-3"
              />
            </div>

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
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                disabled={loading}
                className="w-full h-12 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition indent-3"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">

              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
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
                  placeholder="Create a password"
                  autoComplete="new-password"
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

              <p className="text-xs text-gray-500">
                Use at least 6 characters.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

            {/* Login */}
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign In
              </Link>
            </p>

          </div>
        </form>

      </div>
    </div>
  );
};

export default Register;

