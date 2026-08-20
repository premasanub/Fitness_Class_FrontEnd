import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { FaEnvelope, FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../Service/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/forgot-password", { email});
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }

    setEmail("");
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Forgot Password
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block font-bold mb-2 font-serif" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
        </p>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-bold font-serif p-2 text-xl"
        >
         Submit
        </button>
        <div className="bg-red-100 p-2 mb-4 text-red-600 font-bold font-serif rounded mt-4">
         Password Remembered ? <a href="/login">login</a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;