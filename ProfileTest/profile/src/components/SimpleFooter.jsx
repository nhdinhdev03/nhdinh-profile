import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const SimpleFooter = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto',
        py: 3,
        backgroundColor: 'primary.main',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © 2025 NH Dinh. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default SimpleFooter;
