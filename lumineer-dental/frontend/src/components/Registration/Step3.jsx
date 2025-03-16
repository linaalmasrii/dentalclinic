// Step3.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step3 = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, selectedDoctor, setSelectedDoctor, doctors, handleNextToStep4 }) => {
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
        <Typography variant="h5" align="center">Select Date and Time</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" marginY="20px">
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          {/* Implement time and doctor selection logic here */}
          {/* For example, using a dropdown for doctor selection */}
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="" disabled>Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
            ))}
          </select>
        </Box>
        <Button variant="contained" onClick={handleNextToStep4}>Next</Button>
      </CardContent>
    </Card>
  );
};

export default Step3;
