import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Typography, CircularProgress, Grid } from '@mui/material';
import GridOffTwoToneIcon from '@mui/icons-material/GridOffTwoTone';
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
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
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
        setFilteredData(result);
      } else if (response.status === 401) {
        navigate('/login');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredData(
      data.filter(
        (product) =>
          product.product_name.toLowerCase().includes(term) ||
          product.product_description.toLowerCase().includes(term)
      )
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: 3 }}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : filteredData.length > 0 ? (
        <Grid container spacing={2}>
          {filteredData.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.product_id}>
              <ProductComponent product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '50vh' }}>
          <GridOffTwoToneIcon sx={{ fontSize: 100 , stroke:'#1976d2',fill:'#dedede'}} />
          <Typography>Product:  <strong>{searchTerm}</strong>  not found.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;