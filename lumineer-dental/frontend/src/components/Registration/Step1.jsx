// Step1.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const Step1 = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isBookingForSomeoneElse,
  setIsBookingForSomeoneElse,
  patientType,
  setPatientType,
  error,
  setError,
}) => {
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
        <Typography variant="h4" align="center" sx={{ fontFamily: 'Georgia, serif', fontWeight: 'italic', fontSize: '32px' }}>
          Hi, Welcome to Lumineer Dental Clinic - Appointment
        </Typography>

        <Typography variant="h6" align="center" sx={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '20px' }}>
          Who is this appointment for?
        </Typography>

        <Box display="flex" justifyContent="space-between" marginY="20px">
          <TextField
            label="Patient First Name (Required)"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={error && !firstName}
            helperText={error && !firstName ? 'First name is required' : ''}
            sx={{ marginRight: '10px' }}
          />

          <TextField
            label="Patient Last Name (Required)"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={error && !lastName}
            helperText={error && !lastName ? 'Last name is required' : ''}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={isBookingForSomeoneElse}
              onChange={(event) => setIsBookingForSomeoneElse(event.target.checked)}
            />
          }
          label="I’m booking for someone else"
          sx={{ marginTop: '10px' }}
        />

        <Typography variant="h6" align="center" sx={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '20px' }}>
          {isBookingForSomeoneElse ? 'Have they visited us before?' : 'Have you visited us before?'}
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ marginTop: '10px' }}>
          <Button
            variant={patientType === 'new' ? 'contained' : 'outlined'}
            sx={{
              margin: '10px',
              backgroundColor: patientType === 'new' ? '#8B4513' : 'white',
              color: patientType === 'new' ? 'white' : '#8B4513',
              borderColor: '#8B4513',
              '&:hover': {
                backgroundColor: patientType === 'new' ? '#A0522D' : '#F5F5F5',
                color: patientType === 'new' ? 'white' : '#8B4513',
              },
            }}
            onClick={() => setPatientType('new')}
          >
            New Patient
          </Button>

          <Button
            variant={patientType === 'returning' ? 'contained' : 'outlined'}
            sx={{
              margin: '10px',
              backgroundColor: patientType === 'returning' ? '#8B4513' : 'white',
              color: patientType === 'returning' ? 'white' : '#8B4513',
              borderColor: '#8B4513',
              '&:hover': {
                backgroundColor: patientType === 'returning' ? '#A0522D' : '#F5F5F5',
                color: patientType === 'returning' ? 'white' : '#8B4513',
              },
            }}
            onClick={() => setPatientType('returning')}
          >
            Returning Patient
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Step1;
