import SignUp from "../components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Login from "../components/Login";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../Firebase";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";

const Profile = () => {
//   const [loading, setLoading] = useState(false);
  const [logOrSign, setLogOrSign] = useState("login");

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  
  async function handleLogout() {
    setError("");
    try {
      await logout();
      console.log("logged out");
    } catch {
      console.log(error);
      setError("Failed to log out");
    }
  }

  if (!auth.currentUser) {
    return (
      <Container className="d-flex align-items-top justify-content-center mt-5" style={{minHeight: "100vh"} }>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {logOrSign === "login" ? (
            <Login setLogOrSign={setLogOrSign} />
          ) : (
            <SignUp setLogOrSign={setLogOrSign} />
          )}
        </div>
      </Container>

    );

  } else {
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong>
            <img className="user-logo"  src={currentUser.photoURL} alt={currentUser.displayName} />
             {currentUser.email}
            
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button  onClick={handleLogout}>
            Log Out
          </Button>
        </div>




      

      </>
    );
  }
};
export default Profile;
