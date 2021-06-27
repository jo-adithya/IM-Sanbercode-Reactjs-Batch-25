import React, { useState, useContext } from 'react';
import { setUserSession } from '../helper';
import { LoginContext } from './LoginContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin, , setUser] = useContext(LoginContext);
  let history = useHistory();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (
      (username === 'admin' && password === 'password') ||
      (username === 'editor' && password === 'secret') ||
      (username === 'trainer' && password === 'rahasia')
    ) {
        setUserSession('axqm847h0ex108,j8ezj31mh34', username);
        history.push('/');
        setIsLogin(true);
        setUser(username);
      } else {
        alert('Username and password are incorrect.');
      }
  };

  if (!isLogin) {
    return (
      <section>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <input type="submit" value="Login" onClick={handleSubmit} />
      </section>
    );
  } else {
    history.push('/');
    return null;
  }
};

export default Login;
