import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to NovaSync</h1>
      <p>Split expenses easily with friends & groups.</p>

      <div className="home-buttons">
        <Link to="/login" className="home-btn">Login</Link>
        <Link to="/register" className="home-btn home-btn-outline">Register</Link>
      </div>
    </div>
  );
};

export default Home;
