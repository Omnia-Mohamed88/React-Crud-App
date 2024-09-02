import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from 'features/Registeration/forms/RegisterForm';
import { register } from 'services/authServices';
import Swal from 'sweetalert2';

const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await register(values);  
      const { token, user } = response; 

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      setFormErrors(error.errors || {});

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'An error occurred during registration.',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Register</Typography>
        <RegisterForm onSubmit={handleRegister} formErrors={formErrors} />
      </Paper>
    </Container>
  );
};

export default Register;
