import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import classes from './ProductComponent.module.css';

interface Product {
    product_id: number;
    product_name: string;
    product_description: string;
    category_id: number;
    quantity_in_stock: number;
    price: number;
    supplier_id: number;
}

interface SingleProductProp {
    product: Product;
}

const ProductComponent: React.FC<SingleProductProp> = ({ product }) => {
    const handleAddToCart = () => {
        console.log(`Product ${product.product_id} added to cart`);
    };

    return (
        <Card className={classes.productWrapper}>
            <CardMedia
                component="img"
                height="200"
                image={`https://via.placeholder.com/300?text=Product+${product.product_id}`}
                alt={product.product_name}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.product_description}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">
                        Category: {product.category_id}
                    </Typography>
                    <Typography variant="body2">
                        Quantity in Stock: {product.quantity_in_stock}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductComponent;
