import React, { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const useMealContext = () => useContext(MealContext);

export const MealProvider = ({ children }) => {
  const [mealType, setMealType] = useState("");
  const updateMealType = (newMealType) => {
    setMealType(newMealType);
  };

  //MealCard2 handling
  const [mealList, setMealList] = useState([]);

  const addItemToMealList = (newItem) => {
    setMealList((prevMealList) => [...prevMealList, newItem]);
  };
  const addItemToMealListUseFlatMap = (newItem) => {
    setMealList((prevMealList) => {
      const updatedMealList = [...prevMealList, newItem].flatMap(
        (item) => item
      );
      return updatedMealList;
    });
  };
  const deleteToMealByNo = (nNO) => {
    setMealList((prevMealList) =>
      prevMealList.filter((item) => item.nNO !== nNO)
    );
  };
  const cleanMealList = () => {
    setMealList([]);
    // console.log('컨택스트 비움');
  };

  // Favorites handling
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const addFavoriteMeal = (fNo) => {
    setFavoriteMeals((prevFavoriteMeals) => [...prevFavoriteMeals, fNo]);
  };
  const removeFavoriteMeal = (fNo) => {
    setFavoriteMeals((prevFavoriteMeals) =>
      prevFavoriteMeals.filter((item) => item.fNo !== fNo)
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

  const [results, setResults] = useState([]);
  const [favResults, setFavResults] = useState([]);

  //여러 페이지에서 쓸 현재 날자를 DB Date형식에 맞춰 포멧팅 해둠
  const todayDate = new Date();

  //1. POST,PUT 요청 보낼때 형식 : 날자 시간 같이 들어가기 때문에 (yyyy/mm/dd hh:mm:ss)
  const formattedTodayDateAndTime = `${todayDate.getFullYear()}/${String(
    todayDate.getMonth() + 1
  ).padStart(2, "0")}/${String(todayDate.getDate()).padStart(2, "0")} ${String(
    todayDate.getHours()
  ).padStart(2, "0")}:${String(todayDate.getMinutes()).padStart(
    2,
    "0"
  )}:${String(todayDate.getSeconds()).padStart(2, "0")}`;
  // console.log(formattedTodayDateAndTime);

  //2. GET 요청할 보낼때 쓸 형식 : 날자별로 조회할 경우가 많기 때문에 (yyyy/mm/dd)
  const formattedYYMMDD = `${todayDate.getFullYear()}/${String(
    todayDate.getMonth() + 1
  ).padStart(2, "0")}/${String(todayDate.getDate()).padStart(2, "0")}`;
  // console.log(formattedYYMMDD);

  const formattedTime24 = `${String(todayDate.getHours()).padStart(
    2,
    "0"
  )}:${String(todayDate.getMinutes()).padStart(2, "0")}`;
  // console.log(formattedTime24);

  const hours12 = todayDate.getHours() % 12 || 12;
  const ampm = todayDate.getHours() < 12 ? "am" : "pm";
  const formattedTime12 = `${ampm} ${String(hours12).padStart(2, "0")}:${String(
    todayDate.getMinutes()
  ).padStart(2, "0")}`;
  // console.log(formattedTime12);

  return (
    <MealContext.Provider
      value={{
        mealType,
        setMealType,
        updateMealType,
        mealList,
        addItemToMealList,
        addItemToMealListUseFlatMap,
        deleteToMealByNo,
        cleanMealList,

        favoriteMeals,
        setFavoriteMeals,
        addFavoriteMeal,
        removeFavoriteMeal,
        dbFavorites,
        setDbFavorites,
        addToDbFavorites,
        deleteToDbFavorites,
        results,
        setResults,
        favResults,
        setFavResults,

        formattedTodayDateAndTime,
        formattedYYMMDD,
        formattedTime24,
        formattedTime12,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};
