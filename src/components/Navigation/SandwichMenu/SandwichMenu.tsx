import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './SandwichMenu.module.css'
import logoutSvg from '../../../assets/logoutIcon.svg'
import SidebarBtn from '../../Buttons/SidebarBtn'

const SandwichMenu = () => {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false);
    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className={classes.SandwichMenu}>
            <button onClick={() => setOpenMenu(!openMenu)}>open</button>

            {openMenu &&
                <div className={classes.dropDownMenu}>
                    <SidebarBtn path="/dashboard" value="dashboard" />
                    <SidebarBtn path="/orders" value="orders" />
                    <SidebarBtn path="/suppliers" value="suppliers" />
                    <SidebarBtn path="/clients" value="clients" />
                    <SidebarBtn path="/users" value="users" />
                    <button className={classes.logoutBtn} type="button" onClick={handleLogout}>
                        <img width="30px" src={logoutSvg} />
                    </button>
                </div>}

        </div>
    )
}

export default SandwichMenu