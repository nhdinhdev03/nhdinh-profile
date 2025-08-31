import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TestComponent = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Test Component
        </Typography>
        <Typography variant="body1">
          This is a test component to verify Material-UI is working properly.
        </Typography>
      </Box>
    </Container>
  );
};

export default TestComponent;
