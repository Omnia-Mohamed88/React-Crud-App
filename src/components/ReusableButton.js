import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReusableButton = ({ label, to, variant = 'contained', color = 'primary' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      color={color}
      style={{ marginBottom: '16px' }}
    >
      {label}
    </Button>
  );
};

export default ReusableButton;
