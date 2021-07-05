import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/AuthContext';
import logo from '../static/images/app_logo.png';
import { useHistory } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '5px 15px',
  },
  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [nav, setNav] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (authContext.isLoggedIn) {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }
  }, [open, authContext.isLoggedIn]);

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 5) {
      setNav(true);
    } else {
      setNav(false);
    }
  });

  const handleLogout = () => {
    authContext.logout();
    history.push('/auth');
  };

  const handleChangePassword = () => {
    history.push('/change-password');
  };

  return (
    <div className={classes.root}>
      <AppBar
        color="secondary"
        position="fixed"
        style={
          nav
            ? authContext.isLoggedIn
              ? { backgroundColor: '#252525', padding: '0 14px' }
              : { backgroundColor: '#252525', padding: '0 138px' }
            : authContext.isLoggedIn
            ? {
                background: 'transparent',
                boxShadow: 'none',
                padding: '20px 14px 0 14px',
              }
            : {
                background: 'transparent',
                boxShadow: 'none',
                padding: '20px 138px 0 138px',
              }
        }
        className={authContext.isLoggedIn ? classes.appBar : null}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {
              history.push('/');
            }}
          >
            {!authContext.isLoggedIn && (
              <img src={logo} alt="logo" height="50px" />
            )}
          </Button>
          {authContext.isLoggedIn ? (
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar
                style={{
                  background:
                    'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  color: 'white',
                }}
              >
                {authContext.name
                  ? authContext.name
                      .split(' ')
                      .map((x) => x[0].toUpperCase())
                      .slice(0, 2)
                      .join('')
                  : null}
              </Avatar>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ marginRight: '45px' }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper
                      style={{
                        background:
                          'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        color: 'white',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                          <MenuItem
                            onClick={handleChangePassword}
                            style={{ textTransform: 'none' }}
                          >
                            Change Password
                          </MenuItem>
                          <MenuItem
                            onClick={handleLogout}
                            style={{ textTransform: 'none' }}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Button>
          ) : (
            <Button
              color="secondary"
              className={nav ? null : classes.button}
              onClick={() => {
                history.push('/auth');
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
