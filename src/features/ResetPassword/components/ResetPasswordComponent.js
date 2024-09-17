import { useLocation, useNavigate } from 'react-router-dom'; 
import { Container, Paper, Typography } from '@mui/material';
import ResetPasswordForm from 'features/ResetPassword/forms/ResetPasswordForm'; 
import axios from 'api/axios'; 
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const ResetPasswordComponent = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 
  const navigate = useNavigate();
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post('/password/verify-token', { token });
        
        if (response.status === 200) {
          setTokenIsValid(true); 
        } else {
          navigate('/login'); 
        }
      } catch (err) {
        navigate('/login'); 
      }
    };

    if (token) {
      validateToken();
    } else {
      navigate('/login'); // No token found, redirect to login
    }
  }, [token, navigate]);

  // Handle reset password
  const handleResetPassword = async (email, password, password_confirmation) => {
    try {
      const response = await axios.post('/new-password/reset', {
        email,
        password,
        password_confirmation,
        token, 
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message || 'Password has been reset',
      });
      navigate('/login'); // Redirect to login after successful password reset
    } catch (err) {
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
        {tokenIsValid ? (
          <ResetPasswordForm onSubmit={handleResetPassword} token={token} />
        ) : (
          <Typography variant="body1">Validating token...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPasswordComponent;
