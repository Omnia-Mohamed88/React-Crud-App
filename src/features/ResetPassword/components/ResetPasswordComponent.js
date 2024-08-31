// src/features/reset_password/components/ResetPasswordComponent.js

import React from 'react';
import { useParams } from 'react-router-dom'; 
import { Container, Paper, Typography } from '@mui/material';
import ResetPasswordForm from 'features/ResetPassword/forms/ResetPasswordForm'; 
import { resetPassword } from 'services/authServices';
import Swal from 'sweetalert2';
const ResetPasswordComponent = ({ token }) => {
  const handleResetPassword = async (email, password, password_confirmation, token) => {
    console.log('Token in handleResetPassword:', token); 
    try {
      const response = await resetPassword(email, password, password_confirmation, token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.message || 'Password has been reset',
      });
    } catch (err) {
      console.error('Error during password reset:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'An error occurred',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Reset Password</Typography>
        <ResetPasswordForm onSubmit={handleResetPassword} token={token} />
      </Paper>
    </Container>
  );
};

export default ResetPasswordComponent;
