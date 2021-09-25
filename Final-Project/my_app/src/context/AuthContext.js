import React, { createContext, useState, useEffect } from 'react';

let logoutTimer;

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialName = localStorage.getItem('name');
  const [token, setToken] = useState(initialToken);
  const [name, setName] = useState(initialName);
  const userIsLoggedIn = !!token;

  const handleLogout = () => {
    setToken(null);
    setName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    localStorage.removeItem('name');
    if (logoutTimer) clearTimeout(logoutTimer);
  };
  const handleLogin = (token, name) => {
    let expTime = Date.now() + 86400000;
    localStorage.setItem('token', token);
    localStorage.setItem('expTime', expTime);
    localStorage.setItem('name', name);
    logoutTimer = setTimeout(handleLogout, expTime - Date.now());
    setToken(token);
    setName(name);
  };

  useEffect(() => {
    if (token) {
      let duration = localStorage.getItem('expTime') - Date.now();
      if (duration < 60000) duration = 0;
      logoutTimer = setTimeout(() => handleLogout(), duration);
    }
  }, [token]);

  const contextValue = {
    token: token,
    name: name,
    isLoggedIn: userIsLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
