import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createAppointment } from '../api'; // Import the API function


const Header = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)', // Gold and brown shadow
  padding: '20px',
  borderRadius: '0 0 10px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 1000, 
}));

const BackgroundContainer = styled(Container)(({ theme }) => ({
  backgroundImage: 'url("src/assets/back.png.jpeg")', 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '780px', 
  paddingTop: '20px', 
}));

const doctorsByService = {
  "Botox": [
    { name: "Dr.Reema RDH", title: "Botox Specialist", imgSrc: "src/assets/doctors/reema.png" },
    { name: "Dr.Szami RDH", title: "Cosmetic Dentist", imgSrc: "src/assets/doctors/szami.png" },
    { name: "Dr.Tia RDH", title: "Facial Aesthetics Expert", imgSrc: "src/assets/doctors/tia.png" }
  ],
  "Dental Implant Consult": [
    { name: "Dr.George RDH", title: "Implant Consultant", imgSrc: "src/assets/doctors/Goerge.jpeg" },
    { name: "Dr.Jack ", title: "Implant Specialist", imgSrc: "src/assets/doctors/jack.jpeg" }
  ],
  "Teeth Whitening": [
    { name: "Dr.Szofi RDH", title: "Teeth Whitening Expert", imgSrc: "src/assets/doctors/szofi.png" },
    { name: "Dr.Szor RDH", title: "Cosmetic Dentistry Specialist", imgSrc: "src/assets/doctors/szor.png" }
  ],
  "Cleaning": [
    { name: "Dr.Jihan RDH", title: "Dental Hygienist", imgSrc: "src/assets/ashley.png" },
    { name: "Dr.Dania RDH", title: "Hygiene Specialist", imgSrc: "src/assets/doctors/dania.png" },
    { name: "Dr.Barn RDH", title: "Oral Health Expert", imgSrc: "src/assets/doctors/barn.jpeg" }
  ],
  "Orthodontic Consult": [
    { name: "Dr.Sinan RDH", title: "Orthodontic Consultant", imgSrc: "src/assets/doctors/sinan.jpeg" },
    { name: "Dr.Mohammad RDH", title: "Orthodontics Specialist", imgSrc: "src/assets/doctors/mohammad.jpeg" }
  ],
  "Kids Cleaning": [
    { name: "Dr.Josleen RDH", title: "Pediatric Dental Hygienist", imgSrc: "src/assets/doctors/madline .jpeg" },
    { name: "Dr.Hani RDH", title: "Kids' Dental Expert", imgSrc: "src/assets/doctors/hani.jpeg" }
  ],
  "Fluoride Treatment": [
    { name: "Dr.Goe RDH", title: "Fluoride Treatment Specialist", imgSrc: "src/assets/doctors/goe.jpeg" },
    { name: "Dr.Mona RDH", title: "Preventative Care Expert", imgSrc: "src/assets/doctors/mona.jpeg" }
  ],
  "Pediatric Dental Exam": [
    { name: "Dr.Adam RDH", title: "Pediatric Dental Specialist", imgSrc: "src/assets/doctors/adam.png" },
    { name: " Dr.Alan RDH", title: "Children's Dental Expert", imgSrc: "src/assets/doctors/alan.png" }
  ],
  "Sealants": [
    { name: "Dr.Sarah RDH", title: "Sealant Expert", imgSrc: "src/assets/doctors/sara.jpeg" },
    { name: "Dr.Lora RDH", title: "Dental Sealant Specialist", imgSrc: "src/assets/doctors/lora.jpeg" }
  ]
};

const StyledCalendarContainer = styled('div')({
  '.react-calendar': {
    width: '100%',
    maxWidth: '400px',
    background: 'white',
    border: '1px solid #8B4513',
    borderRadius: '8px',
    padding: '16px',
    margin: '20px 0',
    fontFamily: 'Georgia, serif'
  },

  '.react-calendar__tile': {
    padding: '10px',
    background: 'none',
    textAlign: 'center',
    border: 'none'
  },

  '.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus': {
    backgroundColor: '#f8f8fa',
    color: '#8B4513',
    borderRadius: '6px'
  },

  '.react-calendar__tile--active': {
    background: '#8B4513 !important',
    color: 'white !important',
    borderRadius: '6px'
  },

  '.react-calendar__tile--now': {
    background: '#f8f8fa',
    borderRadius: '6px'
  },

  '.react-calendar__navigation button': {
    minWidth: '44px',
    background: 'none',
    fontSize: '16px',
    marginTop: '8px',
    color: '#8B4513'
  },

  '.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus': {
    backgroundColor: '#f8f8fa',
    borderRadius: '6px'
  },

  '.react-calendar__month-view__weekdays': {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75em',
    color: '#8B4513'
  },

  '.react-calendar__month-view__days__day--weekend': {
    color: '#d10000'
  },

  '.react-calendar__month-view__days__day--neighboringMonth': {
    color: '#757575'
  }
});




