import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <UIContext.Provider value={{ isSearchOpen, setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen, toast, showToast }}>
      {children}
    </UIContext.Provider>
  );
};