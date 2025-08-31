import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  useMediaQuery,
  useTheme,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Article as ArticleIcon,
  ContactMail as ContactIcon,
  LightMode,
  DarkMode,
  GitHub,
  LinkedIn,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../../theme/ThemeContext';

// Hide on scroll component
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('md')]: {
    background: 'rgba(255, 255, 255, 0.98)',
  },
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Sour Gummy", "Inter", sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textDecoration: 'none',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: 12,
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  ...(active && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: active 
      ? '0 8px 25px rgba(102, 126, 234, 0.4)' 
      : '0 4px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: active ? undefined : 'rgba(102, 126, 234, 0.1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  padding: 8,
  background: 'rgba(102, 126, 234, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    transform: 'rotate(180deg) scale(1.1)',
  },
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,242,247,0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
  },
}));

const MobileNavItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 12,
  margin: '4px 16px',
  transition: 'all 0.3s ease',
  ...(active && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '& .MuiListItemText-primary': {
      color: 'white',
      fontWeight: 600,
    },
  }),
  '&:hover': {
    background: active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(102, 126, 234, 0.1)',
    transform: 'translateX(8px)',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.1)',
  },
  '&.github:hover': {
    color: '#333',
    background: 'rgba(51, 51, 51, 0.1)',
  },
  '&.linkedin:hover': {
    color: '#0077B5',
    background: 'rgba(0, 119, 181, 0.1)',
  },
}));

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'About', path: '/about', icon: PersonIcon },
    { name: 'Projects', path: '/projects', icon: WorkIcon },
    { name: 'Blog', path: '/blog', icon: ArticleIcon },
    { name: 'Contact', path: '/contact', icon: ContactIcon }
  ];

  const socialLinks = [
    { icon: GitHub, href: 'https://github.com/nhdinhdev03', label: 'GitHub', className: 'github' },
    { icon: LinkedIn, href: 'https://linkedin.com/in/nhdinh', label: 'LinkedIn', className: 'linkedin' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  const renderDesktopNav = () => (
    <Box sx={{ 
      display: { xs: 'none', md: 'flex' }, 
      alignItems: 'center', 
      gap: 1,
      ml: 'auto'
    }}>
      {navItems.map((item) => (
        <NavButton
          key={item.path}
          component={Link}
          to={item.path}
          active={isActive(item.path)}
          startIcon={<item.icon fontSize="small" />}
        >
          {item.name}
        </NavButton>
      ))}
      
      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Social Links */}
        {socialLinks.map((social) => (
          <Tooltip key={social.label} title={social.label} arrow>
            <SocialIconButton
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={social.className}
              size="small"
            >
              <social.icon fontSize="small" />
            </SocialIconButton>
          </Tooltip>
        ))}

        {/* Theme Toggle */}
        <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
          <ThemeToggleButton onClick={toggleTheme} size="small">
            {isDarkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </ThemeToggleButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const renderMobileMenu = () => (
    <MobileDrawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Navigation
          </Typography>
          <IconButton 
            onClick={handleMobileMenuToggle}
            sx={{ 
              borderRadius: 2,
              '&:hover': { 
                background: 'rgba(102, 126, 234, 0.1)',
                transform: 'rotate(90deg)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Navigation Items */}
        <List sx={{ flex: 1, py: 2 }}>
          {navItems.map((item) => (
            <MobileNavItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMenuItemClick}
              active={isActive(item.path)}
              button
            >
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            </MobileNavItem>
          ))}
        </List>

        <Divider />

        {/* Footer Section */}
        <Box sx={{ p: 3 }}>
          {/* Social Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            {socialLinks.map((social) => (
              <SocialIconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={social.className}
              >
                <social.icon />
              </SocialIconButton>
            ))}
          </Box>

          {/* Theme Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isDarkMode ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Typography>
              </Box>
            }
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              m: 0,
              '& .MuiFormControlLabel-label': {
                display: 'flex',
                alignItems: 'center',
              }
            }}
          />
        </Box>
      </Box>
    </MobileDrawer>
  );

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="fixed" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar sx={{ py: 1, minHeight: '70px' }}>
              {/* Logo */}
              <LogoTypography
                variant="h5"
                component={Link}
                to="/"
              >
                NH<Box component="span" sx={{ color: 'primary.main' }}>Dinh</Box>
              </LogoTypography>

              {/* Desktop Navigation */}
              {renderDesktopNav()}

              {/* Mobile Menu Button */}
              <IconButton
                edge="end"
                onClick={handleMobileMenuToggle}
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  ml: 'auto',
                  borderRadius: 2,
                  background: 'rgba(102, 126, 234, 0.1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </HideOnScroll>

      {/* Mobile Menu */}
      {renderMobileMenu()}

      {/* Spacer for fixed AppBar */}
      <Toolbar sx={{ minHeight: '70px' }} />
    </>
  );
};

export default Header;
