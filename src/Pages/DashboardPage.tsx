import classes from './PagesStyle.module.css';
import appConfig from '../../appConfig.json';
import { useEffect, useState, useCallback } from 'react';
// import { formatPrices } from '../functions/functions';
import SingleOrderComponent from '../components/SingleOrder/SingleOrderComponentProps';

interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  order_status: string;
  total_amount: number;
}

const DashboardPage = () => {
  const [data, setData] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { env, ...envUrls } = appConfig.environment;
    const url = envUrls[env as 'LOCAL' | 'PROD'].url;

    try {
      const response = await fetch(`${url}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.authToken || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result: Order[] = await response.json();
      
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.mainContentWrapper}>
      <div className={classes.componentsWrapper}>
        {error ? (
          <p>Error: {error}</p>
        ) : data.length > 0 ? (
          data.map((order) => (
            <SingleOrderComponent key={order.order_id} order={order} />
            // <p>{formatPrices(10543)}</p>
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
