// Create a context to manage the roleWiseData
import React, { createContext, useContext, useState } from "react";

const RoleWiseDataContext = createContext();

export const RoleWiseDataProvider = ({ children }) => {
  const [roleWiseData, setRoleWiseData] = useState(null);

  return (
    <RoleWiseDataContext.Provider value={{ roleWiseData, setRoleWiseData }}>
      {children}
    </RoleWiseDataContext.Provider>
  );
};

export const useRoleWiseData = () => {
  return useContext(RoleWiseDataContext);
};
