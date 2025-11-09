import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://paytm-wallet-9rzi.onrender.com/api/v1/user/signin", formData);

      if (response.status === 200 && response.data.token) {
        // Save JWT token to localStorage
        localStorage.setItem("token", response.data.token);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/"; // redirect after login
        }, 1200);
      } else {
        setMessage("❌ Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl p-3 transition duration-200"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
