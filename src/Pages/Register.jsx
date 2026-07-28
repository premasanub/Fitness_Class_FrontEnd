import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Service/api";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold font-serif text-center">
          Register
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label className="block font-bold mb-2 font-serif" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 mb-4 rounded"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </p>
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
          Register
        </button>
        <div className="bg-red-100 p-2 mb-4 text-red-600 font-bold font-serif rounded mt-4">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;