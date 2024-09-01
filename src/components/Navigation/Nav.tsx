import classes from './Nav.module.css'
import SandwichMenu from './SandwichMenu/SandwichMenu'
const Nav = () => {

  return (
    <div className={classes.navWrapper}>
      <div className={classes.nav}>
        <p className={classes.userName}>USERNAME</p>
        <SandwichMenu />
      </div>
    </div>
  )
}

export default Nav