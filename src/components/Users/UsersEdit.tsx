import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { User, Role } from '../../types/users';

interface UsersEditProps {
  user: User;
  availableRoles: Role[]; // List of all possible roles
  onSave: (updatedUser: User) => void; // Callback to save changes
}

const UsersEdit: React.FC<UsersEditProps> = ({ user, availableRoles, onSave }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState<Role[]>(user.roles || []);
  const [newRole, setNewRole] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddRole = () => {
    if (newRole) {
      const roleToAdd = availableRoles.find((role) => role.role_name === newRole);
      if (roleToAdd && !roles.some((r) => r.role_id === roleToAdd.role_id)) {
        setRoles((prev) => [...prev, roleToAdd]);
        setNewRole('');
      }
    }
  };

  const handleRemoveRole = (roleId: number) => {
    setRoles((prev) => prev.filter((role) => role.role_id !== roleId));
  };

  const handleSave = () => {
    const updatedUser: User = { ...user, email, roles };
    onSave(updatedUser);
    handleClose();
  };

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
            Edit User: {user.username}
          </Typography>

          {/* Email Field */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Email:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Roles Section */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Roles:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {roles.map((role) => (
              <Chip
                key={role.role_id}
                label={role.role_name}
                onDelete={() => handleRemoveRole(role.role_id)}
                color="primary"
              />
            ))}
          </Box>

          {/* Add Role Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              select
              label="Add Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              sx={{ flexGrow: 1 }}
            >
              {availableRoles
                .filter((role) => !roles.some((r) => r.role_id === role.role_id))
                .map((role) => (
                  <MenuItem key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleAddRole}>
              Add Role
            </Button>
          </Box>

          {/* Save and Cancel Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersEdit;
