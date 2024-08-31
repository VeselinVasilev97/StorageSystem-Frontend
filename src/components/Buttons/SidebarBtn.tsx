import { NavLink } from 'react-router-dom';
import classes from './SidebarBtn.module.scss'

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
