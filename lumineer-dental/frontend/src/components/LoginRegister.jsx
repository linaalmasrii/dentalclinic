import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Box, Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";


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

const LoginRegister = () => {
  const [step, setStep] = useState("login"); // "login" | "register" | "medicalInfo"
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

  // Handle Form Submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (step === "login") {
        const res = await fetch("http://localhost:5133/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });
  
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(result.user));
          alert("Login Successful!");
          navigate("/loginS");
        } else {
          alert(result.message || "Invalid credentials!");
        }
      } 
      
      else if (step === "register") {
        setStep("medicalInfo"); // Move to Medical Info Step
      } 
      
      else if (step === "medicalInfo") {
        // Ensure correct data formatting
        const formattedUserData = {
          ...registerData,
          gender: registerData.gender || "Not Specified",
          dateOfBirth: registerData.dob ? new Date(registerData.dob).toISOString() : null, // Convert to valid format
  
          hasAllergies: medicalInfo.hasAllergies === "yes",
          allergies: medicalInfo.hasAllergies === "yes" ? medicalInfo.allergies : null,
  
          takingMedications: medicalInfo.takingMedications === "yes",
          medications: medicalInfo.takingMedications === "yes" ? medicalInfo.medications : null,
  
          hasDentalHistory: medicalInfo.hasDentalHistory === "yes",
          dentalHistory: medicalInfo.hasDentalHistory === "yes" ? medicalInfo.dentalHistory : null,
  
          hasSurgeries: medicalInfo.hasSurgeries === "yes",
          surgeries: medicalInfo.hasSurgeries === "yes" ? medicalInfo.surgeries : null,
  
          hasAdditionalConcerns: medicalInfo.hasAdditionalConcerns === "yes",
          additionalConcerns: medicalInfo.hasAdditionalConcerns === "yes" ? medicalInfo.additionalConcerns : null,
        };
  
        // Send Data to Backend
        const res = await fetch("http://localhost:5133/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedUserData),
        });
  
        const result = await res.json();
        if (res.ok) {
          alert("Registration Complete! Please log in.");
          setStep("login");
        } else {
          alert(result.message || "Failed to save medical info!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <BackgroundContainer>
      <Header>
        <Typography variant="h5" color="#5E2C04">
          Lumineer Dental - {step === "login" ? "Login" : step === "register" ? "Register" : "Medical Info"}
        </Typography>
      </Header>

      <StyledCard>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ marginBottom: "20px" }}>
            {step === "login" ? "Welcome Back!" : step === "register" ? "Create an Account" : "Medical Information"}
          </Typography>

          {/* LOGIN FORM */}
          {step === "login" && (
            <>
              <TextField label="Email" fullWidth margin="normal" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
              <TextField label="Password" type="password" fullWidth margin="normal" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

              <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ marginTop: "20px", backgroundColor: "#8B4513", color: "white", fontWeight: "bold" }}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <Typography align="center" sx={{ marginTop: "15px", cursor: "pointer", color: "#8B4513", fontWeight: "bold" }} onClick={() => setStep("register")}>
                New here? Register
              </Typography>
            </>
          )}

          {/* REGISTRATION FORM */}
          {step === "register" && (
            <>
              <TextField label="First Name" fullWidth margin="normal" value={registerData.firstName} onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} />
              <TextField label="Last Name" fullWidth margin="normal" value={registerData.lastName} onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} />
              <TextField label="Email" fullWidth margin="normal" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
              <TextField label="Phone" fullWidth margin="normal" value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} />

              {/* Gender Selection */}
              <FormControl component="fieldset" sx={{ marginTop: "10px" }}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row value={registerData.gender} onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>

              {/* Date of Birth */}
              <TextField label="Date of Birth" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={registerData.dob} onChange={(e) => setRegisterData({ ...registerData, dob: e.target.value })} />
              <TextField label="Password" type="password" fullWidth margin="normal" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />

              <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ marginTop: "20px", backgroundColor: "#8B4513", color: "white", fontWeight: "bold" }}>
                {loading ? "Loading..." : "Next"}
              </Button>
            </>
          )}
{/* MEDICAL INFORMATION FORM */}
{step === "medicalInfo" && (
  <>
    {/* Allergies */}
    <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
      <FormLabel component="legend">Do you have any allergies?</FormLabel>
      <RadioGroup
        row
        value={medicalInfo.hasAllergies}
        onChange={(e) => setMedicalInfo({ ...medicalInfo, hasAllergies: e.target.value })}
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      {medicalInfo.hasAllergies === "yes" && (
        <TextField 
          label="Please specify" 
          fullWidth 
          margin="normal" 
          value={medicalInfo.allergies} 
          onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })} 
        />
      )}
    </FormControl>

    {/* Medications */}
    <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
      <FormLabel component="legend">Are you taking any medications?</FormLabel>
      <RadioGroup
        row
        value={medicalInfo.takingMedications}
        onChange={(e) => setMedicalInfo({ ...medicalInfo, takingMedications: e.target.value })}
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      {medicalInfo.takingMedications === "yes" && (
        <TextField 
          label="Please specify" 
          fullWidth 
          margin="normal" 
          value={medicalInfo.medications} 
          onChange={(e) => setMedicalInfo({ ...medicalInfo, medications: e.target.value })} 
        />
      )}
    </FormControl>

    {/* Dental History */}
    <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
      <FormLabel component="legend">Do you have any previous dental history?</FormLabel>
      <RadioGroup
        row
        value={medicalInfo.hasDentalHistory}
        onChange={(e) => setMedicalInfo({ ...medicalInfo, hasDentalHistory: e.target.value })}
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      {medicalInfo.hasDentalHistory === "yes" && (
        <TextField 
          label="Please specify" 
          fullWidth 
          margin="normal" 
          value={medicalInfo.dentalHistory} 
          onChange={(e) => setMedicalInfo({ ...medicalInfo, dentalHistory: e.target.value })} 
        />
      )}
    </FormControl>

    {/* Surgeries */}
    <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
      <FormLabel component="legend">Have you had any surgeries?</FormLabel>
      <RadioGroup
        row
        value={medicalInfo.hasSurgeries}
        onChange={(e) => setMedicalInfo({ ...medicalInfo, hasSurgeries: e.target.value })}
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      {medicalInfo.hasSurgeries === "yes" && (
        <TextField 
          label="Please specify" 
          fullWidth 
          margin="normal" 
          value={medicalInfo.surgeries} 
          onChange={(e) => setMedicalInfo({ ...medicalInfo, surgeries: e.target.value })} 
        />
      )}
    </FormControl>

    {/* Additional Concerns */}
    <FormControl component="fieldset" sx={{ marginTop: "10px", width: "100%" }}>
      <FormLabel component="legend">Do you have any additional concerns?</FormLabel>
      <RadioGroup
        row
        value={medicalInfo.hasAdditionalConcerns}
        onChange={(e) => setMedicalInfo({ ...medicalInfo, hasAdditionalConcerns: e.target.value })}
      >
        <FormControlLabel value="no" control={<Radio />} label="No" />
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      </RadioGroup>
      {medicalInfo.hasAdditionalConcerns === "yes" && (
        <TextField 
          label="Please specify" 
          fullWidth 
          margin="normal" 
          value={medicalInfo.additionalConcerns} 
          onChange={(e) => setMedicalInfo({ ...medicalInfo, additionalConcerns: e.target.value })} 
        />
      )}
    </FormControl>

    {/* Submit Button */}
    <Button 
      variant="contained" 
      fullWidth 
      onClick={handleSubmit} 
      sx={{ marginTop: "20px", backgroundColor: "#8B4513", color: "white", fontWeight: "bold" }}
    >
      {loading ? "Loading..." : "Complete Registration"}
    </Button>
  </>
)}

         
        </CardContent>
      </StyledCard>
    </BackgroundContainer>
  );
};

export default LoginRegister;
