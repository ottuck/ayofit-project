import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { PedometerContext, daysOfWeek } from "../../store/PedometerContext";
import { GlobalStyles } from "../../components/UI/styles";
import PedometerProgressRing from "../../components/pedometer/PedometerProgressRing";
import PedometerDailyCircles from "../../components/pedometer/PedometerDailyCheck";
import CongratulationsMessage from "../../components/pedometer/CongratulationsMessage";
import DistanceCaloriesBox from "../../components/pedometer/DistanceCaloriesBox";
import GoalInput from "../../components/pedometer/GoalInput";

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
  } = useContext(PedometerContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary50,
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
