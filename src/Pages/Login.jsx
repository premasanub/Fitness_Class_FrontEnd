import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
  e.preventDefault();

  let userData;

  if (email === "admin@gmail.com") {
    userData = {
      name: "Admin",
      email,
      role: "admin",
    };

    login(userData);
    navigate("/admin");
  }

  else if (email === "trainer@gmail.com") {
    userData = {
      name: "Trainer",
      email,
      role: "trainer",
    };

    login(userData);
    navigate("/trainer");
  }

  else {
    userData = {
      name: "User",
      email,
      role: "user",
    };

    login(userData);
    navigate("/dashboard");
  }
};
  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-10 rounded-xl w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;