import { useEffect, useState } from 'react';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { User } from '../types/users';
import UsersEdit from '../components/Users/UsersEdit';
import appConfig from '../../appConfig.json';

const fetchUsersData = async (): Promise<User[]> => {
  const { env, ...envUrls } = appConfig.environment;
  const url = envUrls[env as 'LOCAL' | 'PROD'].url;
  const response = await fetch(`${url}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.authToken || ''}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect tablet and smaller screens

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsersData();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" mb={4}>
        Users
      </Typography>
      {isMobile ? (
        <Grid container spacing={2}>
          {users.map((user) => (
            <MobileRow key={user.id} user={user} />
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
                <DesktopRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const DesktopRow: React.FC<{ user: User }> = ({ user }) => {
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
              <UsersEdit user={user} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const MobileRow: React.FC<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap="20px">
            <Box width="100px" display="flex" alignItems="center">
              <Typography variant="h6">{user.username}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography>Email: {user.email}</Typography>
            </Box>
          </Box>

          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
            <UsersEdit user={user} />
          </Box>
        </Collapse>
      </Paper>
    </Grid>
  );
};

export default UsersPage;
