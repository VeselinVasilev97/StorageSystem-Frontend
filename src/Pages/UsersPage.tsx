import { useEffect, useState } from 'react';
import classes from './PagesStyle.module.css';
import appConfig from '../../appConfig.json';

interface User {
  id: number;
  name: string;
}

const fetchUsersData = async (): Promise<User[]> => {
  const { env, ...envUrls } = appConfig.environment;
  const url = envUrls[env as 'LOCAL' | 'PROD'].url;
  const response = await fetch(`${url}/users`,{
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

  useEffect(() => {
    let isMounted = true; 
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsersData();
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    console.log(users);
    
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className={classes.mainContentWrapper}>Loading...</div>;
  }

  if (error) {
    return <div className={classes.mainContentWrapper}>Error: {error}</div>;
  }

  return (
    <div className={classes.mainContentWrapper}>
      <h2>Users</h2>
        {/* {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))} */}
    </div>
  );
};

export default UsersPage;
