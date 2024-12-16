import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const SandwichMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/dashboard')}>
          <Typography>Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/orders')}>
          <Typography>Orders</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/products')}>
          <Typography>Products</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/suppliers')}>
          <Typography>Suppliers</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/clients')}>
          <Typography>Clients</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/users')}>
          <Typography>Users</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: 1 }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SandwichMenu;
