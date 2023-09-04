import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
import Constants from "expo-constants";
import { useMealContext } from "../../store/MealContext";
import { useState } from "react";

const FavMeal = ({ mealInfo }) => {
  // const { debuggerHost } = Constants.manifest2.extra.expoGo;
  // const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const uri = "http://213.35.96.167";

  const {
    removeFavoriteMeal,
    favoriteMeals,
    dbFavorites,
    deleteToDbFavorites,
  } = useMealContext();
  const handleDelete = (no) => {
    deleteToDbFavorites(no);
  };
  // console.log(dbFavorites);

  const deleteDBFavMeals = (no) => {
    console.log(no);
    axios
      .delete(`${uri}/api/favorites`, { params: { fNo: no } })
      .then((response) => {
        console.log(response.data);
        setFavResults(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.foodRecordContainer}>
      <View style={styles.recordIconContainer}>
        {/* 삭제 버튼 */}
        <TouchableOpacity
          onPress={() => {
            handleDelete(mealInfo.favNo);
            deleteDBFavMeals(mealInfo.favNo);
          }}
        >
          <AntDesign name="close" style={styles.recordDeleteButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.recordMidContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="clip">
            {mealInfo.favName}
          </Text>
          <Text style={styles.foodKcal}>{mealInfo.favKcal} Kcal</Text>
        </View>
      </View>
      <View style={styles.foodNutrientContainer}>
        <View style={styles.foodNutrientBox}>
          <Text style={styles.foodNutrient}>Carb</Text>
          <Text style={styles.foodNutrient}>
            {mealInfo.favCarb === null ? "-" : mealInfo.favCarb}
          </Text>
        </View>
        <View style={styles.foodNutrientBox}>
          <Text style={styles.foodNutrient}>Protein</Text>
          <Text style={styles.foodNutrient}>
            {mealInfo.favProtein === null ? "-" : mealInfo.favProtein}
          </Text>
        </View>
        <View style={styles.foodNutrientBox}>
          <Text style={styles.foodNutrient}>Fat</Text>
          <Text style={styles.foodNutrient}>
            {mealInfo.favFat === null ? "-" : mealInfo.favFat}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodRecordContainer: {
    width: 350,
    height: 175,
    marginVertical: 20,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
  },
  recordMidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  recordTimeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  recordTime1: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 4,
  },
  recordTime2: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 34,
  },
  textWrapper: {
    width: "55%",
    overflow: "hidden",
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodKcal: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodNutrientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodNutrientBox: {
    width: 100,
    height: 50,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  foodNutrient: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 2,
  },
  //하트, 삭제 버튼
  recordIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  recordDeleteButton: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.3)",
  },
});

export default FavMeal;
