import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { GlobalStyles } from "../../components/UI/styles";
import CongratulationsMessage from "../../components/pedometer/CongratulationsMessage";
import DistanceCaloriesBox from "../../components/pedometer/DistanceCaloriesBox";
import GoalInput from "../../components/pedometer/GoalInput";
import PedometerDailyCircles from "../../components/pedometer/PedometerDailyCheck";
import PedometerProgressRing from "../../components/pedometer/PedometerProgressRing";
import SwipeDownToSave from "../../components/pedometer/SwipeDownToSave";
import { PedometerContext, daysOfWeek } from "../../store/PedometerContext";
import DailyGoalInputScreen from "./DailyGoalInputScreen";

function PedometerScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const {
    steps,
    goal,
    daysAchieved,
    formattedDate,
    stepsToKilometers,
    calculateCaloriesBurned,
    handleGoalUpdate,
    congratulationsVisible,
    updateStepsOnServer,
    todayData,
  } = useContext(PedometerContext);

  // for 'swipe down to save'
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await updateStepsOnServer(steps);
    setRefreshing(false);
  };

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      // console.log("Steps when leaving PedometerScreen:", steps);

      async function updateStepsOnServer() {
        try {
          const userId = "user4"; // 현재 사용자 ID
          // console.log(userId);
          // console.log(steps);
          // console.log(formattedDate);

          await axios.put(`${uri}/api/pedometer/update-daily-step`, {
            pId: userId,
            pStepCnt: steps,
            pDate: formattedDate,
          });

          // console.log("Steps updated on the server.");
        } catch (error) {
          // console.error("Failed to update steps on the server:", error);
        }
      }
      updateStepsOnServer();
    }
  }, [isFocused]);

  return !todayData ? (
    <DailyGoalInputScreen />
  ) : (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.select({ ios: 100, android: 200 })}
          enableOnAndroid={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <SwipeDownToSave />
            <View style={styles.dayContainerWrapper}>
              <View style={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                  <PedometerDailyCircles
                    key={index}
                    day={day}
                    isAchieved={daysAchieved[index]}
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.analysisButton}
              onPress={() =>
                navigation.navigate("Steps Analysis", {
                  currentSteps: steps,
                  calories: calculateCaloriesBurned(),
                })
              }
            >
              <Text style={styles.analysisButtonText}>Go to Analysis</Text>
            </TouchableOpacity>
            {/* progress ring */}
            <PedometerProgressRing steps={steps} goal={goal} />

            <View style={styles.bottomTextContainer}>
              <DistanceCaloriesBox
                iconSource={require("../../assets/distance-icon.png")}
                title="Distance"
                value={`${stepsToKilometers(steps)} km`}
              />

              <DistanceCaloriesBox
                iconSource={require("../../assets/calories-burned-icon.png")}
                title="Calories Burned"
                value={`${calculateCaloriesBurned()} kcal`}
              />
            </View>
            <GoalInput
              goal={goal}
              onGoalChange={handleGoalUpdate}
              apiEndpoint={uri}
              today={formattedDate}
            />

            {/* Congratulations Message */}
            <CongratulationsMessage isVisible={congratulationsVisible} />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100,
    paddingTop: Platform.OS === "ios" ? "15%" : "10%"
  },
  dayContainerWrapper: {
    flexDirection: "row",
  },
  daysContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 14,
  },
  analysisButton: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 5,
    width: 150,
    alignSelf: "center",
    marginVertical: 10,
    paddingVertical: 5,
  },
  analysisButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "tomato",
  },
});

export default PedometerScreen;
