import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {

  const [mealType, setMealType] = useState("");
  const updateMealType = (newMealType) => {
    setMealType(newMealType);
  };

  const [mealList, setMealList] = useState([]);
  const addItemToMealList = (newItem) => {
    setMealList((prevMealList) => [...prevMealList, newItem]);
  };

  const deleteToMealByNO = (NO) => {
    setMealList((prevMealList) => prevMealList.filter((item) => item.nNO !== NO));
  };  

  return (
    <MealContext.Provider value={{ mealType, updateMealType, mealList, addItemToMealList, deleteToMealByNO }}>
      {children}
    </MealContext.Provider>
  );
};
