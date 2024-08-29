import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from 'features/Register/forms/RegisterForm';
import { register } from 'services/authServices';
import Swal from 'sweetalert2';

const Register = () => {
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      await register(values.name, values.email, values.password, values.password_confirmation);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registration successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login');
    } catch (errors) {
      setFormErrors(errors); 
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
