import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appMode, setAppMode] = useState('demo'); // 'demo' or 'connected'
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  
  // Update the global last updated timestamp
  const triggerUpdate = () => {
    setLastUpdated(new Date().toISOString());
  };

  return (
    <AppContext.Provider value={{ 
      appMode, 
      setAppMode,
      lastUpdated,
      triggerUpdate
    }}>
      {children}
    </AppContext.Provider>
  );
};
