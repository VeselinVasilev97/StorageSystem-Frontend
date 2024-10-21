import classes from './Nav.module.css'
import SandwichMenu from './SandwichMenu/SandwichMenu'
import homeIcon from '../../assets/homeIcon.svg'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  const username = window.sessionStorage.username;
  return (
    <div className={classes.navWrapper}>
      <div className={classes.nav}>
        <div className={classes.homeAndUsername}>
          <NavLink to="/dashboard" className={classes.homeBtn}>{<img height={30} src={homeIcon} />}</NavLink>
          <p className={classes.userName}>{username}</p>
        </div>
        <SandwichMenu />
      </div>
    </div>
  )
}

export default Nav