/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext, useContext } from 'react';

const layoutContext = createContext();

// eslint-disable-next-line react/prop-types
export const layoutProvider = ({ children }) => {
  const [editContact, setEditContact] = useState(null);

  const valuesToPass = {
    editContact,
    setEditContact,
  };

  return (
    <layoutContext.Provider value={valuesToPass}>
      {children}
    </layoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(layoutContext);
  if (context === undefined) {
    throw new Error('Component is not subscribed to Layout Context');
  }
  return context;
};
