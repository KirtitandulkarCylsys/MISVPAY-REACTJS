// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataContextProvider = ({ children }) => {
  const [roleWiseData, setRoleWiseData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [report_period, setReportPeriod] = useState('');

  return (
    <DataContext.Provider value={{ roleWiseData, setRoleWiseData, currentPage, setCurrentPage, report_period, setReportPeriod,entriesPerPage, setEntriesPerPage}}>
      {children}
    </DataContext.Provider>
  );
};
