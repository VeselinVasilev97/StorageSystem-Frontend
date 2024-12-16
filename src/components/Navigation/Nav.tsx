import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import homeIcon from '../../assets/homeIcon.svg';

const Nav: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const username = window.sessionStorage.username;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton edge="start" color="inherit">
              <img height={30} src={homeIcon} alt="Home" />
            </IconButton>
          </NavLink>
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {username}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ ml: 'auto' }}>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { minWidth: 200 },
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleNavigation('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigation('/orders')}>Orders</MenuItem>
            <MenuItem onClick={() => handleNavigation('/products')}>Products</MenuItem>
            <MenuItem onClick={() => handleNavigation('/suppliers')}>Suppliers</MenuItem>
            <MenuItem onClick={() => handleNavigation('/clients')}>Clients</MenuItem>
            <MenuItem onClick={() => handleNavigation('/users')}>Users</MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
