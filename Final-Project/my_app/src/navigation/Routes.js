import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './NavBar';
import Welcome from '../components/Welcome';
import HomePage from '../components/HomePage';
import Details from '../components/Details';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import NavDrawer from './NavDrawer';
import EnhancedTable from '../components/Table';
import Form from '../components/Form';
import ChangePassword from '../components/ChangePassword';

const Routes = () => {
  const authContext = useContext(AuthContext);

  const PrivateRoute = ({ ...rest }) => {
    if (authContext.isLoggedIn) {
      return <Route {...rest} />;
    } else {
      return <Redirect to="/auth" />;
    }
  };

  const LoginRoute = ({ ...rest }) => {
    if (!authContext.isLoggedIn) {
      return <Route {...rest} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Router>
      <NavBar />
      {authContext.isLoggedIn && <NavDrawer />}
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/details/movies/:id">
          <Details movie={true} />
        </Route>
        <Route exact path="/details/games/:id">
          <Details />
        </Route>
        <PrivateRoute exact path="/movie-list-editor">
          <EnhancedTable movie={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/game-list-editor">
          <EnhancedTable />
        </PrivateRoute>
        <PrivateRoute exact path="/game-list-editor/create">
          <Form />
        </PrivateRoute>
        <PrivateRoute exact path="/movie-list-editor/create">
          <Form movie={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/movie-list-editor/edit/:id">
          <Form movie={true} edit={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/game-list-editor/edit/:id">
          <Form edit={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/game-list-editor/edit/:id">
          <Form edit={true} />
        </PrivateRoute>
        <PrivateRoute exact path="/change-password">
          <ChangePassword />
        </PrivateRoute>
        <LoginRoute exact path="/auth">
          <Login />
        </LoginRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
