import classes from './SingleOrderComponentProps.module.css';
import { formatDate } from '../../functions/dateAndTime';

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
        <div className={classes.orderWrapper}>
            <div className={classes.orderHeaderInfo}>
                <p>{order.customer_id}</p>
                <p>{formatDate(order.order_date)}</p>
            </div>
            <div className={classes.orderHeaderInfo}>
                <p>order id:</p>{order.order_id}
            </div>
            <div className={classes.orderHeaderInfo}>
                <p>customer id:</p>{order.customer_id}
            </div>
            <div className={classes.totalAmount}>
            <p>Total:</p>{order.total_amount} $
            </div>
        </div>
    );
};

export default SingleOrderComponent;
