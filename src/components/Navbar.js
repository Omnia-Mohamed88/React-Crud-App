import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Home as HomeIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from 'services/authServices'; 

const Navbar = () => {
  const navigate = useNavigate();
  const auth = isAuthenticated(); 

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My E-Commerce
        </Typography>
        <IconButton color="inherit" component={Link} to="/">
          <HomeIcon />
        </IconButton>
        {!auth ? (
          <IconButton color="inherit" component={Link} to="/login">
            <LoginIcon />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
