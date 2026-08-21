// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../Service/api";   //updated

// const ForgotPassword = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       toast.error("Please enter your email");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       console.log("Sending forgot password request...");
//       console.log("Email:", email.trim());

//       const response = await api.post(
//         "/auth/forgot-password",
//         {
//           email: email.trim(),
//         },
//         {
//           timeout: 30000,
//         }
//       );

//       console.log("Backend response:", response.data);

//       toast.success(
//         response.data.message || "Password reset link sent to your email"
//       );

//       setEmail("");

//       navigate("/login");
//     } catch (error) {
//       console.error("Forgot password error:", error);

//       let message = "Something went wrong. Please try again.";

//       if (error.code === "ECONNABORTED") {
//         message = "Request timed out. Please try again.";
//       } else if (error.response?.data?.message) {
//         message = error.response.data.message;
//       }

//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <form
//         className="max-w-md mx-auto bg-white p-8 shadow-lg"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl mb-4 font-bold font-serif text-center">
//           Forgot Password
//         </h2>

//         {error && (
//           <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
//             {error}
//           </div>
//         )}

//         <label
//           className="block font-bold mb-2 font-serif"
//           htmlFor="email"
//         >
//           Email
//         </label>

//         <input
//           className="w-full p-2 border border-gray-300 mb-4 rounded"
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter Your Email"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full text-white rounded font-bold font-serif p-2 text-xl ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {loading ? "Sending..." : "Submit"}
//         </button>

//         <div className="bg-red-100 p-2 mb-4 text-red-600 font-bold font-serif rounded mt-4">
//           Password Remembered?{" "}
//           <a href="/login" className="underline">
//             Login
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from "react";
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

      console.log("========== FORGOT PASSWORD ==========");
      console.log("Sending request...");
      console.log("Email:", trimmedEmail);

      const response = await api.post(
        "/auth/forgot-password",
        {
          email: trimmedEmail,
        },
        {
          timeout: 15000,
        }
      );

      console.log("Forgot password status:", response.status);
      console.log("Forgot password response:", response.data);

      // Success
      toast.success(
        response.data?.message ||
          "Password reset link sent to your email"
      );

      setEmail("");

      // Give toast a moment before navigation
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);

    } catch (error) {
      console.error("========== FORGOT PASSWORD ERROR ==========");
      console.error("Error:", error);
      console.error("Message:", error?.message);
      console.error("Code:", error?.code);
      console.error("Response:", error?.response);
      console.error("Response data:", error?.response?.data);
      console.error("Status:", error?.response?.status);

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
      console.log("Setting loading to false");
      setLoading(false);
      console.log("========================================");
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">

      <form
        className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >

        <h2 className="text-2xl mb-6 font-bold font-serif text-center">
          Forgot Password
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <label
          className="block font-bold mb-2 font-serif"
          htmlFor="email"
        >
          Email
        </label>

        <input
          className="w-full p-3 border border-gray-300 mb-4 rounded outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          autoComplete="email"
          disabled={loading}
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white rounded font-bold font-serif p-3 text-xl ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Login */}
        <div className="bg-red-100 p-3 mt-4 text-red-600 font-bold font-serif rounded text-center">
          Password Remembered?{" "}

          <Link
            to="/login"
            className="underline text-blue-600"
          >
            Login
          </Link>
        </div>

      </form>
    </div>
  );
};

export default ForgotPassword;