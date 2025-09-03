import { createContext, useState } from "react";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords((prev) => [...prev, record]);
  };

  return (
    <FinanceContext.Provider value={{ records, addRecord }}>
      {children}
    </FinanceContext.Provider>
  );
};
