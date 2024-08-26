import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>403 - Forbidden</h1>
            <p style={styles.message}>You do not have permission to view this page.</p>
            <Link to="/" style={styles.link}>Go to Home</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '20px',
    },
    link: {
        fontSize: '1rem',
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Unauthorized;
