import { useEffect, useState } from 'react';
import classes from './PagesStyle.module.css';
import appConfig from '../../appConfig.json';
import { formatDate } from '../functions/functions';
import SwitchButton from '../components/SwitchButton/SwitchButton';
import Loading from '../components/Loading/Loading';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  last_login: string;
  is_active: string;
}

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

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className={classes.mainContentWrapper}><Loading /></div>;
  }

  if (error) {
    return <div className={classes.mainContentWrapper}>Error: {error}</div>;
  }

  return (
    <div className={classes.mainContentWrapper}>
      <div className={classes.headerDiv}>
      <h1>users</h1>
      </div>
      <div className={classes.usersWrapper}>
        <table className={classes.usersTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>E-mail</th>
              <th>Created</th>
              <th>Last update</th>
              <th>Last login</th>
              <th>ON / OFF</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,i) => (
              <tr key={i}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatDate(user?.created_at)}</td>
                <td>{formatDate(user?.updated_at)}</td>
                <td>{formatDate(user?.last_login)}</td>
                <td>{<SwitchButton  isOn={true} onColor='#0066cc' nameFor={i.toString()} handleToggle={()=>console.log('clicked')}/>}</td>
              </tr>
        ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UsersPage;
