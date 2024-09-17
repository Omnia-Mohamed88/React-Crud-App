import { useLocation, useNavigate } from 'react-router-dom'; 
import { Container, Paper, Typography, Alert } from '@mui/material';
import ResetPasswordForm from 'features/ResetPassword/forms/ResetPasswordForm'; 
import axios from 'api/axios'; 
import { useEffect, useState } from 'react';
import ServerSideValidationMessagesWrapper from 'components/ServerSideValidationMessagesWrapper';

const ResetPasswordComponent = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 
  const navigate = useNavigate();
  
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverSideErrors, setServerSideErrors] = useState(""); 

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.post('/password/verify-token', { token });
        if (response.status === 200) {
          setTokenIsValid(true); 
          setError(null); 
        } else {
          setTokenIsValid(false);
          navigate('/login'); 
        }
      } catch (err) {
        if (err.response?.status === 422) {
          setError('The token is invalid or has expired.');
        } else {
          setError('An error occurred while validating the token.');
        }
        setTokenIsValid(false);
        navigate('/login'); 
      }
    };

    if (token) {
      validateToken();
    } else {
      navigate('/login'); 
    }
  }, [token, navigate]);

  const handleResetPassword = async (password, password_confirmation, token) => {
    setServerSideErrors(""); 
    try {
      const response = await axios.post('/new-password/reset', {
        password,
        password_confirmation,
        token, 
      });
      setSuccessMessage(response.data.message || 'Password has been reset');
      setError(null); 
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 422) {
        setServerSideErrors(err.response.data.errors); 
      } else if (err.response?.status === 400) {
        setError('The request could not be processed.');
      } else {
        setError('An error occurred during the reset process.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h5">Reset Password</Typography>
        
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        
        <ServerSideValidationMessagesWrapper error={serverSideErrors} /> 
        
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
