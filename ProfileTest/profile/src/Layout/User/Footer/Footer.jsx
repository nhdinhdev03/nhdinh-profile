import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f8f9fa',
  color: theme.palette.text.primary,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  marginTop: 'auto',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  margin: theme.spacing(0.5),
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
  '&.facebook:hover': {
    backgroundColor: '#4267B2',
    color: 'white',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentYear = new Date().getFullYear();

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
    },
    { 
      icon: FacebookIcon, 
      href: 'https://facebook.com/nhdinh', 
      label: 'Facebook',
      className: 'facebook'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const contactInfo = [
    { icon: EmailIcon, text: 'nhdinh.dev@gmail.com', href: 'mailto:nhdinh.dev@gmail.com' },
    { icon: PhoneIcon, text: '+84 123 456 789', href: 'tel:+84123456789' },
    { icon: LocationIcon, text: 'Ho Chi Minh City, Vietnam' }
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontFamily: '"Sour Gummy", sans-serif',
                  mb: 2,
                  display: 'block',
                  color: 'text.primary',
                }}
              >
                NH<GradientText variant="h5" component="span">Dinh</GradientText>
              </Typography>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.8,
                  maxWidth: '300px'
                }}
              >
                Passionate developer creating amazing web experiences with modern technologies. 
                Let's build something great together!
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <SocialIconButton
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={social.className}
                      aria-label={social.label}
                    >
                      <IconComponent fontSize="small" />
                    </SocialIconButton>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: 'text.primary'
              }}
            >
              Quick Links
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Typography
                  key={link.path}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: 'text.primary'
              }}
            >
              Services
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'API Development',
                'Consulting'
              ].map((service) => (
                <Typography
                  key={service}
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {service}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                color: 'text.primary'
              }}
            >
              Get in Touch
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <IconComponent 
                      fontSize="small" 
                      sx={{ color: 'primary.main' }} 
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {info.text}
                    </Typography>
                  </Box>
                );

                return info.href ? (
                  <Box
                    key={index}
                    component="a"
                    href={info.href}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {content}
                  </Box>
                ) : content;
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* Bottom section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} NH Dinh. All rights reserved.
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5 
            }}
          >
            Made with <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} /> in Vietnam
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;