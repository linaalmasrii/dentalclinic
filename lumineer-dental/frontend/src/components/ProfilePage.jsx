import React, { useState, useEffect } from "react";
import { Container, TextField, Typography, Box, Paper, Grid,  CircularProgress,IconButton,Menu, MenuItem,Avatar,Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import{getProfile} from '../api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login-register");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getProfile();    
        console.log("Profile API response:", data);
        setUser({
          firstName: data.FirstName,
          lastName:  data.LastName,
          email:     data.Email,
          phoneNumber: data.PhoneNumber,
          gender:    data.Gender,
          dateOfBirth: data.DateOfBirth ? new Date(data.DateOfBirth).toLocaleDateString() : 'Not specified',
          allergies: data.HasAllergies ? data.Allergies : 'None',
          medications: data.TakingMedications ? data.Medications : 'None',
          dentalHistory: data.HasDentalHistory ? data.DentalHistory : 'No records',
          surgeries: data.HasSurgeries ? data.Surgeries : 'None',
          additionalConcerns: data.HasAdditionalConcerns ? data.AdditionalConcerns : 'None'
        });
      } catch (error) {
        console.error("Error loading user profile:", error);
        alert("Please login to view your profile");
        navigate('/login-register');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        navigate('/LoginS'); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const TextFieldStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '15px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5E2C04',
      },
      '&:hover fieldset': {
        borderColor: '#8B4513',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#5E2C04',
      }
    },
    '& .MuiInputLabel-root': {
      color: '#5E2C04',
      '&.Mui-disabled': {
        color: '#5E2C04',
      }
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#000000',
      color: '#000000',
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '98%',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100px',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="src/assets/new logo.png" alt="Lumineer Dental Clinic Logo" style={{ height: '380px', width: '460px' }} />
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <ScrollLink to="about" smooth={true} duration={500} style={{ color: 'black', cursor: 'pointer' }}>
            ABOUT
          </ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500} style={{ color: 'black', cursor: 'pointer' }}>
            SERVICES
          </ScrollLink>
          <ScrollLink to="warranty" smooth={true} duration={500} style={{ color: 'black', cursor: 'pointer' }}>
            WARRANTY
          </ScrollLink>
          <ScrollLink to="review" smooth={true} duration={500} style={{ color: 'black', cursor: 'pointer' }}>
            REVIEW
          </ScrollLink>
          <ScrollLink to="visit-us" smooth={true} duration={500} style={{ color: 'black', cursor: 'pointer' }}>
            VISIT US
          </ScrollLink>
          <Typography>
            <a href="tel:(+36) 20750-7662" style={{ textDecoration: 'none', color: 'black' }}>
              (+36) 20750-7662
            </a>
          </Typography>

          {/* Profile Section */}
      {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Avatar
                src={user.profilePic || "https://via.placeholder.com/50"}
                alt="Profile"
                sx={{ width: 45, height: 45, cursor: "pointer" }}
              />
              <Typography sx={{ fontWeight: 'bold', color: '#5E2C04' }}>
                {user.firstName}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate('/profile-info')}>Profile Info</MenuItem>
                <MenuItem onClick={() => navigate('/patient-history')}>Patient History</MenuItem>
                <MenuItem onClick={() => navigate('/booking')}>Book Now</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <RouterLink to="/loginRegister" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#5E2C04',
                  color: 'white',
                  '&:hover': { backgroundColor: 'white', color: '#000' },
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.0rem',
                  borderRadius: '9px',
                  padding: '10px 20px',
                }}
              >
                Login/Register
              </Button>
            </RouterLink>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FAF3E0',
        paddingTop: '120px',
        paddingBottom: '40px'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              color: '#5E2C04',
              marginBottom: '40px',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Profile Information
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <CircularProgress sx={{ color: '#5E2C04' }} />
            </Box>
          ) : user ? (
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
                  backgroundColor: 'white',
                  marginBottom: '20px'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#5E2C04',
                    marginBottom: '20px',
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    Personal Details
                  </Typography>
                  <TextField 
                    label="First Name" 
                    fullWidth 
                    value={user.firstName || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Last Name" 
                    fullWidth 
                    value={user.lastName || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Email" 
                    fullWidth 
                    value={user.email || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Phone Number" 
                    fullWidth 
                    value={user.phoneNumber || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                </Paper>
              </Grid>

              {/* Medical Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.2)',
                  backgroundColor: 'white',
                  marginBottom: '20px'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#5E2C04',
                    marginBottom: '20px',
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    Medical Information
                  </Typography>
                  <TextField 
                    label="Gender" 
                    fullWidth 
                    value={user.gender || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Date of Birth" 
                    fullWidth 
                    value={user.dateOfBirth || 'Not specified'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Allergies" 
                    fullWidth 
                    value={user.allergies || 'None'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Medications" 
                    fullWidth 
                    value={user.medications || 'None'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
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
                  <TextField 
                    label="Dental History" 
                    fullWidth 
                    multiline
                    rows={3}
                    value={user.dentalHistory || 'No records'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
                  <TextField 
                    label="Previous Surgeries" 
                    fullWidth 
                    multiline
                    rows={2}
                    value={user.surgeries || 'None'} 
                    disabled 
                    sx={TextFieldStyle}
                  />
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
                No profile information found.
              </Typography>
            </Box>
      )}
    </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;
