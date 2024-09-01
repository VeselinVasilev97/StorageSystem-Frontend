import { NavLink } from 'react-router-dom';
import classes from './SidebarBtn.module.css'

type ButtonTypes = {
    value: string;
    path: string;
};

const SidebarBtn = ({ value,path }: ButtonTypes) => {
    return (
        <NavLink to={path} className={classes.btnStyle}>{value}</NavLink>
    )
}

export default SidebarBtn;
