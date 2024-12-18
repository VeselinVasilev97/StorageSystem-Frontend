import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '../../types/users';

interface UsersEditProps {
  user: User;
}

const UsersEdit: React.FC<UsersEditProps> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon style={{ color: '#0066cc' }} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '100%', sm: '70%', md: '50%', lg: '40%' },
            bgcolor: 'background.paper',
            border: '1px solid #dedede',
            boxShadow: 24,
            borderRadius: '10px',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Username: {user.username}
          </Typography>
          <Typography variant="subtitle1">Roles:</Typography>
          {user.roles?.map((role) => (
            <Typography key={role.role_id} variant="body2" sx={{ mb: 1 }}>
              {role.role_name}
            </Typography>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default UsersEdit;