const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (!selectedService) {
        setError(true);
      } else {
        setError(false);
        handleNextToStep3();
      }
    } else if (step === 2) {
      if (!selectedDoctor) {
        setError(true);
      } else {
        setError(false);
        handleNextToStep4();
      }
    } else if (step === 3) {
      if (!selectedDate || !selectedTime) {
        setError(true);
      } else {
        setError(false);
        handleConfirmAppointment();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    setError(false);
  };

  const handleNextToStep3 = () => {
    if (selectedService) {
      setStep(2);
    } else {
      alert('Please select a service first.');
    }
  };

  const handleNextToStep4 = () => {
    if (selectedDoctor) {
      setStep(3);
    } else {
      alert('Please select a doctor first.');
    }
  };

  const handleConfirmAppointment = async () => {
    try {
        const appointmentData = {
            service: selectedService,
            doctor: selectedDoctor.name,
            date: selectedDate,
            time: selectedTime,
        };
        await createAppointment(appointmentData);
        alert("Appointment confirmed!");
    } catch (error) {
        alert(error.message || "Failed to confirm appointment");
    }
  };

  // Keep your existing step2 and step3 exactly the same ...
  const step2 = (
    <Card
      variant="outlined"
      sx={{
        margin: '80px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '24px' }}
        >
          What would you like to come in for?
        </Typography>
  
        {/* Main Services */}
        <Box display="flex" flexDirection="column" alignItems="center" marginY="20px">
          {['Botox', 'Dental Implant Consult', 'Teeth Whitening', 'Cleaning', 'Orthodontic Consult'].reduce((rows, service, index) => {
            if (index % 2 === 0) {
              rows.push([service]);
            } else {
              rows[rows.length - 1].push(service);
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" justifyContent="center" marginBottom="10px">
              {row.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? 'contained' : 'outlined'}
                  sx={{
                    margin: '10px',
                    backgroundColor: selectedService === service ? '#8B4513' : 'white',
                    color: selectedService === service ? 'white' : '#8B4513',
                    borderColor: '#8B4513',
                    width: '200px',
                    '&:hover': {
                      backgroundColor: selectedService === service ? '#A0522D' : '#F5F5F5',
                      color: selectedService === service ? 'white' : '#8B4513',
                    },
                  }}
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
  
        <Typography variant="h6" align="center" sx={{ marginTop: '30px', fontFamily: 'Georgia, serif' }}>
          Children's Services
        </Typography>
  
        {/* Children's Services */}
        <Box display="flex" flexDirection="column" alignItems="center" marginY="20px">
          {['Kids Cleaning', 'Fluoride Treatment', 'Pediatric Dental Exam', 'Sealants'].reduce((rows, service, index) => {
            if (index % 2 === 0) {
              rows.push([service]);
            } else {
              rows[rows.length - 1].push(service);
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" justifyContent="center" marginBottom="10px">
              {row.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? 'contained' : 'outlined'}
                  sx={{
                    margin: '10px',
                    backgroundColor: selectedService === service ? '#8B4513' : 'white',
                    color: selectedService === service ? 'white' : '#8B4513',
                    borderColor: '#8B4513',
                    width: '200px',
                    '&:hover': {
                      backgroundColor: selectedService === service ? '#A0522D' : '#F5F5F5',
                      color: selectedService === service ? 'white' : '#8B4513',
                    },
                  }}
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
  
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextToStep3}
            sx={{
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#8B4513',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
  
  // Step 3: Select the provider
  const step3 = (
    <Card
      variant="outlined"
      sx={{
        margin: '80px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '24px' }}
        >
          Which provider would you like to see?
        </Typography>
  
        <Typography
          variant="body1"
          align="center"
          sx={{ fontFamily: 'Georgia, serif', fontSize: '18px', marginTop: '10px' }}
        >
          Select one:
        </Typography>
  
        {/* Providers List based on the selected service */}
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" marginY="20px">
          {doctorsByService[selectedService]?.map((provider) => (
            <Button
              key={provider.name}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '10px',
                borderColor: '#8B4513',
                color: selectedDoctor === provider ? 'white' : '#8B4513',
                backgroundColor: selectedDoctor === provider ? '#8B4513' : 'transparent',
                width: '45%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#8B4513',
                  color: 'white',
                },
              }}
              onClick={() => handleDoctorSelection(provider)}
            >
              <img
                src={provider.imgSrc}
                alt={provider.name}
                style={{
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  marginBottom: '5px',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {provider.name}
              </Typography>
              <Typography variant="body2">{provider.title}</Typography>
            </Button>
          ))}
        </Box>
  
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            sx={{
              marginRight: '10px',
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#8B4513',
              },
            }}
          >
            Back
          </Button>
  
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextToStep4}
            disabled={!selectedDoctor}
            sx={{
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#8B4513',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
  const step4 = (
    <Card
      variant="outlined"
      sx={{
        margin: '80px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center">Select Date and Time</Typography>

        <Box marginTop="20px" display="flex" flexDirection="column" alignItems="center">
          <StyledCalendarContainer>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
            />
          </StyledCalendarContainer>

          <Box marginTop="20px" display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Available Times
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
              {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'contained' : 'outlined'}
                  onClick={() => setSelectedTime(time)}
                  sx={{
                    margin: '5px',
                    backgroundColor: selectedTime === time ? '#8B4513' : 'white',
                    color: selectedTime === time ? 'white' : '#8B4513',
                    borderColor: '#8B4513',
                    '&:hover': {
                      backgroundColor: selectedTime === time ? '#A0522D' : '#F5F5F5',
                      color: selectedTime === time ? 'white' : '#8B4513',
                    },
                  }}
                >
                  {time}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              marginRight: '10px',
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#8B4513',
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmAppointment}
            disabled={!selectedDate || !selectedTime}
            sx={{
              backgroundColor: '#8B4513',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#8B4513',
              },
            }}
          >
            Confirm Booking
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <BackgroundContainer>
      <Header>
        <Typography variant="h5" color="#5E2C04">Lumineer Dental - Appointment Booking</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="src/assets/newicon.ico"
            alt="Logo"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Typography variant="body2">Frenciesik utca 20, City Center, 7625</Typography>
          <Typography>
            <a href="tel: (+36) 20750-7662" style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }}>
              (+36) 20750-7662
            </a>
          </Typography>
        </Box>
      </Header>
      {step === 1 && step2}
      {step === 2 && step3}
      {step === 3 && step4}
    </BackgroundContainer>
  );
};

export default BookingPage;