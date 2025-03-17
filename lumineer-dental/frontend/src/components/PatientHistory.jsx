import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Grid } from "@mui/material";

const PatientHistory = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
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
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FAF3E0',
      paddingTop: '120px', // Space for fixed header
      paddingBottom: '40px'
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center',
          color: '#5E2C04',
          marginBottom: '40px',
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Patient History
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <CircularProgress sx={{ color: '#5E2C04' }} />
        </Box>
      ) : patientData ? (
        <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: 'auto', padding: '0 20px' }}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
              height: '100%',
              backgroundColor: 'white',
            }}>
              <Typography variant="h5" sx={{ 
                color: '#5E2C04',
                marginBottom: '20px',
                fontFamily: "'Playfair Display', serif",
              }}>
                Personal Information
              </Typography>
              <Box sx={{ display: 'grid', gap: '15px' }}>
                <Typography variant="body1">
                  <strong>Full Name:</strong> {patientData.firstName} {patientData.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {patientData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {patientData.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {patientData.gender || "Not specified"}
                </Typography>
                <Typography variant="body1">
                  <strong>Date of Birth:</strong> {patientData.dateOfBirth || "Not specified"}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Medical Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
              height: '100%',
              backgroundColor: 'white',
            }}>
              <Typography variant="h5" sx={{ 
                color: '#5E2C04',
                marginBottom: '20px',
                fontFamily: "'Playfair Display', serif",
              }}>
                Medical Information
              </Typography>
              <Box sx={{ display: 'grid', gap: '15px' }}>
                <Typography variant="body1">
                  <strong>Allergies:</strong> {patientData.allergies || "None"}
                </Typography>
                <Typography variant="body1">
                  <strong>Medications:</strong> {patientData.medications || "None"}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Dental History */}
          <Grid item xs={12}>
            <Paper sx={{
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
              backgroundColor: 'white',
            }}>
              <Typography variant="h5" sx={{ 
                color: '#5E2C04',
                marginBottom: '20px',
                fontFamily: "'Playfair Display', serif",
              }}>
                Dental History
              </Typography>
              <Box sx={{ display: 'grid', gap: '15px' }}>
                <Typography variant="body1">
                  <strong>Dental History:</strong> {patientData.dentalHistory || "No records"}
                </Typography>
                <Typography variant="body1">
                  <strong>Previous Surgeries:</strong> {patientData.surgeries || "No records"}
                </Typography>
                <Typography variant="body1">
                  <strong>Additional Concerns:</strong> {patientData.additionalConcerns || "None"}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: '600px',
          margin: 'auto',
          boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
        }}>
          <Typography variant="h6" sx={{ color: '#5E2C04' }}>
            No patient history found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PatientHistory;
