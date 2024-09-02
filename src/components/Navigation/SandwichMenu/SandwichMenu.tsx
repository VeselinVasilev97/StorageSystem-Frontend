import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './SandwichMenu.module.css'
import logoutSvg from '../../../assets/logoutIcon.svg'
import sandwichIcon from '../../../assets/sandwichIcon.png'
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
            <button className={classes.sandwichBtn} onClick={() => setOpenMenu(!openMenu)}><img src={sandwichIcon}/></button>

            {openMenu &&
                <div className={classes.dropDownMenu}>
                    <SidebarBtn onClick={() => setOpenMenu(false)}path="/dashboard" value="dashboard" />
                    <SidebarBtn onClick={() => setOpenMenu(false)}path="/orders" value="orders" />
                    <SidebarBtn onClick={() => setOpenMenu(false)}path="/suppliers" value="suppliers" />
                    <SidebarBtn onClick={() => setOpenMenu(false)}path="/clients" value="clients" />
                    <SidebarBtn onClick={() => setOpenMenu(false)}path="/users" value="users" />
                    <button className={classes.logoutBtn} type="button" onClick={handleLogout}>
                        <img width="30px" src={logoutSvg} />
                    </button>
                </div>}

        </div>
    )
}

export default SandwichMenu