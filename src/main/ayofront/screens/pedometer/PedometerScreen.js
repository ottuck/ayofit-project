import React, { useState, useEffect } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Accelerometer } from "expo-sensors";

import { GlobalStyles } from "../../components/UI/styles";
import PedometerProgressRing from "../../components/pedometer/PedometerProgressRing";
import PedometerDailyCircles from "../../components/pedometer/PedometerDailyCheck";
import CongratulationsMessage from "../../components/pedometer/CongratulationsMessage";
import DistanceCaloriesBox from "../../components/pedometer/DistanceCaloriesBox";
import GoalInput from "../../components/pedometer/GoalInput";
import axios from "axios";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PEDOMETER_TASK_NAME = "pedometerTask";
TaskManager.defineTask(PEDOMETER_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Background task error:", error);
    return;
  }
  console.log(data);
  if (data) {
    console.log(data + ">>>>>>>>>>>>>>>>>>");
    // 여기서 센서 데이터를 처리하거나 업데이트합니다.
    // 백그라운드 작업이 지속적으로 실행됩니다.
    const accelerationMagnitude = Math.sqrt(
      data.accelerometerData.x ** 2 +
        data.accelerometerData.y ** 2 +
        data.accelerometerData.z ** 2
    );

    if (accelerationMagnitude > 1.2) {
      console.log("background");
    }
  }
});

function PedometerScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  console.log(uri);

  const [steps, setSteps] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [goal, setGoal] = useState(100);
  const [newGoal, setNewGoal] = useState("");
  const [congratulationsVisible, setCongratulationsVisible] = useState(false);
  const congratulationsOpacity = new Animated.Value(0);

  const [daysAchieved, setDaysAchieved] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // 컴포넌트가 마운트될 때 TaskManager에 백그라운드 작업 등록
  useEffect(() => {
    TaskManager.getRegisteredTasksAsync().then((registeredTasks) => {
      const isTaskDefined = registeredTasks.some(
        (task) => task.taskName === PEDOMETER_TASK_NAME
      );

      if (!isTaskDefined) {
        TaskManager.defineTask(PEDOMETER_TASK_NAME, async ({ data, error }) => {
          if (error) {
            console.error("Background task error:", error);
            return;
          }

          if (data) {
            const accelerationMagnitude = Math.sqrt(
              data.accelerometerData.x ** 2 +
                data.accelerometerData.y ** 2 +
                data.accelerometerData.z ** 2
            );

            if (accelerationMagnitude > 1.2) {
              console.log("Background: Accelerometer data received");
              // 여기서 만보기와 관련된 작업을 수행하면 됩니다.
            }
          }
        });
      }

      TaskManager.startTaskAsync(PEDOMETER_TASK_NAME);

      return () => {
        TaskManager.stopTaskAsync(PEDOMETER_TASK_NAME);
      };
    });
  }, []);

  useEffect(() => {
    const userId = "user4"; // Set the user ID here
    const currentDate = new Date();

    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    axios
      .get(`${uri}/api/pedometer/weekly-achievement`, {
        params: {
          userId: userId,
          date: formattedDate,
        },
      })
      .then((response) => {
        const weeklyAchievement = response.data;
        console.log(response.data);
        const updatedDaysAchieved = daysOfWeek.map((day, index) => {
          const dailyData = weeklyAchievement.find((item) => {
            const pDate = new Date(item.pDate);
            const pDayOfWeek = pDate.getDay(); // 0 (일요일) ~ 6 (토요일)

            // daysOfWeek 배열의 첫 번째 값이 월요일이므로, index 값에 1을 더하여 비교합니다.
            return pDayOfWeek === (index + 1) % 7;
          });

          if (dailyData) {
            return dailyData.pStepCnt >= dailyData.pStepGoal;
          } else {
            return false;
          }
        });

        setDaysAchieved(updatedDaysAchieved);
      })
      .catch((error) => {
        console.error("Failed to fetch weekly achievement data:", error);
      });
  }, []);

  // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함

  // const fetchAllPedometerData = () => {
  //   axios
  //     .get(`${uri}/api/pedometer/test`)
  //     .then((response) => {
  //       console.log(uri);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching pedometer data:", error);
  //     });
  // };

  // fetchAllPedometerData();

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener(
      (accelerometerData) => {
        const accelerationMagnitude = Math.sqrt(
          accelerometerData.x ** 2 +
            accelerometerData.y ** 2 +
            accelerometerData.z ** 2
        );
        console.log("test");
        if (accelerationMagnitude > 1.2) {
          setIsWalking(true);
        } else if (accelerationMagnitude < 0.8) {
          setIsWalking(false);
        }

        if (isWalking && accelerationMagnitude < 1.2) {
          setSteps((prevSteps) => prevSteps + 1);
          setIsWalking(false);

          if (steps + 1 === goal) {
            showCongratulations();
          }
        }
      }
    );

    return () => {
      accelerometerSubscription.remove();
    };
  }, [isWalking, steps, goal]);

  useEffect(() => {
    if (congratulationsVisible) {
      Animated.timing(congratulationsOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(congratulationsOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [congratulationsVisible]);

  const stepsToKilometers = (steps) => {
    const meters = steps * 0.7;
    const kilometers = meters / 1000;
    return kilometers.toFixed(2);
  };

  const updateGoal = () => {
    setGoal(parseInt(newGoal) || 0);
    setNewGoal("");
  };

  const showCongratulations = () => {
    setCongratulationsVisible(true);
    setTimeout(() => {
      setCongratulationsVisible(false);
    }, 3000); //
  };

  const calculateCaloriesBurned = () => {
    // const weightInKg = 70; // User's Weight
    const caloriesPerStep = 0.035;
    const totalCaloriesBurned = steps * caloriesPerStep;

    return totalCaloriesBurned.toFixed(2);
  };

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

          {/* User Input Area */}
          <GoalInput
            newGoal={newGoal}
            onGoalChange={setNewGoal}
            onUpdateGoal={updateGoal}
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
    marginHorizontal: 24,
  },
  bottomTextContainer: {
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "tomato",
  },
});

export default PedometerScreen;
