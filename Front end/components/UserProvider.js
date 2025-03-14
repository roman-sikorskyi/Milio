import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
  };
  
export const useUser = () => useContext(UserContext);
export default UserProvider;
