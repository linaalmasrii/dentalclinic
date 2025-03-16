import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

const PatientHistory = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
      if (!user) {
        alert("No user logged in");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5133/api/patient-history/${user.email}`);
        const data = await res.json();
        if (res.ok) {
          setPatientData(data);
        } else {
          alert(data.message || "Failed to fetch patient history");
        }
      } catch (error) {
        console.error("Error fetching patient history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, []);

  return (
    <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>Patient History</Typography>

      {loading ? (
        <CircularProgress />
      ) : patientData ? (
        <Paper sx={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
          <Typography variant="h6">Full Name: {patientData.firstName} {patientData.lastName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {patientData.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {patientData.phoneNumber}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {patientData.gender || "Not specified"}</Typography>
          <Typography variant="body1"><strong>Date of Birth:</strong> {patientData.dateOfBirth || "Not specified"}</Typography>
          <Typography variant="body1"><strong>Allergies:</strong> {patientData.allergies || "None"}</Typography>
          <Typography variant="body1"><strong>Medications:</strong> {patientData.medications || "None"}</Typography>
          <Typography variant="body1"><strong>Dental History:</strong> {patientData.dentalHistory || "No records"}</Typography>
          <Typography variant="body1"><strong>Surgeries:</strong> {patientData.surgeries || "No records"}</Typography>
          <Typography variant="body1"><strong>Additional Concerns:</strong> {patientData.additionalConcerns || "None"}</Typography>
        </Paper>
      ) : (
        <Typography variant="body1">No patient history found.</Typography>
      )}
    </Box>
  );
};

export default PatientHistory;
