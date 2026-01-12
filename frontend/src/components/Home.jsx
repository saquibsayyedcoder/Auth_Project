import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome 👋</h1>
        <p>Please login or register to continue</p>

        <div className="home-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/signup">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
