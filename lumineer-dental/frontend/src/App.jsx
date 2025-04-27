import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister';
import LoginS from './components/LoginS'; 
import BookingPage from './components/BookingPage';
import PatientHistory from './components/PatientHistory';
import ProfilePage from './components/ProfilePage';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/loginS" element={<LoginS />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/profile-info" element={<ProfilePage />} />
          <Route path="/patient-history" element={<PatientHistory />} />
        </Routes>
      </Router>
    );
}

export default App;
