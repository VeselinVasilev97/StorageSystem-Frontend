import { Outlet } from 'react-router-dom'
import classes from './Layout.module.css'
import Nav from '../Navigation/Nav'


const Layout = () => {
  return (
    <>
    <Nav />
    <div className={classes.contentWrapper}>
    <Outlet />
    </div>
    </>
  )
}

export default Layout