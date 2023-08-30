import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [mealType, setMealType] = useState("");

  const updateMealType = (newMealType) => {
    setMealType(newMealType);
  };

  return (
    <MealContext.Provider value={{ mealType, updateMealType }}>
      {children}
    </MealContext.Provider>
  );
};
