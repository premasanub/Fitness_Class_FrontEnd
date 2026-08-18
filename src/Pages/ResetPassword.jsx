import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Service/api";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/reset-password/${id}/${token}`, {
        password,
      });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }

    setPassword("");
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Reset Password
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block font-bold mb-2 font-serif" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-red-100 p-2 mb-4 text-red-600 rounded font-serif"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-bold font-serif p-2 text-xl"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;