import React, { useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import MovieIcon from '@material-ui/icons/Movie';
import AddIcon from '@material-ui/icons/Add';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import logo from '../static/images/app_logo-2.png';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(0deg, #FE6B6B, #f50057)',
    color: 'white',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const NavDrawer = () => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const drawer = (
    <div>
      <Button
        onClick={() => {
          history.push('/');
        }}
        style={{ margin: '25px auto' }}
      >
        <img src={logo} alt="logo" height="50px" />
      </Button>
      <Avatar
        style={{
          margin: '0 auto 5px auto',
          color: 'red',
          backgroundColor: 'white',
        }}
        className={classes.large}
      >
        {authContext.name
          ? authContext.name
              .split(' ')
              .map((x) => x[0].toUpperCase())
              .slice(0, 2)
              .join('')
          : null}
      </Avatar>
      <Typography variant="h6">{authContext.name}</Typography>
      <Typography
        className="cat-title"
        style={{ textAlign: 'left', padding: '30px 0 10px 28px', margin: '0' }}
      >
        MOVIES EDITOR
      </Typography>
      <List
        style={{ padding: '0' }}
        onClick={() => {
          history.push('/movie-list-editor');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <MovieIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Movie List Editor'} />
        </ListItem>
      </List>
      <List
        style={{ padding: '0 0 30px 0' }}
        onClick={() => {
          history.push('/movie-list-editor/create');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <AddIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Add a Movie'} />
        </ListItem>
      </List>
      <Typography
        className="cat-title"
        style={{ textAlign: 'left', padding: '0 0 10px 28px', margin: '0' }}
      >
        GAMES EDITOR
      </Typography>
      <List
        style={{ padding: '0' }}
        onClick={() => {
          history.push('/game-list-editor');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <SportsEsportsIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Game List Editor'} />
        </ListItem>
      </List>
      <List
        style={{ padding: '0 0 30px 0' }}
        onClick={() => {
          history.push('/game-list-editor/create');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <AddIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Add a Game'} />
        </ListItem>
      </List>
      <Typography
        className="cat-title"
        style={{ textAlign: 'left', padding: '0 0 10px 28px', margin: '0' }}
      >
        USER
      </Typography>
      <List
        style={{ padding: '0' }}
        onClick={() => {
          history.push('/change-password');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <LockIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Change Password'} />
        </ListItem>
      </List>
      <List
        style={{ padding: '0' }}
        onClick={() => {
          authContext.logout();
          history.push('/auth');
        }}
      >
        <ListItem button style={{ padding: '10px 28px' }}>
          <ListItemIcon style={{ minWidth: '45px' }}>
            <ExitToAppIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="navigation-bar">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default NavDrawer;
