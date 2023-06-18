import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";


const ProfileButton = () => {

  const { currentUser } = useAuth();
  
  
  if (!currentUser) {
    return ( 
      <Link to="/profile">
        <button className="btn btn-success">Log In</button>
      </Link>
    );
  } 
  else {
        
    return (

      
      <div className="dropdown">
        <Link  to="/profile">
        <button className="dropbtn">
        <img className="user-logo"  src={currentUser.photoURL} alt={currentUser.displayName} />
        </button>
        </Link>
      

        {/* <div className="dropdown-content">
          <span>{currentUser.name}</span>
          <button src="/login" type="button" className="btn btn-success">Log Out</button>
        </div> */}

        <style>
          {`

          .user-logo{
            
            height:3rem;
            border-radius: 50%;
          }
          
          .dropbtn {
            border-radius: 50%;
            background-color: #f7f9f7;
            color: #0e8315;
            padding: 0.1rem;
            font-size: 1.1rem;
          }
    
          
          /* The container <div> - needed to position the dropdown content */
          .dropdown {
            position: relative;
            display: inline-block;
          }
          
          /* Dropdown Content (Hidden by Default) */
          .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
          }
          
          /* Links inside the dropdown */
          .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
          }
          
          /* Change color of dropdown links on hover */
          .dropdown-content a:hover {background-color: #ddd;}
          
          /* Show the dropdown menu on hover */
          .dropdown:hover .dropdown-content {display: block;}
          
          /* Change the background color of the dropdown button when the dropdown content is shown */
          .dropdown:hover .dropbtn {background-color: #3e8e41;}
          `}
        </style>
      </div>


    );
      }
      

    
};

export default ProfileButton;


