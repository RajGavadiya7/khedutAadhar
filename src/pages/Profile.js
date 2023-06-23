import SignUp from "../components/Profile/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Login from "../components/Profile/Login";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../Firebase";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@mantine/core";

import {
  IconChevronRight,
  IconKey,
  IconLanguage,
  IconUserCircle,
  IconLogout,
  IconMail,
  IconPhone,
  IconLocation,
} from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "../Firebase";
import { NavLink, Button, Avatar, Table } from "@mantine/core";
import "./css/Profile.css";

const Profile = () => {
  const [logOrSign, setLogOrSign] = useState("login");
  const { currentUser, logout } = useAuth();



  // ----------------------------------- Firebase ----------------------
  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");
  const [selledCrops, setSelledCrops] = useState([]);



  // ----------------------------------- Fetch all data ----------------------
  const fetchUserData = async () => {
    const q = query(
      sellCropsRef,
      where("selectedEmail", "==", currentUser ? currentUser.email : "")
    );
    try {
      const fetchedData = await getDocs(q);
      const userData = fetchedData.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setSelledCrops(userData);
      console.log(userData);
    } catch (error) {
      console.error(error);
      console.log("Error while fetching user data");
    }
  };


  const handleLogout = async () => {
    try {
      await logout();
      alert("logged out successfully");
      console.log("logged out");
    } catch (error) {
      console.log(error);
      alert("Failed to log out");
    }
  };

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      fetchUserData();
    }
  }, []);


  return (
    <>
      {!currentUser ? (

        <Container
          className="d-flex align-items-top justify-content-center mt-5"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {logOrSign === "login" ? (
              <Login setLogOrSign={setLogOrSign} />
            ) : (
              <SignUp setLogOrSign={setLogOrSign} />
            )}
          </div>
        </Container>

      ) : (
        <div className="dashboard-container">
          
      
          {/* 1. Profile */}
          <div className="profile-container ">
            <Avatar
              
              size="7rem"
              radius="50%"
              src={currentUser.photoURL}
              alt="it's me"
            />

            <div className="profile-name">{currentUser.displayName}</div>

            <div className="profile-details">
              <div className="profile-email">
                <IconMail size="1rem" stroke={1.5} />
                {currentUser.email}
              </div>

              <div className="profile-phone">
                <IconPhone size="1rem" stroke={1.5} />
                {currentUser.mobile}
              </div>

              <div className="profile-address">
                <IconLocation size="1rem" stroke={1.5} />
                {currentUser.address}
              </div>
            </div>

            <hr className="break-line" />
            
            <div className="profile-settings">
              <NavLink
                className="setting-navlink"
                label="Update profile"
                icon={<IconUserCircle size="1rem" stroke={1.5} />}
                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              />
              <NavLink
                className="setting-navlink"
                label="Forgot password"
                icon={<IconKey size="1rem" stroke={1.5} />}
                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              />
              <NavLink
                className="setting-navlink"
                label="Prefered language"
                icon={<IconLanguage size="1rem" stroke={1.5} />}
                rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
              />

              <hr className="break-line" />

              <Button
                className="logout-button"
                leftIcon={<IconLogout size="1rem" stroke={1.5} />}
                variant="light"
                color="red"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>


          {/* 2. My Selling */}
          <div className="selling-container">
            <div className="selling-container-title" >Selling crops</div>
            <ScrollArea className="crop-scrollarea">
              <div className="allcrop-container">
                <AllSelledCrops  selledCrops={selledCrops} />
              </div>
            </ScrollArea>
          </div>


          <div className="selling-container">
            <div className="selling-container-title" >Tractor details</div> 
            {/* Load all tracor details and option for updating details for it */}
          </div>

        
        </div>
      )}
    </>
  )
};

export default Profile;






const AllSelledCrops = ({ selledCrops }) => {
  return selledCrops.map((crop) => (
    <div key={uuidv4()} className="selled-crop-container">
      <Table withBorder>
        <thead>
          <tr>
            <td className="selled-crop-name">{crop.selectedCrop}</td>
            <td className="selled-crop-variety">{crop.selectedVariety}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="selled-crop-variety">{crop.selectedQuantity}</td>
            <td className="selled-crop-season">{crop.selectedSeason}</td>
            <td className="selled-crop-price">₹ {crop.selectedPrice} /Kg</td>
          </tr>
          <tr>
            <Button variant="light" color="teal">Update</Button>
            <Button variant="light" color="red" >Delete</Button>
          </tr>
        </tbody>
      </Table>
    </div>
  ));
};