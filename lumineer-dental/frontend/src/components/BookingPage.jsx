import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { styled } from '@mui/system';
import DatePicker from 'react-datepicker'; 



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



const BookingPage = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerData, setRegisterData] = useState({firstName: '', lastName: '', phone: '', gender: '', dob: '',
    allergies: '', medications: '', dentalHistory: '', surgeries: '', additionalConcerns: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showMedicalInfo, setShowMedicalInfo] = useState(false);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patientType, setPatientType] = useState(''); // Tracks if new or returning patient
  
  const [isBookingForSomeoneElse, setIsBookingForSomeoneElse] = useState(false); // Tracks if booking for someone else
  const [selectedService, setSelectedService] = useState(''); // Tracks the selected service
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  




  const handleNext = () => {
    console.log("Current Step:", step); 
  
    if (step === 1) {
      // Step 1 validation
      if (!firstName || !lastName || !patientType) {
        setError(true);
        console.log("Error: Missing required fields in Step 1"); 
      } else {
        setError(false);
        setStep(2);
        console.log("Navigating to Step 2"); 
      }
    } else if (step === 2) {
      // Step 2 validation
      if (!selectedService) {
        setError(true);
        console.log("Error: No service selected in Step 2"); 
      } else {
        setError(false);
        handleNextToStep3();
        console.log("Navigating to Step 3"); 
      }
    } else if (step === 3) {
      // Step 3 validation
      if (!selectedDoctor) {
        setError(true);
        console.log("Error: No doctor selected in Step 3"); 
      } else {
        setError(false);
        handleNextToStep4();
        console.log("Navigating to Step 4"); 
      }
    } else if (step === 4) {
      // Step 4 validation (Date and Time)
      if (!selectedDate || !selectedTime) {
        setError(true);
        console.log("Error: Date or time not selected in Step 4"); 
      } else {
        setError(false);
        setStep(5);
        console.log("Navigating to Step 5"); 
      }
    } else if (step === 5) {
      // Step 5 final confirmation (Details)
      if (!name || !email || !phone || !gender || !dob) {
        setError(true);
      
        console.log("Error: Missing required fields in Step 5"); 
      } else {
        setError(false);
        console.log("Appointment confirmed for", { name, email, phone, gender, dob });
        // Final confirmation logic goes here
      }
    }
  };
 
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      console.log("Navigating back to Step", step - 1); 
    }
  };
  
  const handleCheckboxChange = (event) => {
    setIsBookingForSomeoneElse(event.target.checked);
  };

  const handleNextToStep3 = () => {
    if (selectedService) {
      setStep(3); 
    } else {
      alert('Please select a service first.');
    }
  };

  const handleNextToStep4 = () => {
    if (selectedDoctor) {
      setStep(4); 
    } else {
      alert('Please select a doctor first.');
    }
  };

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor); 
    setError(false);
  };
  

  const handleNextToStep5 = () => {
    setStep(5);
    console.log("Navigating to Step 5");
  };

  const handleConfirmAppointment = () => {
   
    console.log("Appointment confirmed:", selectedDate, selectedTime, firstName, lastName);
    alert(`Appointment confirmed for ${firstName} ${lastName} on ${selectedDate} at ${selectedTime}`);
  };

  // Step 1: Input Patient Information
  const step1 = (
    <Card
      variant="outlined"
      sx={{
        margin: '80px',
        boxShadow:
          '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: 'Georgia, serif',
            fontWeight: 'italic',
            fontSize: '32px',
          }}
        >
          Hi, Welcome to Lumineer Dental Clinic - Login/ Register
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '20px',
          }}
        >
          
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
              onChange={handleCheckboxChange}
            />
          }
          label="I’m booking for someone else"
          sx={{ marginTop: '10px' }}
        />

        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '20px',
          }}
        >
          {isBookingForSomeoneElse
            ? 'Have they visited us before?'
            : 'Have you visited us before?'}
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
                backgroundColor:
                  patientType === 'returning' ? '#A0522D' : '#F5F5F5',
                color: patientType === 'returning' ? 'white' : '#8B4513',
              },
            }}
            onClick={() => setPatientType('returning')}
          >
            Returning Patient
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
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

 




// Step 2: Select service for both new and returning patients using buttons
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
        {patientType === 'new' ? 'We are excited to meet you.' : 'We are excited to see you again.'}
      </Typography>

      <Typography
        variant="body1"
        align="center"
        sx={{ fontFamily: 'Georgia, serif', fontSize: '18px', marginTop: '10px' }}
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
// Step 3: Select the provider for the chosen service
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

// Step 4: Select Date and Time
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

      <Box marginTop="20px" display="flex" justifyContent="center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
          isClearable
          style={{
            border: '1px solid #8B4513',
            borderRadius: '4px',
            padding: '10px',
            width: '100%',
          }}
        />
      </Box>

      <Box marginTop="20px" display="flex" justifyContent="center">
        <TextField
          select
          label="Select Time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          sx={{ width: '50%', marginRight: '10px' }}
        >
          <option value="" disabled>Select a time</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
        </TextField>
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextToStep5} 
          sx={{
            backgroundColor: '#8B4513',
            color: 'white',
            '&:hover': {
              backgroundColor: 'white',
              color: '#8B4513',
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// Step 5: Enter Personal Details
const step5 = (
  <Card
    variant="outlined"
    sx={{
      margin: '80px',
      boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }}
  >
    <CardContent>
      <Typography variant="h4" align="center">Enter Your Details</Typography>

      <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
        <TextField label="First Name" variant="outlined" sx={{ width: '80%', marginY: '10px' }} />
        <TextField label="Last Name" variant="outlined" sx={{ width: '80%', marginY: '10px' }} />
        <TextField label="Email" variant="outlined" sx={{ width: '80%', marginY: '10px' }} />
        <TextField label="Phone Number" variant="outlined" sx={{ width: '80%', marginY: '10px' }} />
        <TextField label="Gender" variant="outlined" select SelectProps={{ native: true }} sx={{ width: '80%', marginY: '10px' }}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </TextField>
        <TextField
          label="Date of Birth"
          type="date"
          variant="outlined"
          sx={{ width: '80%', marginY: '10px' }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginTop="20px">
      <Button
  variant="contained"
  color="primary"
  onClick={handleConfirmAppointment} 
  sx={{
    backgroundColor: '#8B4513',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: '#8B4513',
    },
  }}
>
  Confirm Appointment
</Button>
      </Box>
    </CardContent>
  </Card>
);

return (
  <BackgroundContainer>
    <Header>
      <Typography variant="h5" color="#5E2C04">Lumineer Dental - Login/ Register</Typography>
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
    {step === 1 && step1}
    {step === 2 && step2}
    {step === 3 && step3} 
    {step === 4 && step4}
    {step === 5 && step5} 
  </BackgroundContainer>
);

};

export default BookingPage;
