import React from 'react';
import { Modal, Button, Typography } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: '16px', background: 'white', margin: 'auto', marginTop: '10%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" style={{ margin: '16px 0' }}>{message}</Typography>
        <Button onClick={onClose} variant="outlined" color="secondary" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="primary">Confirm</Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
