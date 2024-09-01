import classes from './SingleOrderComponentProps.module.css';

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
                <p>{order.order_date}</p>
            </div>
            <div>
                {order.customer_id}
            </div>
            <div>
                {order.customer_id}
            </div>
            <div>
                {order.customer_id}
            </div>
        </div>
    );
};

export default SingleOrderComponent;
