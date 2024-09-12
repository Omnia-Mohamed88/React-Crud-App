import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Home as HomeIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UseAuth from 'hooks/UseAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = UseAuth(); 

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('role_id');
    Cookies.remove('role_name');

    setAuth({
      token: null,
      roles: [],
      isAuth: false,
    });

    navigate("/login");
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
        {!auth?.isAuth ? ( 
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
