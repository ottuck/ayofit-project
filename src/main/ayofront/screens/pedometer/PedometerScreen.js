import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

import { PedometerContext, daysOfWeek } from "../../store/PedometerContext";
import { GlobalStyles } from "../../components/UI/styles";
import PedometerProgressRing from "../../components/pedometer/PedometerProgressRing";
import PedometerDailyCircles from "../../components/pedometer/PedometerDailyCheck";
import CongratulationsMessage from "../../components/pedometer/CongratulationsMessage";
import DistanceCaloriesBox from "../../components/pedometer/DistanceCaloriesBox";
import GoalInput from "../../components/pedometer/GoalInput";
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
      console.log("Steps when leaving PedometerScreen:", steps);

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

  return todayData ? (
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
            <View style={{ alignItems: "center" }}>
              <Text>Swipe Down to Record Daily Steps!</Text>
              <SimpleLineIcons name="arrow-down" size={24} color="black" />
            </View>
            <View style={styles.dayContainerWrapper}>
              <View style={styles.daysContainer}>
                {daysOfWeek.map((day, index) => (
                  <PedometerDailyCircles
                    key={index}
                    day={day}
                    isAchieved={daysAchieved[index]} // 여기서 daysAchieved 배열의 값 사용
                  />
                ))}
              </View>
            </View>

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
    backgroundColor: GlobalStyles.colors.primary50,
    paddingTop: "5%",
  },
  dayContainerWrapper: {
    flexDirection: "row",
  },
  daysContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 14,
  },
  bottomTextContainer: {
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "tomato",
  },
});

export default PedometerScreen;
