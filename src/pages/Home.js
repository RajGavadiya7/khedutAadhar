import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { Burger } from '@mantine/core';
import MenuNavbar from "../components/MenuNavbar";


const Home = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="bg-image"></div>

      <div className="logo-area logo-bg-image">
        <div className="logo-container">
          <img
            className="logo-img"
            src="./image/logo.svg"
            alt="Krushi-Aadhar"
          />
        </div>
        <div className="header-name">
          <h1> Krushi Aadhar </h1>
        </div>
      </div>

      {/* Navbar  */}

      <div>
        {!isMobile ? (
          <nav className="main-nav">
            <div className="menu-link">
              <ul>
                <li>
                  <Link style={{textDecoration:'none'}} className="menu" to="/">Home</Link>
                </li>
                <li>
                  <Link style={{textDecoration:'none'}} className="menu" to="/price">Daily Crop Price</Link>
                </li>
                <li>
                  <Link style={{textDecoration:'none'}} className="menu" to="/buy_crop">Buy Crop</Link>
                </li>
                <li>
                  <Link style={{textDecoration:'none' }} className="menu" to="/sell_crop">Sell Crop</Link>
                </li>
                <li>
                  <Link style={{textDecoration:'none'}} className="menu" to="/profile">Profile</Link>
                </li>
              </ul>
            </div>

            <div className="login-area">
              <ProfileButton />
            </div>
          </nav>
        ) : (
          <div className="mobile-nav">
            <MenuNavbar />
            <div>
              <ProfileButton />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
    </div>
  );
};

export default Home;
