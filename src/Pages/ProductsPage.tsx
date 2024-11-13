import { useEffect, useState, useCallback } from 'react';
import classes from './PagesStyle.module.css';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../appConfig.json';
import ProductComponent from '../components/ProductComponent/ProductComponent';

interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  category_id: number;
  quantity_in_stock: number;
  price: number;
  supplier_id: number;
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const { env, ...envUrls } = appConfig.environment;
    const url = envUrls[env as 'LOCAL' | 'PROD'].url;

    try {
      const response = await fetch(`${url}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.authToken || ''}`,
        },
      });
      if (response.status === 200) {
        const result: Product[] = await response.json();
        setData(result);
      } else if (response.status === 401) {
        navigate('/login');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.mainContentWrapper}>
      <div className={classes.componentsWrapper}>
        {error ? (
          <p>Error: {error}</p>
        ) : data.length > 0 ? (
          data.map((product) => (
            <ProductComponent key={product.product_id} product={product} />
          ))
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
