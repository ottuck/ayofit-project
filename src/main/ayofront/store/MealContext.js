import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [mealType, setMealType] = useState("");
  const updateMealType = (newMealType) => {
    setMealType(newMealType);
  };

  //MealCard2 handle function in RecordMain.js
  const [mealList, setMealList] = useState([]);
  const addItemToMealList = (newItem) => {
    setMealList((prevMealList) => [...prevMealList, newItem]);
  };
  const deleteToMealByNO = (nNO) => {
    setMealList((prevMealList) =>
      prevMealList.filter((item) => item.nNO !== nNO)
    );
  };

  // Favorites handling
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const addFavoriteMeal = (fNo) => {
    setFavoriteMeals((prevFavoriteMeals) => [...prevFavoriteMeals, fNo]);
  };
  const removeFavoriteMeal = (fNo) => {
    setFavoriteMeals((prevFavoriteMeals) =>
      prevFavoriteMeals.filter((item) => item !== fNo)
    );
  };

  return (
    <MealContext.Provider
      value={{
        mealType,
        updateMealType,
        mealList,
        addItemToMealList,
        deleteToMealByNO,
        favoriteMeals,
        setFavoriteMeals,
        addFavoriteMeal,
        removeFavoriteMeal,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
