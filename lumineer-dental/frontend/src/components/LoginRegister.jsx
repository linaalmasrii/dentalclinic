import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, 
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  FormHelperText, Link
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {  registerUser, loginUser } from "../api";



// Header Style
const Header = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)",
  padding: "20px",
  borderRadius: "0 0 10px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 1000,
});

// Background Style
const BackgroundContainer = styled(Container)({
  backgroundImage: 'url("/src/assets/image copy 2.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Card Style
const StyledCard = styled(Card)({
  maxWidth: "400px",
  width: "100%",
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 4px 20px rgba(255, 215, 0, 0.6), 0 2px 10px rgba(139, 69, 19, 0.3)",
  borderRadius: "12px",
  marginTop: "85px",
});

// Add validation schemas
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'First name must be 50 characters or less')
    .required('First name is required'),
  lastName: Yup.string()
    .max(50, 'Last name must be 50 characters or less')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .max(100, 'Email must be 100 characters or less')
    .required('Email is required'),
  phone: Yup.string()
    .max(20, 'Phone number must be 20 characters or less')
    .required('Phone number is required'),
  gender: Yup.string()
    .required('Gender is required'),
  dob: Yup.date()
    .nullable()
    .required('Date of birth is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const medicalInfoSchema = Yup.object().shape({
  hasAllergies: Yup.string().required('Please select yes or no'),
  allergies: Yup.string().when('hasAllergies', {
    is: 'yes',
    then: Yup.string().required('Please specify your allergies').max(255, 'Too long')
  }),
  takingMedications: Yup.string().required('Please select yes or no'),
  medications: Yup.string().when('takingMedications', {
    is: 'yes',
    then: Yup.string().required('Please specify your medications').max(255, 'Too long')
  }),
  hasDentalHistory: Yup.string().required('Please select yes or no'),
  dentalHistory: Yup.string().when('hasDentalHistory', {
    is: 'yes',
    then: Yup.string().required('Please specify your dental history').max(255, 'Too long')
  }),
  hasSurgeries: Yup.string().required('Please select yes or no'),
  surgeries: Yup.string().when('hasSurgeries', {
    is: 'yes',
    then: Yup.string().required('Please specify your surgeries').max(255, 'Too long')
  }),
  hasAdditionalConcerns: Yup.string().required('Please select yes or no'),
  additionalConcerns: Yup.string().when('hasAdditionalConcerns', {
    is: 'yes',
    then: Yup.string().required('Please specify your concerns').max(255, 'Too long')
  })
});

