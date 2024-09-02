import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from 'features/Login/Form/Login';
import { login, setAuthHeader } from 'services/authServices';
import Swal from 'sweetalert2';

const LoginComponent = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("Attempting login with:", values);
      const data = await login(values.email, values.password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      setAuthHeader();

      const userRole = data.user.role; 
      localStorage.setItem('userRole', userRole); 

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        console.log("Redirecting to /home");
        navigate('/home', { state: { role: userRole } });
      }, 1500);

      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
      setErrors({ apiError: err.message || 'Login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Login</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Container>
  );
};

export default LoginComponent;
