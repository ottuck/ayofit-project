import React, { createContext, useState, useContext } from 'react';

const FoodInfoContext = createContext();

export const useFoodInfos = () => {
  const context = useContext(FoodInfoContext);
  if (!context) {
    throw new Error('useFoodInfos must be used within a FoodInfoProvider');
  }
  return context;
};

export const FoodInfoProvider = ({ children }) => {
  const [foodInfos, setFoodInfos] = useState([]);
  
  const addFoodInfo = (newFoodInfo) => {
    setFoodInfos(prevFoodInfos => [...prevFoodInfos, newFoodInfo]);
  };

  return (
    <FoodInfoContext.Provider value={{ foodInfos, addFoodInfo }}>
      {children}
    </FoodInfoContext.Provider>
  );
};
