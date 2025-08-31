import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './User/Header/Header';
import SimpleFooter from '../components/SimpleFooter';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, pt: 2 }}>
        <Outlet />
      </Box>
      <SimpleFooter />
    </Box>
  );
};

export default Layout;