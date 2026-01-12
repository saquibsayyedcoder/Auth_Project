import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainBook from "../../public/download (3).jpeg";
import smallBook from "../../public/download (4).jpeg";

const Register = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BackendUrl}/auth/register`, {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden px-4">

      {/* Decorative background image */}
      <img
        src={mainBook}
        alt="Books background"
        className="absolute right-[-90px] bottom-[-90px] w-96 opacity-20 rotate-[-12deg]"
      />

      {/* Floating image */}
      <img
        src={smallBook}
        alt="Books floating"
        className="absolute left-10 top-20 w-32 opacity-80 rotate-12 hidden md:block"
      />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account 📚
        </h2>
        <p className="text-center text-white/80 mb-6 text-sm">
          Join us and start your reading journey
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-white/90 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

         <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full px-4 py-3 pr-12 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    placeholder="Create password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
  >
    {showPassword ? (
      /* Eye Off */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.26.232-2.467.656-3.582M6.218 6.218A9.956 9.956 0 0112 5c5.523 0 10 4.477 10 10 0 1.516-.337 2.953-.94 4.238M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ) : (
      /* Eye */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    )}
  </button>
</div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-white/70 text-xs mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
