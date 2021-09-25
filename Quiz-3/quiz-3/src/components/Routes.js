/* cSpell:disable */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Link, Route, useHistory } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import Home from './Home';
import About from './About';
import Apps from './Apps';
import Login from './Login';
import LoginProvider, { LoginContext } from './LoginContext';
import { getToken, setUserSession, removeUserSession, getUser } from '../helper';

const Nav = () => {
  let history = useHistory();

  const [isLogin, setIsLogin, user, setUser] = useContext(LoginContext);

  useEffect(() => {
    const token = getToken();
    const username = getUser();
    if (token === null) {
      removeUserSession();
      setIsLogin(false);
      setUser(null)
    } else {
      setUserSession('hbecqygcn04,22;s9/92urx,', username);
      setUser(username)
      setIsLogin(true);
    }
  }, [setIsLogin, setUser]);

  const handleLogout = () => {
    removeUserSession();
    history.push('/login');
    setIsLogin(false);
    setUser(null)
  };

  return (
    <header>
      <ul>
        <li>
          <img src={logo} alt="Logo" />
        </li>
        {isLogin ? (
          <li>
            <div className="dropdown">
              <button className="dropbtn">{user}</button>
              <div className="dropdown-content">
                <Link to="/mobile-list-editor">Mobile Apps List Editor</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="center">
        <p>&copy; Quiz 3 ReactJS Sanbercode</p>
      </div>
    </footer>
  );
};

const Routes = () => {
  let history = useHistory();

  return (
    <LoginProvider>
      <Router>
        <Nav history={history} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login"><Login history={history} /></Route>
          <Route exact path="/mobile-list-editor">
            <Apps history={history} />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </LoginProvider>
  );
};

export default Routes;
