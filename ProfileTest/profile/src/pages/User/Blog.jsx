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
  Avatar,
  TextField,
  InputAdornment,
  Pagination,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Visibility as ViewIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  TrendingUp as TrendingIcon,
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

const BlogCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
}));

const FeaturedCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '400px',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
    zIndex: 1,
  },
}));

const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const Blog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    { name: 'All', icon: null, count: 12 },
    { name: 'Web Development', icon: WebIcon, count: 5 },
    { name: 'Mobile Development', icon: PhoneIcon, count: 3 },
    { name: 'Cloud & DevOps', icon: CloudIcon, count: 2 },
    { name: 'Programming', icon: CodeIcon, count: 2 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications with TypeScript',
      excerpt: 'Learn how to structure large React applications using TypeScript for better maintainability and developer experience.',
      content: 'In this comprehensive guide, we\'ll explore the best practices for building scalable React applications...',
      image: '/blog/react-typescript.jpg',
      category: 'Web Development',
      author: 'NH Dinh',
      publishDate: '2024-01-15',
      readTime: '8 min read',
      views: 1250,
      comments: 23,
      tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
      featured: true,
    },
    {
      id: 2,
      title: 'Mastering Node.js Performance Optimization',
      excerpt: 'Discover advanced techniques to optimize your Node.js applications for maximum performance and efficiency.',
      content: 'Performance optimization is crucial for Node.js applications. Here are the key strategies...',
      image: '/blog/nodejs-performance.jpg',
      category: 'Web Development',
      author: 'NH Dinh',
      publishDate: '2024-01-10',
      readTime: '12 min read',
      views: 980,
      comments: 17,
      tags: ['Node.js', 'Performance', 'Backend', 'JavaScript'],
      featured: true,
    },
    {
      id: 3,
      title: 'Introduction to React Native Development',
      excerpt: 'Get started with React Native and learn how to build cross-platform mobile applications efficiently.',
      content: 'React Native allows you to build mobile apps using React. Let\'s dive into the fundamentals...',
      image: '/blog/react-native.jpg',
      category: 'Mobile Development',
      author: 'NH Dinh',
      publishDate: '2024-01-05',
      readTime: '10 min read',
      views: 750,
      comments: 12,
      tags: ['React Native', 'Mobile', 'iOS', 'Android'],
      featured: false,
    },
    {
      id: 4,
      title: 'Docker and Kubernetes for Modern Development',
      excerpt: 'Learn how to containerize your applications and orchestrate them using Docker and Kubernetes.',
      content: 'Containerization has revolutionized modern software development. Here\'s how to get started...',
      image: '/blog/docker-kubernetes.jpg',
      category: 'Cloud & DevOps',
      author: 'NH Dinh',
      publishDate: '2023-12-28',
      readTime: '15 min read',
      views: 1100,
      comments: 31,
      tags: ['Docker', 'Kubernetes', 'DevOps', 'Cloud'],
      featured: false,
    },
    {
      id: 5,
      title: 'Advanced JavaScript Patterns and Techniques',
      excerpt: 'Explore advanced JavaScript patterns that will make you a more effective developer.',
      content: 'JavaScript is a powerful language with many patterns and techniques. Let\'s explore the advanced ones...',
      image: '/blog/javascript-patterns.jpg',
      category: 'Programming',
      author: 'NH Dinh',
      publishDate: '2023-12-20',
      readTime: '9 min read',
      views: 650,
      comments: 8,
      tags: ['JavaScript', 'Patterns', 'Programming', 'ES6'],
      featured: false,
    },
    {
      id: 6,
      title: 'Building RESTful APIs with Express.js',
      excerpt: 'Learn how to create robust and scalable RESTful APIs using Express.js and best practices.',
      content: 'Building APIs is a fundamental skill for backend developers. Here\'s how to do it right...',
      image: '/blog/express-api.jpg',
      category: 'Web Development',
      author: 'NH Dinh',
      publishDate: '2023-12-15',
      readTime: '11 min read',
      views: 920,
      comments: 19,
      tags: ['Express.js', 'API', 'Node.js', 'Backend'],
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.icon ? <category.icon fontSize="small" /> : null;
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
            My Blog
          </Typography>
          
          <Typography
            variant="h2"
            sx={{ 
              fontWeight: 700, 
              mb: 4,
              color: 'text.primary'
            }}
          >
            Thoughts & <GradientText variant="h2" component="span">Insights</GradientText>
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
            Welcome to my tech blog where I share insights, tutorials, and experiences 
            from my journey in software development and technology.
          </Typography>
        </Box>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <Box sx={{ mb: 8 }}>
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
              <TrendingIcon sx={{ mr: 2, color: 'primary.main' }} />
              Featured Posts
            </Typography>
            
            <Grid container spacing={4}>
              {featuredPosts.map((post, index) => (
                <Grid item xs={12} md={6} key={post.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FeaturedCard>
                      <CardMedia
                        component="img"
                        height="400"
                        image={post.image || '/blog-placeholder.jpg'}
                        alt={post.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 3,
                          color: 'white',
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            mb: 2,
                          }}
                        />
                        
                        <Typography
                          variant="h5"
                          sx={{ 
                            fontWeight: 600, 
                            mb: 2,
                            color: 'white'
                          }}
                        >
                          {post.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          sx={{ 
                            mb: 2,
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.6
                          }}
                        >
                          {post.excerpt}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="caption">
                              {formatDate(post.publishDate)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ViewIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="caption">
                              {post.views} views
                            </Typography>
                          </Box>
                          
                          <Typography variant="caption">
                            {post.readTime}
                          </Typography>
                        </Box>
                      </Box>
                    </FeaturedCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {categories.map((category) => (
                  <CategoryChip
                    key={category.name}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {category.icon && <category.icon fontSize="small" />}
                        {category.name} ({category.count})
                      </Box>
                    }
                    selected={selectedCategory === category.name}
                    onClick={() => setSelectedCategory(category.name)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {currentPosts.map((post, index) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image || '/blog-placeholder.jpg'}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={post.category}
                        size="small"
                        icon={getCategoryIcon(post.category)}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          mr: 'auto',
                        }}
                      />
                      
                      <Typography variant="caption" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </Box>
                    
                    <Typography
                      variant="h6"
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        color: 'text.primary',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ 
                        mb: 3, 
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          mr: 1,
                          backgroundColor: 'primary.main'
                        }}
                      >
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {post.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(post.publishDate)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
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
                    <Button variant="contained" size="small">
                      Read More
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ViewIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.views}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CommentIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.comments}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActions>
                </BlogCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No articles found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search terms or filters.
            </Typography>
          </Box>
        )}

        {/* Newsletter Subscription */}
        <Box
          sx={{
            mt: 12,
            p: 6,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Stay Updated
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe to my newsletter and get the latest articles delivered to your inbox.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            maxWidth: 400, 
            mx: 'auto',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                px: 3,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Blog;
