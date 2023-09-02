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
  const deleteToMealByNO = (NO) => {
    setMealList((prevMealList) =>
      prevMealList.filter((item) => item.nNO !== NO)
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

  const [dbFavorites, setDbFavorites] = useState([]);
  const addToDbFavorites = (newFavorite) => {
    setDbFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };
  const deleteToDbFavorites = (NO) => {
    setDbFavorites((prevDbFavorites) =>
      prevDbFavorites.filter((item) => item.favNo !== NO)
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
        dbFavorites,
        setDbFavorites,
        addToDbFavorites,
        deleteToDbFavorites,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
