import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [roleWiseData, setRoleWiseData] = useState(null);
  const updateRoleWiseData = (data) => {
    setRoleWiseData(data);
  };

  return (
    <DataContext.Provider value={{ roleWiseData, updateRoleWiseData }}>
      {children}
    </DataContext.Provider>
  );
};