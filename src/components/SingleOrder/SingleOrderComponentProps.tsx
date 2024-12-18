import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import { formatDate } from '../../functions/functions';

interface Order {
    order_id: number;
    customer_id: number;
    order_date: string;
    order_status: string;
    total_amount: number;
}

interface SingleOrderComponentProps {
    order: Order;
}

const SingleOrderComponent: React.FC<SingleOrderComponentProps> = ({ order }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/300?text=Order+${order.order_id}`}
                alt="Order Image"
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Customer ID:
                        </Typography>
                        <Typography variant="body1">{order.customer_id}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Order Date:
                        </Typography>
                        <Typography variant="body1">{formatDate(order.order_date)}</Typography>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant="subtitle1" color="textSecondary">
                        Order ID:
                    </Typography>
                    <Typography variant="body1">{order.order_id}</Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="subtitle1" color="textSecondary">
                        Total Amount:
                    </Typography>
                    <Typography variant="body1">{order.total_amount} $</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SingleOrderComponent;
