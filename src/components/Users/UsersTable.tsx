import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Switch,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { User, Role } from '../../types/users';
import UsersEdit from '../../components/Users/UsersEdit';

interface UsersTableProps {
  users: User[];
  isMobile: boolean;
  availableRoles: Role[]; // Add availableRoles as a prop
}

const UsersTable: React.FC<UsersTableProps> = ({ users, isMobile, availableRoles }) => {
  return isMobile ? (
    <Grid container spacing={2}>
      {users.map((user) => (
        <MobileRow key={user.id} user={user} availableRoles={availableRoles} />
      ))}
    </Grid>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>ON / OFF</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <DesktopRow key={user.id} user={user} availableRoles={availableRoles} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const DesktopRow: React.FC<{ user: User; availableRoles: Role[] }> = ({ user, availableRoles }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(user.updated_at).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(user.last_login).toLocaleDateString()}</TableCell>
        <TableCell>
          <Switch
            checked={user.is_active}
            onChange={() => console.log(`Toggle user ${user.id}`)}
            color="primary"
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Details
              </Typography>
              <UsersEdit
                user={user}
                availableRoles={availableRoles}
                onSave={(updatedUser) => console.log('Updated user:', updatedUser)}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const MobileRow: React.FC<{ user: User; availableRoles: Role[] }> = ({ user, availableRoles }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">{user.username}</Typography>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography>Email: {user.email}</Typography>
          <Typography>Created: {new Date(user.created_at).toLocaleDateString()}</Typography>
          <Typography>Last Update: {new Date(user.updated_at).toLocaleDateString()}</Typography>
          <Typography>Last Login: {new Date(user.last_login).toLocaleDateString()}</Typography>
          <Typography>ON / OFF:</Typography>
          <Switch
            checked={user.is_active}
            onChange={() => console.log(`Toggle user ${user.id}`)}
            color="primary"
          />
          <Box mt={2}>
            <UsersEdit
              user={user}
              availableRoles={availableRoles}
              onSave={(updatedUser) => console.log('Updated user:', updatedUser)}
            />
          </Box>
        </Collapse>
      </Paper>
    </Grid>
  );
};

export default UsersTable;
