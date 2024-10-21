import classes from './Nav.module.css'
import SandwichMenu from './SandwichMenu/SandwichMenu'
const Nav = () => {
  const username = window.sessionStorage.username;
  return (
    <div className={classes.navWrapper}>
      <div className={classes.nav}>
        <p className={classes.userName}>{username}</p>
        <SandwichMenu />
      </div>
    </div>
  )
}

export default Nav