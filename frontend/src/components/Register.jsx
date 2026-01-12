import React, { useState } from "react";
import axios from "axios";
import mainBook from "../../public/download (3).jpeg";
import smallBook from "../../public/download (4).jpeg";

const Register = () => {
  const FrontendURL = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${FrontendURL}/auth/register`, {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden md:block">
          {/* MAIN IMAGE */}
          <img
            src={mainBook}
            alt="Books"
            className="h-full w-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* TEXT */}
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-2xl font-bold">Book Store</h3>
            <p className="text-sm opacity-90">
              Read • Learn • Grow
            </p>
          </div>

          {/* SMALL IMAGE BADGE */}
          <img
            src={smallBook}
            alt="Book Badge"
            className="absolute top-6 right-6 w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg z-10"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <form
          onSubmit={handleRegister}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account 📚
          </h2>
          <p className="text-gray-500 mb-6">
            Start your reading journey today
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          {/* NAME */}
          <input
            className="mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            className="mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
