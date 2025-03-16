// Step4.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const Step4 = ({ firstName, lastName, selectedService, selectedDate, selectedTime, selectedDoctor, handleConfirm }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: '80px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center">Confirm Your Appointment</Typography>
        <Typography variant="h6" align="center">Details:</Typography>
        <Typography variant="body1">Patient Name: {firstName} {lastName}</Typography>
        <Typography variant="body1">Service: {selectedService}</Typography>
        <Typography variant="body1">Date: {selectedDate?.toLocaleDateString()}</Typography>
        <Typography variant="body1">Time: {selectedTime}</Typography>
        <Typography variant="body1">Doctor: {selectedDoctor}</Typography>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button variant="contained" onClick={handleConfirm}>Confirm Appointment</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Step4;
