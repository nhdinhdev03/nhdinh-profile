import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Avatar,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Web as WebIcon,
  Phone as PhoneIcon,
  Cloud as CloudIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
}));

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const Projects = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = ['All', 'Web Development', 'Mobile Apps', 'Full-Stack', 'UI/UX Design'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Full-Stack',
      description: 'Modern e-commerce platform with React, Node.js, and MongoDB. Features include real-time inventory, payment processing, and admin dashboard.',
      longDescription: 'A comprehensive e-commerce platform built with modern technologies. Features include user authentication, product management, shopping cart, payment integration with Stripe, order tracking, admin dashboard with analytics, and responsive design for all devices.',
      image: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/nhdinhdev03/ecommerce',
      featured: true,
      rating: 5,
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'Web Development',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      longDescription: 'A comprehensive task management solution designed for teams. Features include project organization, task assignment, real-time collaboration, file attachments, time tracking, progress analytics, and integration with popular tools like Slack and Google Drive.',
      image: '/projects/taskmanager.jpg',
      technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify', 'Socket.io'],
      liveUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/nhdinhdev03/taskmanager',
      featured: true,
      rating: 5,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Weather Mobile App',
      category: 'Mobile Apps',
      description: 'Cross-platform weather application with location-based forecasts, interactive maps, and customizable notifications.',
      longDescription: 'A feature-rich weather application providing accurate forecasts and weather information. Includes GPS location detection, 7-day forecasts, weather maps, severe weather alerts, customizable widgets, and offline caching for reliable access.',
      image: '/projects/weather.jpg',
      technologies: ['React Native', 'TypeScript', 'Redux', 'OpenWeather API', 'Maps'],
      liveUrl: 'https://apps.apple.com/weather-app',
      githubUrl: 'https://github.com/nhdinhdev03/weather-app',
      featured: false,
      rating: 4,
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Portfolio Dashboard',
      category: 'UI/UX Design',
      description: 'Modern dashboard interface for portfolio management with data visualization and analytics.',
      longDescription: 'An elegant dashboard design for investment portfolio management. Features include interactive charts, performance analytics, asset allocation visualization, market trends, and responsive design optimized for both desktop and mobile use.',
      image: '/projects/dashboard.jpg',
      technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision'],
      liveUrl: 'https://portfolio-dashboard-demo.com',
      githubUrl: null,
      featured: false,
      rating: 4,
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'Full-Stack',
      description: 'Social networking platform with real-time messaging, content sharing, and community features.',
      longDescription: 'A complete social media platform with modern features. Includes user profiles, posts and media sharing, real-time messaging, friend connections, groups and communities, content moderation, and advanced privacy controls.',
      image: '/projects/social.jpg',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Socket.io', 'AWS S3', 'Redis'],
      liveUrl: 'https://social-platform-demo.com',
      githubUrl: 'https://github.com/nhdinhdev03/social-platform',
      featured: true,
      rating: 5,
      status: 'In Progress'
    },
    {
      id: 6,
      title: 'Learning Management System',
      category: 'Web Development',
      description: 'Educational platform with course management, video streaming, and progress tracking.',
      longDescription: 'A comprehensive learning management system for educational institutions. Features include course creation and management, video lectures with streaming, student progress tracking, assignments and quizzes, grade management, and interactive learning tools.',
      image: '/projects/lms.jpg',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'WebRTC', 'Docker'],
      liveUrl: 'https://lms-demo.com',
      githubUrl: 'https://github.com/nhdinhdev03/lms',
      featured: false,
      rating: 4,
      status: 'Completed'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <WebIcon />;
      case 'Mobile Apps':
        return <PhoneIcon />;
      case 'Full-Stack':
        return <CloudIcon />;
      case 'UI/UX Design':
        return <CodeIcon />;
      default:
        return <StarIcon />;
    }
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
            My Portfolio
          </Typography>
          
          <Typography
            variant="h2"
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              color: 'text.primary'
            }}
          >
            Featured <GradientText variant="h2" component="span">Projects</GradientText>
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
            Here's a collection of my recent work showcasing various technologies and design approaches. 
            Each project represents a unique challenge and learning experience.
          </Typography>
        </Box>

        {/* Featured Projects */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              color: 'text.primary',
              textAlign: 'center'
            }}
          >
            🌟 Featured Projects
          </Typography>
          
          <Grid container spacing={4}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard>
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image || '/placeholder-project.jpg'}
                      alt={project.title}
                      sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                    
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary',
                            flex: 1
                          }}
                        >
                          {project.title}
                        </Typography>
                        
                        <Chip
                          size="small"
                          label={project.status}
                          color={project.status === 'Completed' ? 'success' : 'warning'}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.75rem',
                              borderColor: 'primary.main',
                              color: 'primary.main',
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.75rem',
                              borderColor: 'grey.400',
                              color: 'grey.600',
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: 16,
                              color: i < project.rating ? '#ffd700' : '#e0e0e0',
                            }}
                          />
                        ))}
                        <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({project.rating}/5)
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 3, pb: 3 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleProjectClick(project)}
                        sx={{ mr: 1 }}
                      >
                        View Details
                      </Button>
                      
                      {project.liveUrl && (
                        <IconButton
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: 'primary.main' }}
                        >
                          <LaunchIcon fontSize="small" />
                        </IconButton>
                      )}
                      
                      {project.githubUrl && (
                        <IconButton
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: 'text.secondary' }}
                        >
                          <GitHubIcon fontSize="small" />
                        </IconButton>
                      )}
                    </CardActions>
                  </ProjectCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* All Projects with Filter */}
        <Box>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 600, 
              mb: 4,
              color: 'text.primary',
              textAlign: 'center'
            }}
          >
            All Projects
          </Typography>

          {/* Category Filter */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              gap: 1,
              p: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              {categories.map((category) => (
                <CategoryChip
                  key={category}
                  label={category}
                  selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  icon={getCategoryIcon(category)}
                />
              ))}
            </Box>
          </Box>

          {/* Projects Grid */}
          <Grid container spacing={4}>
            {filteredProjects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard>
                    <CardMedia
                      component="img"
                      height="180"
                      image={project.image || '/placeholder-project.jpg'}
                      alt={project.title}
                    />
                    
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                          {project.title}
                        </Typography>
                        
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            backgroundColor: 'primary.main',
                            ml: 1
                          }}
                        >
                          {getCategoryIcon(project.category)}
                        </Avatar>
                      </Box>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.7rem',
                              height: 24,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleProjectClick(project)}
                      >
                        Learn More
                      </Button>
                      
                      <Box>
                        {project.liveUrl && (
                          <IconButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        )}
                        
                        {project.githubUrl && (
                          <IconButton
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </CardActions>
                  </ProjectCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Project Detail Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
        >
          {selectedProject && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {selectedProject.title}
                  </Typography>
                  <IconButton onClick={handleCloseDialog}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              
              <DialogContent>
                <Box sx={{ mb: 3 }}>
                  <img
                    src={selectedProject.image || '/placeholder-project.jpg'}
                    alt={selectedProject.title}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                  />
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                  {selectedProject.longDescription}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Technologies Used:
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {selectedProject.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Rating:
                  </Typography>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{
                        fontSize: 20,
                        color: i < selectedProject.rating ? '#ffd700' : '#e0e0e0',
                      }}
                    />
                  ))}
                </Box>
              </DialogContent>
              
              <DialogActions sx={{ p: 3 }}>
                {selectedProject.liveUrl && (
                  <Button
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<LaunchIcon />}
                  >
                    View Live
                  </Button>
                )}
                
                {selectedProject.githubUrl && (
                  <Button
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                  >
                    View Code
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Projects;
