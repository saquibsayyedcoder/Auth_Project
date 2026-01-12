import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainBook from "../../public/download (3).jpeg";
import smallBook from "../../public/download (4).jpeg";

const Login = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BackendUrl}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/add-book");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/profile");
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden px-4">

      {/* Decorative background image */}
      <img
        src={mainBook}
        alt="Books background"
        className="absolute left-[-80px] bottom-[-80px] w-96 opacity-20 rotate-12"
      />

      {/* Floating image */}
      <img
        src={smallBook}
        alt="Books floating"
        className="absolute right-10 top-20 w-32 opacity-80 rotate-[-12deg] hidden md:block"
      />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back 📚
        </h2>
        <p className="text-center text-white/80 mb-6 text-sm">
          Login to continue your reading journey
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-white/90 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white/70 text-xs mt-6">
          © 2026 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
