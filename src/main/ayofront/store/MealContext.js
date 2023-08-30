import React, { createContext, useContext, useState } from 'react';

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [mealList, setMealList] = useState([]);
  // console.log('meal List 배열', mealList);

  return (
    <MealContext.Provider value={{ mealList, setMealList }}>
      {children}
    </MealContext.Provider>
  );
};
