import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [loggedIn , setLoggedIn] = useState(false);


  return <AppContext.Provider value={[loggedIn, setLoggedIn]}>{children}</AppContext.Provider>;
};