const LoginRegister = () => {
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login Data
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // Registration Data
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
   allergies: "",
    medications: "",
    dentalHistory: "",
    surgeries: "",
    additionalConcerns: "",
  });
 
  const [medicalInfo, setMedicalInfo] = useState({
    hasAllergies: "no",
    allergies: "",
    takingMedications: "no",
    medications: "",
    hasDentalHistory: "no",
    dentalHistory: "",
    hasSurgeries: "no",
    surgeries: "",
    hasAdditionalConcerns: "no",
    additionalConcerns: "",
  });

  // Login Formik
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await loginUser(values);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/LoginS');
      } catch (error) {
        console.error('Login error:', error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  // Register Formik
  const registerFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // Move to medical info step 
      setStep("medicalInfo");
    },
  });

  // Medical Info Formik
  const medicalFormik = useFormik({
    initialValues: {
      hasAllergies: 'no',
      allergies: '',
      takingMedications: 'no',
      medications: '',
      hasDentalHistory: 'no',
      dentalHistory: '',
      hasSurgeries: 'no',
      surgeries: '',
      hasAdditionalConcerns: 'no',
      additionalConcerns: ''
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Combine registration data with medical info
        const completeUserData = {
          ...registerFormik.values,
          dateOfBirth: registerFormik.values.dob ? new Date(registerFormik.values.dob).toISOString() : null,
          hasAllergies: values.hasAllergies === 'yes',
          allergies: values.hasAllergies === 'yes' ? values.allergies : null,
          takingMedications: values.takingMedications === 'yes',
          medications: values.takingMedications === 'yes' ? values.medications : null,
          hasDentalHistory: values.hasDentalHistory === 'yes',
          dentalHistory: values.hasDentalHistory === 'yes' ? values.dentalHistory : null,
          hasSurgeries: values.hasSurgeries === 'yes',
          surgeries: values.hasSurgeries === 'yes' ? values.surgeries : null,
          hasAdditionalConcerns: values.hasAdditionalConcerns === 'yes',
          additionalConcerns: values.hasAdditionalConcerns === 'yes' ? values.additionalConcerns : null
        };

        await registerUser(completeUserData);
        alert("Registration successful! Please login.");
        setStep("login");
      } catch (error) {
        console.error('Registration error:', error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  });

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (step === "login") {
        // Validate email and password
        if (!loginData.email || !loginData.password) {
          throw new Error("Email and password are required");
        }
        
        console.log('Attempting login with:', {
          email: loginData.email,
          password: loginData.password.length + ' characters'
        });
        
        const result = await loginUser(loginData);
        console.log('Login result:', result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/LoginS');
      } else if (step === "register") {
        // Format data to match UserRegisterDto requirements
        const formattedData = {
          firstName: registerData.firstName || '',
          lastName: registerData.lastName || '',
          email: registerData.email || '',
          password: registerData.password || '',
          phone: registerData.phone || '',
          dateOfBirth: registerData.dob ? new Date(registerData.dob).toISOString() : null,
          gender: registerData.gender || null,
          // Set all medical fields to default values
          hasAllergies: false,
          takingMedications: false,
          hasDentalHistory: false,
          hasSurgeries: false,
          hasAdditionalConcerns: false,
          allergies: null,
          medications: null,
          dentalHistory: null,
          surgeries: null,
          additionalConcerns: null
        };

        // Validate required fields
        if (!formattedData.firstName) throw new Error("First name is required");
        if (!formattedData.lastName) throw new Error("Last name is required");
        if (!formattedData.email) throw new Error("Email is required");
        if (!formattedData.password || formattedData.password.length < 8) {
          throw new Error("Password must be at least 8 characters long");
        }
        if (!formattedData.phone) throw new Error("Phone number is required");

        console.log('Sending registration data:', formattedData);
        
        await registerUser(formattedData);
        alert("Registration successful! Please login.");
        setStep("login");
      } else if (step === "medicalInfo") {
        const formattedUserData = {
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          phone: registerData.phone,
          gender: registerData.gender || "Not Specified",
          dateOfBirth: registerData.dob ? new Date(registerData.dob).toISOString() : null,
          allergies: medicalInfo.hasAllergies === "yes" ? medicalInfo.allergies : null,
          medications: medicalInfo.takingMedications === "yes" ? medicalInfo.medications : null,
          dentalHistory: medicalInfo.hasDentalHistory === "yes" ? medicalInfo.dentalHistory : null,
          surgeries: medicalInfo.hasSurgeries === "yes" ? medicalInfo.surgeries : null,
          password: registerData.password
        };
  
        const result = await registerUser(formattedUserData);
        alert(result.message);
        setStep("login");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        navigate(-1); // Go back one step in history
      }
      if (event.key === 'Enter') {
        handleSubmit(event); // Submit the form on Enter key
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  
  const renderLoginForm = () => (
    <>
      <form onSubmit={loginFormik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={loginFormik.values.email}
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
          helperText={loginFormik.touched.email && loginFormik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
          helperText={loginFormik.touched.password && loginFormik.errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: "20px", backgroundColor: "#8B4513", color: "white", fontWeight: "bold" }}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
      <Typography
        align="center"
        sx={{ marginTop: "15px", cursor: "pointer", color: "#8B4513", fontWeight: "bold" }}
        onClick={() => setStep("register")}
      >
        New here? Register
      </Typography>
    </>
  );

  // Update the return JSX for register form
  const renderRegisterForm = () => (
    <form onSubmit={registerFormik.handleSubmit}>
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        margin="normal"
        value={registerFormik.values.firstName}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.firstName && Boolean(registerFormik.errors.firstName)}
        helperText={registerFormik.touched.firstName && registerFormik.errors.firstName}
      />
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        margin="normal"
        value={registerFormik.values.lastName}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.lastName && Boolean(registerFormik.errors.lastName)}
        helperText={registerFormik.touched.lastName && registerFormik.errors.lastName}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        margin="normal"
        value={registerFormik.values.email}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.email && Boolean(registerFormik.errors.email)}
        helperText={registerFormik.touched.email && registerFormik.errors.email}
      />
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone"
        margin="normal"
        value={registerFormik.values.phone}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.phone && Boolean(registerFormik.errors.phone)}
        helperText={registerFormik.touched.phone && registerFormik.errors.phone}
      />

      <FormControl 
        component="fieldset" 
        sx={{ marginTop: "10px" }}
        error={registerFormik.touched.gender && Boolean(registerFormik.errors.gender)}
      >
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={registerFormik.values.gender}
          onChange={registerFormik.handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        {registerFormik.touched.gender && registerFormik.errors.gender && (
          <FormHelperText>{registerFormik.errors.gender}</FormHelperText>
        )}
      </FormControl>
        #date of 
      <TextField
        fullWidth
        id="dob"
        name="dob"
        label="Date of Birth"
        type="date"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={registerFormik.values.dob}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.dob && Boolean(registerFormik.errors.dob)}
        helperText={registerFormik.touched.dob && registerFormik.errors.dob}
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        margin="normal"
        value={registerFormik.values.password}
        onChange={registerFormik.handleChange}
        onBlur={registerFormik.handleBlur}
        error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
        helperText={registerFormik.touched.password && registerFormik.errors.password}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setStep("login")}
          sx={{ color: "#8B4513", borderColor: "#8B4513" }}
        >
          Back to Login
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#8B4513", color: "white" }}
        >
          Next
        </Button>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link
          component="button"
          variant="body2"
          onClick={() => setStep("login")}
          sx={{ color: "#8B4513" }}
        >
          Login here
        </Link>
      </Box>
    </form>
  );

  // Update the return JSX for medical form
  const renderMedicalForm = () => (
    <form onSubmit={medicalFormik.handleSubmit}>
      {/* Allergies */}
      <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
        <FormLabel component="legend">Do you have any allergies?</FormLabel>
        <RadioGroup
          row
          name="hasAllergies"
          value={medicalFormik.values.hasAllergies}
          onChange={medicalFormik.handleChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {medicalFormik.values.hasAllergies === "yes" && (
          <TextField
            fullWidth
            name="allergies"
            label="Please specify"
            margin="normal"
            value={medicalFormik.values.allergies}
            onChange={medicalFormik.handleChange}
          />
        )}
      </FormControl>

      {/* Medications */}
      <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
        <FormLabel component="legend">Are you taking any medications?</FormLabel>
        <RadioGroup
          row
          name="takingMedications"
          value={medicalFormik.values.takingMedications}
          onChange={medicalFormik.handleChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {medicalFormik.values.takingMedications === "yes" && (
          <TextField
            fullWidth
            name="medications"
            label="Please specify"
            margin="normal"
            value={medicalFormik.values.medications}
            onChange={medicalFormik.handleChange}
          />
        )}
      </FormControl>

      {/* Dental History */}
      <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
        <FormLabel component="legend">Do you have any previous dental history?</FormLabel>
        <RadioGroup
          row
          name="hasDentalHistory"
          value={medicalFormik.values.hasDentalHistory}
          onChange={medicalFormik.handleChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {medicalFormik.values.hasDentalHistory === "yes" && (
          <TextField
            fullWidth
            name="dentalHistory"
            label="Please specify"
            margin="normal"
            value={medicalFormik.values.dentalHistory}
            onChange={medicalFormik.handleChange}
          />
        )}
      </FormControl>

      {/* Surgeries */}
      <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
        <FormLabel component="legend">Have you had any surgeries?</FormLabel>
        <RadioGroup
          row
          name="hasSurgeries"
          value={medicalFormik.values.hasSurgeries}
          onChange={medicalFormik.handleChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {medicalFormik.values.hasSurgeries === "yes" && (
          <TextField
            fullWidth
            name="surgeries"
            label="Please specify"
            margin="normal"
            value={medicalFormik.values.surgeries}
            onChange={medicalFormik.handleChange}
          />
        )}
      </FormControl>

      {/* Additional Concerns */}
      <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
        <FormLabel component="legend">Do you have any additional concerns?</FormLabel>
        <RadioGroup
          row
          name="hasAdditionalConcerns"
          value={medicalFormik.values.hasAdditionalConcerns}
          onChange={medicalFormik.handleChange}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
        {medicalFormik.values.hasAdditionalConcerns === "yes" && (
          <TextField
            fullWidth
            name="additionalConcerns"
            label="Please specify"
            margin="normal"
            value={medicalFormik.values.additionalConcerns}
            onChange={medicalFormik.handleChange}
          />
        )}
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setStep("register")}
          sx={{ color: "#8B4513", borderColor: "#8B4513" }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ backgroundColor: "#8B4513", color: "white" }}
        >
          {loading ? "Loading..." : "Complete Registration"}
        </Button>
      </Box>
    </form>
  );

  return (
    <BackgroundContainer>
      <Header>
        <Typography variant="h5" color="#5E2C04">
          Lumineer Dental - {
            step === "login" ? "Login" : 
            step === "register" ? "Register" : 
            "Medical Information"
          }
        </Typography>
      </Header>

      <StyledCard>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
            {step === "login" ? "Welcome Back!" : 
             step === "register" ? "Create an Account" : 
             "Medical Information"}
          </Typography>

          {step === "login" && renderLoginForm()}
          {step === "register" && renderRegisterForm()}
          {step === "medicalInfo" && renderMedicalForm()}
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default LoginRegister;
