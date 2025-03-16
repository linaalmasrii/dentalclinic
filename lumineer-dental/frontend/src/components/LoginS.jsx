import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, IconButton, Button } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginS = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);

  // Simulating fetching user data from the database
  useEffect(() => {
    // Assume this is fetched from your backend (Replace with API call)
    const fetchedUser = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      dob: "1995-08-12",
      gender: "Male",
      profilePic: "https://via.placeholder.com/50" // Default profile pic
    };
    setUserData(fetchedUser);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUserData(null);
    navigate("/login-register"); // Redirect to login page
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
          {userData ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* Profile Picture */}
              <Avatar
                src={userData.profilePic}
                alt="Profile"
                sx={{ width: 45, height: 45, cursor: "pointer" }}
              />

              {/* First Name Display */}
              <Typography sx={{ fontWeight: 'bold', color: '#5E2C04' }}>
                {userData.firstName}
              </Typography>

              {/* Three-Dot Menu */}
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
            <RouterLink to="/login-register" style={{ textDecoration: 'none' }}>
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

      {/* Main Image and Message */}
      <Box
        sx={{
          position: 'relative',
          marginTop: '-7px',
          backgroundImage: 'url(src/assets/underhead.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '885px',
          width: '102%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '-10px',
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '0 20px',
            width: '100%',
            position: 'relative',
            zIndex: 2,
            marginLeft: '50px',
          }}
        >
          {/* Caption */}
          <Typography
            variant="h3"
            sx={{
              color: '#EDE4DA',
              paddingLeft: '20px',
              marginTop: '50px',
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontStyle: 'italic',
              textAlign: 'left',
              lineHeight: 1.3,
              maxWidth: '600px',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            "Crafting Beautiful Smiles,<br /> One Day at a Time"
          </Typography>
        </Box>
      </Box>

      {/* Keep all other sections as they are */}
    </Box>
  );
};

export default LoginS;
