// src/features/reset_password/components/ResetPasswordComponent.js

import React from 'react';
import { Container, Paper, Typography } from '@mui/material';
import ResetPasswordForm from 'features/reset_password/forms/ResetPasswordForm'; 
import { resetPassword } from 'services/authServices';
import Swal from 'sweetalert2';

const ResetPasswordComponent = ({ token }) => {
  const handleResetPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await resetPassword(values.email, values.password, values.password_confirmation, token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.message || 'Password has been reset',
      });
    } catch (err) {
      setErrors({ apiError: err.message || 'An error occurred' });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'An error occurred',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Reset Password</Typography>
        <ResetPasswordForm onSubmit={handleResetPassword} />
      </Paper>
    </Container>
  );
};

export default ResetPasswordComponent;
