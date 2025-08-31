import React from 'react';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';

const SimpleAbout = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom align="center">
          About Me
        </Typography>
        
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Professional Summary
            </Typography>
            <Typography variant="body1" paragraph>
              I am a passionate full-stack developer with expertise in modern web technologies.
              I love creating beautiful and functional user interfaces using React, Material-UI,
              and other cutting-edge frameworks.
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Skills
            </Typography>
            <Typography variant="body1">
              • React & Material-UI<br/>
              • Node.js & Express<br/>
              • JavaScript & TypeScript<br/>
              • Database Design<br/>
              • UI/UX Design
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Experience
            </Typography>
            <Typography variant="body1">
              Full-stack Developer with 3+ years of experience building 
              responsive web applications and RESTful APIs.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SimpleAbout;
