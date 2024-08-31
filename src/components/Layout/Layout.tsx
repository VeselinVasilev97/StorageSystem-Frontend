import { Outlet } from 'react-router-dom'
import classes from './Layout.module.scss'
import Nav from '../Navigation/Nav'
import Sidebar from '../Sidebar/Sidebar'


const Layout = () => {
  return (
    <>
    <Nav />
    <div className={classes.contentWrapper}>
    <Sidebar />
    <Outlet />
    </div>
    </>
  )
}

export default Layout