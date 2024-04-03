'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

type DrawerContextType = {
  isOpen: boolean;
  onToggleDrawer: () => void;
  handleDrawerButtonClick: (isSmallScreen: boolean) => void;
};

type DrawerProviderProps = {
  children: ReactNode;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('DrawerContext is undefined');
  }
  return context;
};

const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);


  const onToggleDrawer = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleDrawerButtonClick = (isSmallScreen: boolean) => {
    if (isSmallScreen && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <DrawerContext.Provider value={{ isOpen, onToggleDrawer, handleDrawerButtonClick }}>
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerProvider, useDrawer };
