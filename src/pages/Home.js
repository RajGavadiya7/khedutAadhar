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
          {/* <LoginButton /> */}
          </div> 


      </div>



      {/* Navbar  */}
      <div className="home-navbar navbar">
        <Link className="menu" to="/">Home</Link>
        <Link className="menu" to="/price">Daily Crop Price</Link>
        <Link className="menu" to="/buy_crop">Buy Crop</Link>
        <Link className="menu" to="/sell_crop">Sell Crop</Link>
        <Link className="menu" to="/about">About</Link>
        <Link className="menu" to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default Home;
