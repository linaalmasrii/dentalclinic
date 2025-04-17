import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton, 
  Button,
  Grid,  
  Rating, 
  TextField, 
  Card,
  Link } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';





const LoginS = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Review state
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  // Review handler
  const handleSubmitReview = () => {
    if (rating === 0 || !reviewText.trim()) {
      alert('Please provide both a rating and review text');
      return;
    }

    const newReview = {
      userName: userData?.firstName || 'Anonymous',
      rating: rating,
      text: reviewText,
      date: new Date().toISOString()
    };

    setReviews(prev => [...prev, newReview]);
    setRating(0);
    setReviewText('');
    alert('Thank you for your review!');
  };


  // Simulating fetching user data from the database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        console.log('Raw stored user:', storedUser); // Debug log

        if (!storedUser) {
          console.log('No user data found in localStorage');
          navigate('/login-register');
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user data:', parsedUser); // Debug log

        setUserData({
          firstName: parsedUser.user.FirstName || 'Guest',
          lastName: parsedUser.user.LastName,
          email: parsedUser.user.Email,
          // Remove the placeholder image
        });

      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login-register');
      }
    };

    fetchUserData();

    // Keep the reviews part as is
    setReviews([
      {
        userName: "Sarah Smith",
        rating: 5,
        text: "Excellent service! Very professional and caring staff.",
        date: new Date().toISOString()
      },
      {
        userName: "Mike Johnson",
        rating: 4,
        text: "Great experience overall. Would recommend to others.",
        date: new Date().toISOString()
      }
    ]);
  }, [navigate]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    localStorage.removeItem('token'); // Clear token
    setUserData(null);
    navigate("/login-register");
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
              {/* Use first letter of name for Avatar */}
              <Avatar
                sx={{ 
                  width: 45, 
                  height: 45, 
                  bgcolor: '#8B4513',
                  cursor: "pointer"
                }}
              >
                {userData.firstName ? userData.firstName[0].toUpperCase() : '?'}
              </Avatar>

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

      {/* this is the about part  */}



      <Box id="about" sx={{ padding: '150px' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Content */}
          <Grid item xs={6} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
<Box
  sx={{
                backgroundColor: '#FAF3E0',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: '#5E2C04',
                  paddingBottom: '20px',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Compassionate Dental Solutions
              </Typography>
              <Typography variant="h5">
                Patients of All Ages, From Little Ones to Seniors!
              </Typography>
              <Typography
                variant="h5"
                sx={{ margin: '20px 0' }}
              >
                We're dedicated to fostering lasting relationships through exceptional care, including:
              </Typography>
              <Typography variant="h6">✔ Transparent Pricing</Typography>
              <Typography variant="h6">✔ Unparalleled Warranty</Typography>
              <Typography variant="h6">✔ Preventive and Comprehensive Dental Care</Typography>
              <Typography variant="h6">✔ Advanced Technology</Typography>
              <Typography variant="h6">✔ Enhanced Patient Experience</Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: '20px',
                  fontStyle: 'italic',
                  color: '#5E2C04',
                }}
              >
                "Our word is our worth. We promise to do it right, timely, and for a fair price."
              </Typography>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid item xs={6} md={6}>
            <Box
              component="img"
              src="src/assets/underhead2.jpg" 
              alt="Dental Clinic"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.4)',
              }}
            />
          </Grid>
        </Grid>
      </Box>



      {/* services Section */}
      <Box id="services" sx={{ padding: '100px', textAlign: 'center', backgroundColor: 'white' }}>
        <Typography variant="h4" sx={{ marginBottom: '40px', color: '#5E2C04' }}>
          All-Inclusive Care, All in One Place
        </Typography>

        {/* Service Boxes Container */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
          {/* General Dentistry */}
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
              width: { xs: '100%', sm: '30%' },
            }}
          >
            {/* Image */}
            <img src="src/assets/GENERALDENTISTRY.jpg" alt="General Dentistry" style={{ width: '100%', borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ marginTop: '15px', fontWeight: 'bold' }}>General Dentistry</Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Everything you expect and then some. Cleanings, fillings, and x-rays are just the beginning.
            </Typography>
            <Link href="#general" underline="none" sx={{ marginTop: '10px', display: 'block', color: '#5E2C04', fontWeight: 'bold', textDecoration: 'underline' }}>
              ABOUT GENERAL DENTISTRY
            </Link>
          </Box>

          {/* Cosmetic Dentistry */}
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
              width: { xs: '100%', sm: '30%' },
            }}
          >
            {/* Image */}
            <img src="src/assets/COSMETICDENTISTRY.jpg" alt="Cosmetic Dentistry" style={{ width: '100%', borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ marginTop: '15px', fontWeight: 'bold' }}>Cosmetic Dentistry</Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Discover your "wow!" factor. Invisalign, veneers, and in-office or take-home teeth whitening.
            </Typography>
            <Link href="#cosmetic" underline="none" sx={{ marginTop: '10px', display: 'block', color: '#5E2C04', fontWeight: 'bold', textDecoration: 'underline' }}>
              ABOUT COSMETIC DENTISTRY
            </Link>
          </Box>

          {/* Surgical Dentistry */}
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
              width: { xs: '100%', sm: '30%' },
            }}
          >
            {/* Image */}
            <img src="src/assets/ORALSURGERY.jpg" alt="Surgical Dentistry" style={{ width: '100%', borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ marginTop: '15px', fontWeight: 'bold' }}>Surgical Dentistry</Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              We can fix anything. Our dentists repair damaged or lost teeth with cutting-edge implants and more.
            </Typography>
            <Link href="#surgical" underline="none" sx={{ marginTop: '10px', display: 'block', color: '#5E2C04', fontWeight: 'bold', textDecoration: 'underline' }}>
              ABOUT ORAL SURGERY
            </Link>
          </Box>

          {/* Pediatric Dentistry */}
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
              width: { xs: '100%', sm: '30%' },
            }}
          >
            {/* Image */}
            <img src="src/assets/PEDIATRICDENTISTRY.jpg" alt="Pediatric Dentistry" style={{ width: '70%', borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ marginTop: '15px', fontWeight: 'bold' }}>Pediatric Dentistry</Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Specialized dental care for children, ensuring a positive experience from a young age.
            </Typography>
            <Link href="#pediatric" underline="none" sx={{ marginTop: '10px', display: 'block', color: '#5E2C04', fontWeight: 'bold', textDecoration: 'underline' }}>
              ABOUT PEDIATRIC DENTISTRY
            </Link>
          </Box>
          {/* Orthodontics */}
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '5px 5px 15px rgba(94, 44, 4, 0.5)',
              width: { xs: '100%', sm: '30%' },
            }}
          >
            {/* Image */}
            <img src="src/assets/ortho.jpg" alt="Orthodontics" style={{ width: '100%', borderRadius: '8px' }} />
            <Typography variant="h6" sx={{ marginTop: '15px', fontWeight: 'bold' }}>Orthodontics</Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Straighten your smile with our comprehensive orthodontic treatments, including braces and clear aligners.
            </Typography>
            <Link href="#orthodontics" underline="none" sx={{ marginTop: '10px', display: 'block', color: '#5E2C04', fontWeight: 'bold', textDecoration: 'underline' }}>
              ABOUT ORTHODONTICS
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center', 
          alignItems: 'center',      
          backgroundColor: '#F5F5DC', 
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
          marginTop: '30px',
          color: '#333',             
        }}
      >
        {/* No Hidden Costs Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',    
            padding:'150px',
            paddingRight: { sm: '30px' },
            marginBottom: { xs: '30px', sm: '0' },
          }}
        >
          <Typography variant="h6" sx={{ color: '#E6C79A', fontWeight: 'bold' }}> 
            TRANSPARENT PRICING
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: '15px', color: '#333' }}>
            No Hidden Costs
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '15px', color: '#666' }}>
            We believe in clear and accessible dental care. Enjoy upfront pricing and honest estimates, along with our reliable warranty. Stay up to date with regular 6-month checkups, and if any issue arises, we'll fix it at no additional cost.
          </Typography>
        </Box>

        {/* Insurance Section */}
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',    

            paddingLeft: { sm: '30px' },
            backgroundColor: '#FFF8E7',
            color: '#333',             
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.05)', 
          }}
        >
          <Typography variant="h6" sx={{ color: '#E6C79A', fontWeight: 'bold' }}> 
            Insurance
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '15px', color: '#666' }}>
            We work with major insurance providers, ensuring your benefits apply effectively to cover your treatments. Our team will guide you through each step of the process.
          </Typography>
        </Box>
      </Box>

      {/* Warranty Section */}
      <Box id="warranty" sx={{ padding: '150px' }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            color: '#5E2C04',
            marginBottom: '40px',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Warranty
        </Typography>

        {/* Logo Placement */}
        <Box sx={{ textAlign: 'center', marginBottom: '-100px', marginTop:'-120px' }}>
          <img src="src/assets/new logo.png" alt="Lumineer Dental Clinic Logo" style={{ width: '400px', borderRadius: '8px', height:'500px' }} />
        </Box>

        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          We stand behind our work with confidence.
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          All dental work completed at Lumineer Dental Clinic comes with a warranty, ensuring peace of mind for our patients.
        </Typography>
      </Box>



      {/* Visit Us Section */}
      <Box
        id="visit-us"
        sx={{
          padding: '150px',
          backgroundColor: 'rgba(249, 249, 249, 0.8)', 
          backgroundImage: 'url("src/assets/88.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px', 
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            color: '#5E2C04',
            marginBottom: '40px',
            fontFamily: "'Playfair Display', serif",
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
          }}
        >
          Visit Us
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            color: 'white', 
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          We're conveniently located in francesic utca 12 Center area. Find us on the ground floor of the building. Plenty of free parking available.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '10px',
            color: '#5E2C04',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          city center,
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            marginBottom: '30px',
            color: 'white',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', 
          }}
        >
          Pécs, Ferencesek utcája 21, 7621 Hungary
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            marginBottom: '30px',
            color: 'white',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          }}
        >
          Monday–Thursday: 8AM–3PM / 4pm-6pm
        </Typography>

        
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h6" sx={{ color: '#5E2C04', marginBottom: '10px', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
            Get Directions
          </Typography>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2767.7890689785554!2d18.2245056!3d46.075246899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4742b19897d74b5f%3A0x4989010e73ad65f8!2sP%C3%A9cs%2C%20Ferencesek%20utc%C3%A1ja%2021%2C%207621%20Hungary!5e0!3m2!1sen!2sjo!4v1730396278715!5m2!1sen!2sjo"
            width="800px" height="350px"
            style={{ border: 0, borderRadius: "1rem" }}
            allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>

      {/* Review Sections */}
      <Box id="review" sx={{ padding: '50px 20px', backgroundColor: '#FAF3E0' }}>
        {userData && (
          <Box sx={{ marginBottom: '50px' }}>
  <Typography
    variant="h4"
    sx={{
      textAlign: 'center',
      color: '#5E2C04',
      marginBottom: '30px',
      fontFamily: "'Playfair Display', serif",
    }}
  >
              Share Your Experience
  </Typography>
    <Box
      sx={{
        maxWidth: '600px',
                margin: '0 auto',
        padding: '20px',
                backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)',
      }}
    >
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              sx={{
                  fontSize: '2rem',
                  color: '#FFD700',
                  marginBottom: '20px'
                }}
              />
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
                placeholder="Tell us about your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
                onClick={handleSubmitReview}
        sx={{
          backgroundColor: '#8B4513',
          color: 'white',
          '&:hover': {
            backgroundColor: '#A0522D',
          },
        }}
      >
        Submit Review
      </Button>
            </Box>
    </Box>
  )}

        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: '#5E2C04',
            marginBottom: '30px',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Patient Reviews
        </Typography>
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
    }}
  >
    {reviews.map((review, index) => (
      <Card
        key={index}
        sx={{
          padding: '20px',
                backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
          borderRadius: '10px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Avatar sx={{ marginRight: '10px', backgroundColor: '#8B4513' }}>
                  {review.userName[0]}
          </Avatar>
                <Typography variant="h6">{review.userName}</Typography>
        </Box>
              <Rating value={review.rating} readOnly sx={{ color: '#FFD700', marginBottom: '10px' }} />
              <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                {review.text}
              </Typography>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Card>
          ))}
        </Box>
  </Box>

      {/* Logo Section */}
      <Box sx={{ marginTop: '-80px', display: 'flex', justifyContent: 'center' }}>
        <img src="src/assets/newicon.ico" alt="Lumineer Dental Clinic Logo" style={{ height: '500px', width: 'auto' }} />
</Box>
    </Box>

  );
};
   

export default LoginS;
