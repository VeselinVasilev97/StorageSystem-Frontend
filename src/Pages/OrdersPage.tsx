import classes from './PagesStyle.module.css';
import appConfig from '../../appConfig.json';
import { useEffect, useState } from 'react';
import SingleOrderComponent from '../components/SingleOrder/SingleOrderComponentProps';

interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  order_status: string;
  total_amount: number;
}

const OrdersPage = () => {
  const [data, setData] = useState<Order[]>([]);

  const getData = async () => {
    const url = appConfig.environment[appConfig.environment.env as 'LOCAL' | 'PROD'].url;
    try {
      const response = await fetch(`${url}/orders`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.authToken}`,
        },
      });

      if (response.ok) {
        const result: Order[] = await response.json();
        setData(result);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.mainContentWrapper}>

      <div className={classes.componentsWrapper}>
        {data.length > 0 ? (
          data.map((order, index) => (
            <SingleOrderComponent key={index} order={order}/>
          ))
        ) : (
          <p>NO DATA</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
