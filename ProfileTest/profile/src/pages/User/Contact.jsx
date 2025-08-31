import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Snackbar,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Schedule as ScheduleIcon,
  Message as MessageIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  margin: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
  '&.github:hover': {
    backgroundColor: '#333',
    color: 'white',
  },
  '&.linkedin:hover': {
    backgroundColor: '#0077B5',
    color: 'white',
  },
  '&.twitter:hover': {
    backgroundColor: '#1DA1F2',
    color: 'white',
  },
}));

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const contactInfo = [
    {
      icon: EmailIcon,
      title: 'Email',
      value: 'nhdinh.dev@gmail.com',
      href: 'mailto:nhdinh.dev@gmail.com',
      color: '#EA4335'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+84 123 456 789',
      href: 'tel:+84123456789',
      color: '#34A853'
    },
    {
      icon: LocationIcon,
      title: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      href: 'https://maps.google.com/vietnam',
      color: '#4285F4'
    },
    {
      icon: ScheduleIcon,
      title: 'Availability',
      value: 'Mon - Fri, 9AM - 6PM (GMT+7)',
      color: '#FBBC04'
    }
  ];

  const socialLinks = [
    {
      icon: GitHubIcon,
      href: 'https://github.com/nhdinhdev03',
      label: 'GitHub',
      className: 'github'
    },
    {
      icon: LinkedInIcon,
      href: 'https://linkedin.com/in/nhdinh',
      label: 'LinkedIn',
      className: 'linkedin'
    },
    {
      icon: TwitterIcon,
      href: 'https://twitter.com/nhdinh',
      label: 'Twitter',
      className: 'twitter'
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        severity: 'success'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ 
              fontWeight: 600, 
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            Get In Touch
          </Typography>
          
          <Typography
            variant="h2"
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              color: 'text.primary'
            }}
          >
            Let's Work <GradientText variant="h2" component="span">Together</GradientText>
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              fontSize: '1.1rem',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.8,
              mb: 6
            }}
          >
            Have a project in mind or just want to chat about technology? I'm always excited to 
            discuss new opportunities and ideas. Let's connect and create something amazing together!
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 4,
                    color: 'text.primary'
                  }}
                >
                  Contact Information
                </Typography>

                <Grid container spacing={3}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} key={index}>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <ContactCard>
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  backgroundColor: info.color + '20',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 3,
                                }}
                              >
                                <info.icon sx={{ color: info.color, fontSize: 24 }} />
                              </Box>
                              
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{ 
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 0.5
                                  }}
                                >
                                  {info.title}
                                </Typography>
                                
                                {info.href ? (
                                  <Typography
                                    component="a"
                                    href={info.href}
                                    variant="body2"
                                    sx={{
                                      color: 'text.secondary',
                                      textDecoration: 'none',
                                      '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline',
                                      },
                                    }}
                                  >
                                    {info.value}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {info.value}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </CardContent>
                        </ContactCard>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                {/* Social Links */}
                <Box sx={{ mt: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 3,
                      color: 'text.primary'
                    }}
                  >
                    Follow Me
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <SocialButton
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={social.className}
                          aria-label={social.label}
                        >
                          <IconComponent />
                        </SocialButton>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Slide direction="left" in timeout={1200}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 4,
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <MessageIcon sx={{ mr: 2, color: 'primary.main' }} />
                  Send Message
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        variant="outlined"
                        placeholder="Tell me about your project, ideas, or just say hello!"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        endIcon={loading ? null : <SendIcon />}
                        sx={{
                          py: 2,
                          px: 4,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: '1rem',
                          minWidth: 160,
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              color: 'text.primary'
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                question: "What's your typical response time?",
                answer: "I usually respond to emails within 24 hours during business days."
              },
              {
                question: "Do you work on weekends?",
                answer: "For urgent projects, yes! But I prefer to discuss availability beforehand."
              },
              {
                question: "What information should I include in my message?",
                answer: "Project details, timeline, budget range, and any specific requirements you have."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      {faq.question}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {faq.answer}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
