import React, { useState } from 'react';
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
            const data = await login(values.email, values.password);
            localStorage.setItem('token', data.token);
            setAuthHeader();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logged in successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate('/');
            }, 2000);
            setError('');
        } catch (err) {
            if (err.error && err.error.status === 401) {
                setError('Invalid email or password.');
                setErrors({ apiError: 'Invalid email or password' });
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h5">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <LoginForm onSubmit={handleLogin} />
            </Paper>
        </Container>
    );
};

export default LoginComponent;
