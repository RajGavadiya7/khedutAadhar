import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link  } from "react-router-dom";
import { GoogleButton } from "react-google-button";

export default function Login({ setLogOrSign }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.code);
    }

    setLoading(false);
  }

  const handleSignup = () => {
    setLogOrSign("signup");
  };

  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
        .then((result) => {
          const user = result.user;

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          console.log(errorCode, errorMessage, email);
        });
    } catch (error) {
      setError(error.code);
    }
  };

  return (
    <>
      <Card style={{height:"auto"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
        <div     
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignContent: "center",
          }}
        >
          <GoogleButton className="m-2" onClick={handleGoogleSignIn} />
        </div>

        <div className="w-100 text-center mt-2 mb-2">
        Need an account?
        <Button onClick={handleSignup}>Sign Up</Button>
      </div>

      </Card>
      
    </>
  );
}
