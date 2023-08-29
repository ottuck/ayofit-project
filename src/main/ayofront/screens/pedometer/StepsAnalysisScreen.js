import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FoodCaloriesData } from "../../components/pedometer/FoodCaloriesData";
import { PedometerContext } from "../../store/PedometerContext";
import { useIsFocused } from "@react-navigation/native";
import Constants from "expo-constants";
import axios from "axios";
import { Image } from "react-native";

function StepsAnalysisScreen({ route }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      // console.log("Steps when leaving PedometerScreen:", steps);

      async function updateStepsOnServer() {
        try {
          const userId = "user4"; // 현재 사용자 ID
          console.log(userId);
          console.log(steps);
          console.log(formattedDate);

          await axios.put(`${uri}/api/pedometer/update-daily-step`, {
            pId: userId,
            pStepCnt: steps,
            pDate: formattedDate,
          });

          console.log("Steps updated on the server.");
        } catch (error) {
          console.error("Failed to update steps on the server:", error);
        }
      }
      updateStepsOnServer();
    }
  }, [isFocused]);

  const { steps, formattedDate } = useContext(PedometerContext);
  const { currentSteps, calories } = route.params;
  const consumedCalories = calories;
  const [consumedFood, setConsumedFood] = useState(null);

  useEffect(() => {
    let consumedFoodName = null;
    const foodList = Object.keys(FoodCaloriesData);

    for (let i = 0; i < foodList.length; i++) {
      const foodInfo = FoodCaloriesData[foodList[i]];
      if (consumedCalories < foodInfo.calories) {
        consumedFoodName = foodList[i - 1];
        break;
      }
    }

    if (consumedFoodName === null) {
      consumedFoodName = foodList[foodList.length - 1];
    }

    setConsumedFood(consumedFoodName);
  }, [steps, consumedCalories]);

  const consumedFoodInfo = FoodCaloriesData[consumedFood];

  const imageSource = consumedFood
    ? FoodCaloriesData[consumedFood].image
    : null;

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={{
          width: 100,
          height: 100,
          marginBottom: 30,
        }}
      />
      <Text style={styles.title}>Steps Analysis</Text>
      <Text style={styles.infoText}>Total Steps: {currentSteps}</Text>
      <Text style={styles.infoText}>
        Total Consumed Calories: {consumedCalories} kcal
      </Text>
      {consumedFoodInfo ? (
        <Text style={styles.consumedFoodText}>
          You burned enough calories to consume {"\n"}
          {consumedFoodInfo.portion} of{" "}
          <Text style={styles.consumedFoodTextHighlight}>{consumedFood}</Text>{" "}
          or more!
        </Text>
      ) : (
        <Text style={styles.consumedFoodText}>Keep up the good work!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  consumedFoodText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  consumedFoodTextHighlight: {
    color: "tomato",
  },
});

export default StepsAnalysisScreen;
