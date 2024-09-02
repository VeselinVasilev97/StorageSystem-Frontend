import { NavLink } from 'react-router-dom';
import classes from './SidebarBtn.module.css'

type ButtonTypes = {
    value: string;
    path: string;
    onClick:React.MouseEventHandler<HTMLAnchorElement>;
};

const SidebarBtn = ({ value,path,onClick }: ButtonTypes) => {
    return (
        <NavLink to={path} onClick={onClick} className={classes.btnStyle}>{value}</NavLink>
    )
}

export default SidebarBtn;
