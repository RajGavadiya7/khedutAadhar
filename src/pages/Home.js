import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
const Home = () => {
  return (
    <div>
      <div className="logo-area">
        <div>
          <img className="logo-img"  src="./image/logo.svg" alt="Krushi-Aadhar" />
        </div>
        <div className="header-name">
          <h1> Krushi-Aadhar </h1>
        </div>

        <div className="login-area">
          <ProfileButton />
          </div> 


      </div>



      {/* Navbar  */}
      <div className="home-navbar navbar">
        <Link to="/">Home</Link>
        <Link to="/price">Daily Crop Price</Link>
        <Link to="/buy_crop">Buy Crop</Link>
        <Link to="/sell_crop">Sell Crop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Home;
