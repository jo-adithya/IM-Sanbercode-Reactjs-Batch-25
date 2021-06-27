import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

const LoginProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider value={[isLogin, setIsLogin, user, setUser]}>
      {props.children}
    </LoginContext.Provider>
  );
}
 
export default LoginProvider;
