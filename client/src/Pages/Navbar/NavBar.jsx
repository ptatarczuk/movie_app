import './navbar.css';
import * as React from 'react';
import { Button, Avatar, Tooltip, Menu, MenuItem, AppBar, Box, Toolbar, IconButton, Typography, Container } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react'
import UserContext from '../../authHelpers/UserContext'
import { getToken } from '../../environments';


const NavBar = () => {
  const { loggedUser } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleWatchlistRedirect = () => {
    setAnchorElUser(null);
    navigate('/user')
  };

  const logoutUser = () => {
    setAnchorElUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.reload();
    navigate('/')
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: "#DD4F4E" }} />
          <Typography
            className='logo'
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:  '#DD4F4E',
              textDecoration: 'none',
            }}
          >
            MOVIEWEB
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
              <Button
                key="home"
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 'large' }}
              >
                HOME
              </Button>
            </Link>
            <Link to='/movies'>
              <Button
                key="movies"
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 'large' }}
              >
                MOVIES
              </Button>
            </Link>
          </Box>
          <Typography>{loggedUser ? loggedUser.username : ""}</Typography>
          {getToken() ?
            (<>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '45px'
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem key='watchlist' onClick={handleWatchlistRedirect}>
                  <Typography
                    sx={{ color: 'white' }}
                    textAlign="center">Watchlist</Typography>
                </MenuItem>
                <MenuItem key='logout' onClick={logoutUser}>
                  <Typography
                    sx={{ color: '#DD4F4E'}}
                    textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </>) : (<Link to='/login'>
              <Button
                key="login"
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 'large' }}

              >
                LOG IN/ SIGN IN
              </Button>
            </Link>)
          }
        </Toolbar>
      </Container>
      <Outlet />
    </AppBar>
    // <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
  );
}

export default NavBar;
