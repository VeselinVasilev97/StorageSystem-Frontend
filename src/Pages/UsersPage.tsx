import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { User, Role } from '../types/users';
import UsersTable from '../components/Users/UsersTable';
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

const fetchAvailableRoles = async (): Promise<Role[]> => {

  
  return [
    { role_id: 1, role_name: 'USER',created_at:"2024-10-21 21:04:05.953314+00" },
    { role_id: 5, role_name: 'ADMIN',created_at:"2024-10-21 21:04:05.953314+00" },
    { role_id: 6, role_name: '"testasd"' ,created_at:"2024-10-21 21:04:05.953314+00"},
  ];
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersData, rolesData] = await Promise.all([
          fetchUsersData(),
          fetchAvailableRoles(),
        ]);
        setUsers(usersData);
        setAvailableRoles(rolesData);
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
      <UsersTable users={users} isMobile={isMobile} availableRoles={availableRoles} />
    </Box>
  );
};

export default UsersPage;
