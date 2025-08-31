import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Slide,
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as DatabaseIcon,
  Phone as PhoneIcon,
  Cloud as CloudIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Download as DownloadIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 0,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));

const SkillCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
  },
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const skills = [
    { 
      icon: CodeIcon, 
      title: 'Frontend Development', 
      description: 'React, Vue.js, Angular, TypeScript',
      color: '#61DAFB',
      technologies: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js']
    },
    { 
      icon: CloudIcon, 
      title: 'Backend Development', 
      description: 'Node.js, Python, Java, .NET',
      color: '#68A063',
      technologies: ['Node.js', 'Python', 'Java', '.NET', 'Express']
    },
    { 
      icon: PhoneIcon, 
      title: 'Mobile Development', 
      description: 'React Native, Flutter, Ionic',
      color: '#FF6B6B',
      technologies: ['React Native', 'Flutter', 'Ionic', 'Swift', 'Kotlin']
    },
    { 
      icon: DatabaseIcon, 
      title: 'Database & Cloud', 
      description: 'MongoDB, PostgreSQL, AWS, Azure',
      color: '#4ECDC4',
      technologies: ['MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'Docker']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed', icon: StarIcon },
    { number: '3+', label: 'Years Experience', icon: TrendingUpIcon },
    { number: '100%', label: 'Client Satisfaction', icon: StarIcon },
    { number: '24/7', label: 'Support Available', icon: TrendingUpIcon },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={visible} timeout={1000}>
                <Box>
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
                    Welcome to my digital world
                  </Typography>
                  
                  <Typography
                    variant={isMobile ? 'h3' : 'h1'}
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      lineHeight: 1.2
                    }}
                  >
                    Hi, I'm{' '}
                    <GradientText variant={isMobile ? 'h3' : 'h1'} component="span">
                      NH Dinh
                    </GradientText>
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 500, 
                      mb: 3,
                      lineHeight: 1.4
                    }}
                  >
                    Full-Stack Developer & Digital Innovator
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ 
                      mb: 4, 
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      maxWidth: '600px'
                    }}
                  >
                    I create innovative digital solutions that combine beautiful design 
                    with powerful functionality. Passionate about building scalable 
                    applications that make a real difference in people's lives.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                    <Button
                      component={Link}
                      to="/projects"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    >
                      View My Work
                    </Button>
                    
                    <Button
                      href="/resume.pdf"
                      download
                      variant="outlined"
                      size="large"
                      endIcon={<DownloadIcon />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                        }
                      }}
                    >
                      Download CV
                    </Button>
                  </Box>

                  {/* Social Links */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                      href="https://github.com/nhdinhdev03"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    
                    <IconButton
                      href="https://linkedin.com/in/nhdinh"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          backgroundColor: '#0077B5',
                          color: 'white',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={visible} timeout={1200}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    src="/profile-image.jpg"
                    sx={{
                      width: { xs: 250, md: 350 },
                      height: { xs: 250, md: 350 },
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={visible} timeout={1000 + index * 200}>
                  <StatsCard>
                    <stat.icon 
                      sx={{ 
                        fontSize: 40, 
                        color: 'primary.main', 
                        mb: 2 
                      }} 
                    />
                    <Typography
                      variant="h4"
                      sx={{ 
                        fontWeight: 700, 
                        color: 'primary.main', 
                        mb: 1 
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {stat.label}
                    </Typography>
                  </StatsCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              What I Do
            </Typography>
            
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: 'text.primary'
              }}
            >
              My <GradientText variant="h3" component="span">Expertise</GradientText>
            </Typography>
            
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                fontSize: '1.1rem',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              I specialize in creating end-to-end digital solutions with modern technologies
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SkillCard>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                          sx={{
                            backgroundColor: skill.color + '20',
                            color: skill.color,
                            width: 60,
                            height: 60,
                            mr: 2,
                          }}
                        >
                          <skill.icon sx={{ fontSize: 30 }} />
                        </Avatar>
                        
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ 
                              fontWeight: 600, 
                              mb: 1,
                              color: 'text.primary'
                            }}
                          >
                            {skill.title}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6 }}
                          >
                            {skill.description}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {skill.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: skill.color + '20',
                              color: skill.color,
                              fontWeight: 500,
                              '&:hover': {
                                backgroundColor: skill.color + '30',
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </SkillCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: 8, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                color: 'white'
              }}
            >
              Ready to Start Your Project?
            </Typography>
            
            <Typography
              variant="body1"
              sx={{ 
                mb: 4, 
                fontSize: '1.1rem',
                opacity: 0.9,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              Let's work together to bring your ideas to life with cutting-edge technology
            </Typography>

            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              sx={{
                py: 2,
                px: 6,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Let's Talk
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;