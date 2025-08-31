import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  School as EducationIcon,
  Work as WorkIcon,
  EmojiEvents as AwardIcon,
  Code as CodeIcon,
  Storage as DatabaseIcon,
  Cloud as CloudIcon,
  Phone as MobileIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
}));

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const experience = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Managing a team of 5 developers.',
      icon: WorkIcon,
      color: '#1976d2'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and mobile apps for various clients using modern frameworks and best practices.',
      icon: WorkIcon,
      color: '#388e3c'
    },
    {
      title: 'Frontend Developer',
      company: 'StartUp Hub',
      period: '2019 - 2020',
      description: 'Built user interfaces for web applications using React, Vue.js, and modern CSS frameworks.',
      icon: WorkIcon,
      color: '#f57c00'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019',
      description: 'Graduated with honors, specialized in Software Engineering and Web Development. GPA: 3.8/4.0',
      icon: EducationIcon,
      color: '#7b1fa2'
    }
  ];

  const skills = [
    {
      category: 'Frontend Development',
      icon: CodeIcon,
      color: '#61DAFB',
      items: [
        { name: 'React', level: 95 },
        { name: 'Vue.js', level: 90 },
        { name: 'Angular', level: 85 },
        { name: 'TypeScript', level: 92 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 95 }
      ]
    },
    {
      category: 'Backend Development',
      icon: DatabaseIcon,
      color: '#68A063',
      items: [
        { name: 'Node.js', level: 93 },
        { name: 'Python', level: 87 },
        { name: 'Java', level: 82 },
        { name: 'Express.js', level: 90 },
        { name: 'NestJS', level: 85 },
        { name: 'Spring Boot', level: 80 }
      ]
    },
    {
      category: 'Database & Cloud',
      icon: CloudIcon,
      color: '#4ECDC4',
      items: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'AWS', level: 85 },
        { name: 'Docker', level: 87 },
        { name: 'Redis', level: 82 },
        { name: 'Firebase', level: 88 }
      ]
    },
    {
      category: 'Mobile Development',
      icon: MobileIcon,
      color: '#FF6B6B',
      items: [
        { name: 'React Native', level: 88 },
        { name: 'Flutter', level: 80 },
        { name: 'Ionic', level: 75 },
        { name: 'Swift', level: 70 },
        { name: 'Kotlin', level: 72 },
        { name: 'Expo', level: 85 }
      ]
    }
  ];

  const achievements = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'React Certified Developer',
    'Scrum Master Certified',
    'Top 1% on Stack Overflow',
    'Open Source Contributor'
  ];

  const languages = [
    { name: 'Vietnamese', level: 100, flag: '🇻🇳' },
    { name: 'English', level: 90, flag: '🇺🇸' },
    { name: 'Japanese', level: 60, flag: '🇯🇵' }
  ];

  const personalValues = [
    'Continuous Learning',
    'Clean Code',
    'Team Collaboration',
    'Innovation',
    'User-Centric Design',
    'Performance Optimization'
  ];

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
            About Me
          </Typography>
          
          <Typography
            variant="h2"
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              color: 'text.primary'
            }}
          >
            Getting to Know{' '}
            <GradientText variant="h2" component="span">
              NH Dinh
            </GradientText>
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Avatar
                  src="/profile-about.jpg"
                  sx={{
                    width: { xs: 200, md: 280 },
                    height: { xs: 200, md: 280 },
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 3,
                  textAlign: 'left'
                }}
              >
                I'm a passionate full-stack developer with over 5 years of experience in creating 
                digital solutions that make a difference. My journey in technology started with a 
                curiosity about how things work, and it has evolved into a deep love for building 
                applications that solve real-world problems.
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 4,
                  textAlign: 'left'
                }}
              >
                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                technologies. When I'm not coding, you can find me contributing to open-source projects, 
                mentoring junior developers, or exploring new technologies.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {personalValues.map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    variant="outlined"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Experience & Education Timeline */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ 
              fontWeight: 700, 
              mb: 6,
              textAlign: 'center',
              color: 'text.primary'
            }}
          >
            My <GradientText variant="h3" component="span">Journey</GradientText>
          </Typography>

          <Timeline position={isMobile ? 'right' : 'alternate'}>
            {[...experience, ...education].map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent
                  sx={{ 
                    m: 'auto 0',
                    display: isMobile ? 'none' : 'block'
                  }}
                  align={index % 2 === 0 ? 'right' : 'left'}
                  variant="body2"
                  color="text.secondary"
                >
                  {item.period}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot
                    sx={{
                      backgroundColor: item.color,
                      p: 1.5,
                    }}
                  >
                    <item.icon sx={{ color: 'white' }} />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                      {item.title || item.degree}
                    </Typography>
                    <Typography color="primary" sx={{ fontWeight: 500 }}>
                      {item.company || item.school}
                    </Typography>
                    {isMobile && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.period}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ 
              fontWeight: 700, 
              mb: 6,
              textAlign: 'center',
              color: 'text.primary'
            }}
          >
            Technical <GradientText variant="h3" component="span">Skills</GradientText>
          </Typography>

          <Grid container spacing={4}>
            {skills.map((skillCategory, index) => (
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
                            backgroundColor: skillCategory.color + '20',
                            color: skillCategory.color,
                            width: 50,
                            height: 50,
                            mr: 2,
                          }}
                        >
                          <skillCategory.icon sx={{ fontSize: 24 }} />
                        </Avatar>
                        
                        <Typography
                          variant="h6"
                          sx={{ 
                            fontWeight: 600,
                            color: 'text.primary'
                          }}
                        >
                          {skillCategory.category}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {skillCategory.items.map((skill, skillIndex) => (
                          <Box key={skillIndex}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {skill.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {skill.level}%
                              </Typography>
                            </Box>
                            <StyledLinearProgress 
                              variant="determinate" 
                              value={skill.level}
                            />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </SkillCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional Info */}
        <Grid container spacing={4}>
          {/* Achievements */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AwardIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Achievements
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {achievements.map((achievement, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        mr: 2,
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Languages */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LanguageIcon sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Languages
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {languages.map((language, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {language.flag} {language.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {language.level}%
                      </Typography>
                    </Box>
                    <StyledLinearProgress 
                      variant="determinate" 
                      value={language.level}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;