import React from 'react'
import classes from './Nav.module.scss'
import { useNavigate } from 'react-router-dom'
type Props = {}

const Nav = (props: Props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className={classes.navWrapper}>
      <div className={classes.nav}>
        <button type="button" onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Nav