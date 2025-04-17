import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Grid } from "@mui/material";
import { getPatientHistory, getAppointmentHistory } from "../api";
import { useNavigate } from "react-router-dom";

const PatientHistory = () => {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("No user logged in");
        return;
      }

      try {
        const [patientData, appointmentsData] = await Promise.all([
          getPatientHistory(user.email),
          getAppointmentHistory(user.user.Id)
        ]);
        
        setPatientData(patientData);
        setAppointments(appointmentsData);
      } catch (error) {
        alert(error.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        navigate(-1); // Go back one step in history
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return '#8B4513';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#f44336';
      default: return '#757575';
    }
  };

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

          {/* Appointment History */}
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
                Appointment History
              </Typography>
              
              {appointments.length > 0 ? (
                <Box sx={{ display: 'grid', gap: '15px' }}>
                  {appointments.map((appointment, index) => (
                    <Paper key={index} sx={{
                      padding: '15px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(139, 69, 19, 0.05)',
                    }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                          <Typography variant="body1">
                            <strong>Service:</strong> {appointment.service}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Doctor:</strong> Dr. {appointment.doctorName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="body1">
                            <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Time:</strong> {appointment.appointmentTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box sx={{
                            padding: '5px 10px',
                            borderRadius: '15px',
                            display: 'inline-block',
                            backgroundColor: getStatusColor(appointment.status),
                            color: 'white'
                          }}>
                            {appointment.status}
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1">
                  No appointment history found.
                </Typography>
              )}
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
