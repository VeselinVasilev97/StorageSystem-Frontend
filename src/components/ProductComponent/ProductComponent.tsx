import classes from './ProductComponent.module.css'

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

    return (
        <div className={classes.productWrapper}>
            <div className={classes.productInfoHeader}>
                <p>Category:{product.category_id}</p>
                <p>ProductID:{product.product_id}</p>
            </div>
            <div className={classes.productInfoHeader}>
                <p>NAME:</p>
                {product.product_name}
            </div>
            <div className={classes.productInfoHeader}>
                <p>Description:</p>
                {product.product_description}
            </div>
            <div className={classes.productInfoHeader}>
                <p>Quantity:</p>
                {product.quantity_in_stock}
            </div>
            <div className={classes.productInfoHeader}>
                <p>Price:</p>
                <strong>{product.price} $</strong> 
            </div>
        </div>
    )
}

export default ProductComponent