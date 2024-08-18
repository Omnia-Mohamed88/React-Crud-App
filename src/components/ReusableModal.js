import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReusableModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box id="modal-description">
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default ReusableModal;
