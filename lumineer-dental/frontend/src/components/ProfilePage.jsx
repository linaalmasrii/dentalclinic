import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Container>
      <Typography variant="h4">Profile Information</Typography>
      {user ? (
        <>
          <TextField label="First Name" fullWidth value={user.firstName} disabled />
          <TextField label="Last Name" fullWidth value={user.lastName} disabled />
          <TextField label="Email" fullWidth value={user.email} disabled />
          <TextField label="Phone Number" fullWidth value={user.phoneNumber} disabled />
          <TextField label="Gender" fullWidth value={user.gender} disabled />
          <TextField label="Date of Birth" fullWidth value={user.dateOfBirth} disabled />
          <TextField label="Allergies" fullWidth value={user.allergies} disabled />
          <TextField label="Medications" fullWidth value={user.medications} disabled />
          <TextField label="Dental History" fullWidth value={user.dentalHistory} disabled />
          <TextField label="Surgeries" fullWidth value={user.surgeries} disabled />
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default ProfilePage;
