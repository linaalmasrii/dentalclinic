// Step2.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const Step2 = ({ selectedService, setSelectedService, services, handleNextToStep3 }) => {
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
        <Typography variant="h5" align="center">Select a Service</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" marginY="20px">
          {services.map((service) => (
            <Button
              key={service}
              variant={selectedService === service ? 'contained' : 'outlined'}
              onClick={() => setSelectedService(service)}
              sx={{ margin: '5px' }}
            >
              {service}
            </Button>
          ))}
        </Box>
        <Button variant="contained" onClick={handleNextToStep3}>Next</Button>
      </CardContent>
    </Card>
  );
};

export default Step2;
