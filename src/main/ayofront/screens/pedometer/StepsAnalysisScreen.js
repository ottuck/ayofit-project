import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { FoodCaloriesData } from "../../components/pedometer/FoodCaloriesData";
import { PedometerContext } from "../../store/PedometerContext";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Image } from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { LoginContext } from "../../store/LoginContext";

function StepsAnalysisScreen({ route }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  // const uri = "http://213.35.96.167";
  const { userInfo, setUserInfo } = useContext(LoginContext);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      // console.log("Steps when leaving PedometerScreen:", steps);

      async function updateStepsOnServer() {
        try {
          const userId = userInfo.id; // 현재 사용자 ID
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
      <View style={styles.imageWrapper}>
        {consumedFood ? (
          <Image source={imageSource} style={styles.foodImage} />
        ) : (
          <Image
            source={require("../../assets/rabbit-icon.png")}
            style={styles.foodImage}
          />
        )}
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.blurRadius}>
          <BlurView style={styles.blurView}>
            <View style={styles.blurWhiteBackground}>
              <Text style={styles.infoText}>Total Steps: {currentSteps}</Text>
              <Text style={styles.infoText}>
                Total Consumed Calories: {consumedCalories} kcal
              </Text>
              {consumedFoodInfo ? (
                <Text style={styles.consumedFoodText}>
                  You burned enough calories to consume {"\n"}
                  {consumedFoodInfo.portion} of{" "}
                  <Text style={styles.consumedFoodTextHighlight}>
                    {consumedFood}
                  </Text>{" "}
                  or more!
                </Text>
              ) : (
                <Text style={styles.consumedFoodText}>
                  Keep up the good work!
                </Text>
              )}
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary200,
    paddingBottom: 100,
  },
  imageWrapper: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderColor: GlobalStyles.colors.primary100,
    borderWidth: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    top: "5%",
  },
  foodImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
    aspectRatio: 1.625,
    resizeMode: "contain",
  },
  textWrapper: {
    flex: 1,
    width: "100%",
    top: "20%",
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    borderColor: GlobalStyles.colors.primary100,
    borderWidth: 10,
    justifyContent: "flex-start",
    paddingTop: "40%",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? "30%" : 0,
  },
  blurRadius: {
    borderRadius: 16,
    overflow: "hidden",
    height: "60%",
  },
  blurView: {
    width: "100%",
    height: "100%",
  },

  blurWhiteBackground: {
    backgroundColor: "rgba(255,255,255,0.3)",
    flex: 1,
    justifyContent: "center",
    height: "100%",
    padding: 30,
  },

  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontFamily: "OpenSans_400Regular_Italic",
  },
  consumedFoodText: {
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
    marginTop: 20,
    textAlign: "center",
    color: "black",
  },
  consumedFoodTextHighlight: {
    color: "tomato",
  },
});

export default StepsAnalysisScreen;
