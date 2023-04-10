import React from "react";
import "./css/Home.css";
import {Link} from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
const Home = () => {
  return (
    <div>
      <div className="logo-area">
        <div>
        <a href="http://localhost:3000" >
          {/* <img src="./image/logo.svg" alt="Krushi-Aadhar"></img>  */}

          <img src="./image/logo.svg" alt="Krushi-Aadhar"></img>
        </a>  
        </div>
        <div>
        <h1> Krushi-Aadhar </h1>
        </div>

        <div className="login-area">
          <LoginButton />
          <LogoutButton />
          <Profile />
        </div>

      </div>


     
      {/* Navbar  */}
      <div className="home-navbar navbar">
          <Link to="/">Home</Link>
          <Link to="/price">Daily Crop Price</Link>
          <Link to="/buy_crop" >Buy Crop</Link>
          <Link to="/sell_crop">Sell Crop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
      
        </div>
    </div>
    
  );
  
};

export default Home;
