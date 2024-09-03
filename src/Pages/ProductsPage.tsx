import { useEffect, useState } from 'react';
import classes from './PagesStyle.module.css';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../appConfig.json';
import ProductComponent from '../components/ProductComponent/ProductComponent';

const ProductsPage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([]);

    const getData = async () => {
        const url = appConfig.environment[appConfig.environment.env as 'LOCAL' | 'PROD'].url;
        await fetch(`${url}/get-products`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.authToken
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 401) {
                    navigate("/login");
                } else {
                    return false
                }
            })
            .then(result => {
                if (result) {
                    setData(result)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className={classes.mainContentWrapper}>
            <div className={classes.componentsWrapper}>

                {
                    data.length > 0 ?
                        data.map((row, i) => (
                            <ProductComponent key={i} product={row} />
                        ))
                        :
                        <p>NO DATA</p>
                }
            </div>
        </div>
    );
}

export default ProductsPage;
