import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser } = useAuthState();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await signOut(getAuth());
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
