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

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PedometerScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

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

  const [weeklyAchievements, setWeeklyAchievements] = useState([]);

  useEffect(() => {
    // API 호출을 통해 주간 달성 기록 가져오기
    axios
      .get(`${uri}/api/pedometer/weeklyachievements`)
      .then((response) => {
        setWeeklyAchievements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weekly achievements:", error);
      });
  }, []);

  const updateAchievements = (dailySteps, dailyGoal) => {
    const newAchievements = daysOfWeek.map((_, index) => {
      return calculateAchievements(dailySteps[index], dailyGoal);
    });
    setDaysAchieved(newAchievements);
  };

  // 서버에 매일 자정에 달성 정보를 보내는 함수
  const sendDailyAchievement = async () => {
    try {
      // 당일 자정의 시간을 계산
      const now = new Date();
      const timeUntilMidnight =
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          0,
          0,
          0
        ) - now;

      // 타이머 설정 (매일 자정에 실행)
      setTimeout(() => {
        // 일일 달성 정보를 서버에 전송하는 코드 (API 호출 등)
        axios
          .post(`${uri}/api/pedometer/dailyrecord`, {
            day: daysOfWeek[new Date().getDay()],
            isAchieved: true,
            dailyGoal: newGoal,
            dailySteps: steps,
          })
          .then((response) => {
            // 전송 성공 시 처리
          })
          .catch((error) => {
            console.log("Error sending daily achievement:", error);
          });
      }, timeUntilMidnight);
    } catch (error) {
      console.error("Error sending daily achievement:", error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때, 매일 자정에 달성 정보를 보내는 함수 호출
    sendDailyAchievement();

    // 다음 날 자정까지의 시간 계산
    const now = new Date();
    const timeUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) -
      now;

    // 다음 날 자정에 다시 함수 호출
    const timer = setInterval(() => {
      sendDailyAchievement();
      updateAchievements(steps, goal);
    }, timeUntilMidnight);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => {
      clearInterval(timer);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함

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
                  isAchieved={daysAchieved[index]}
                  daysOfWeek={daysOfWeek}
                  weeklyAchievements={weeklyAchievements}
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
    borderWidth: 2,
    borderColor: "tomato",
  },
});

export default PedometerScreen;
