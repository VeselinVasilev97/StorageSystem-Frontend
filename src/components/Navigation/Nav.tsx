import classes from './Nav.module.scss'
import { useNavigate } from 'react-router-dom'
import logoutSvg from '../../assets/logoutIcon.svg'
const Nav = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className={classes.navWrapper}>
      <div className={classes.nav}>
        <p>USERNAME</p>
        <button type="button" onClick={handleLogout}>
          <img height={"50%"} src={logoutSvg} />
        </button>
      </div>
    </div>
  )
}

export default Nav