import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
  const [isLight, setIsLight] = useState(true);
  const [light] = useState({color: '#555', backgroundColor: '#eee'});
  const [dark] = useState({color: '#ddd', backgroundColor: '#555'})

  return (
    <ThemeContext.Provider value={[[isLight, setIsLight], light, dark]}>
      {props.children}
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;
