import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { Accelerometer } from "expo-sensors";
import { Animated, Easing } from "react-native";

const PedometerContext = createContext();
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const PedometerProvider = ({ children }) => {
  // ---------- Consts ----------

  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [steps, setSteps] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [goal, setGoal] = useState(100);
  const [congratulationsVisible, setCongratulationsVisible] = useState(false);
  const [daysAchieved, setDaysAchieved] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const [congratulationsOpacity] = useState(new Animated.Value(0)); // Initialize Animated.Value

  const stepsToKilometers = (steps) => {
    const meters = steps * 0.7;
    const kilometers = meters / 1000;
    return kilometers.toFixed(2);
  };
  const calculateCaloriesBurned = () => {
    const caloriesPerStep = 0.035;
    const totalCaloriesBurned = steps * caloriesPerStep;

    return totalCaloriesBurned.toFixed(2);
  };

  const handleGoalUpdate = (updatedGoal) => {
    setGoal(updatedGoal);
  };

  const showCongratulations = () => {
    setCongratulationsVisible(true);
    setTimeout(() => {
      setCongratulationsVisible(false);
    }, 3000); //
  };

  // ---------- useEffects ----------

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
        console.log("weekly data: " + response.data);

        // Find today's data from weekly achievement
        const todayData = weeklyAchievement.find(
          (item) =>
            new Date(item.pDate).toISOString().split("T")[0] === formattedDate
        );

        if (todayData) {
          const todayStepGoal = todayData.pStepGoal;
          console.log(`${userId}'s daily initial goal:`, todayStepGoal);
          setGoal(todayStepGoal);
        } else {
          console.log("Today's data not found, using existing goal.");
        }

        const updatedDaysAchieved = daysOfWeek.map((day, index) => {
          const dailyData = weeklyAchievement.find((item) => {
            const pDate = new Date(item.pDate);
            const pDayOfWeek = pDate.getDay(); // 0 (Sun) ~ 6 (Sat)

            // Since the first value in the daysOfWeek array represents Monday, add 1 to the index for comparison.
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

        // if (isWalking && accelerationMagnitude < 1.2) {
        //   setSteps((prevSteps) => prevSteps + 1);
        //   setIsWalking(false);

        //   if (steps + 1 === goal) {
        //     showCongratulations();
        //   }
        // }
        if (isWalking && accelerationMagnitude < 1.2) {
          setSteps((prevSteps) => {
            const newSteps = prevSteps + 1;
            if (newSteps === goal) {
              showCongratulations();
            }
            return newSteps;
          });
          setIsWalking(false);
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

  // ---------- Pedometer Context Provider ----------

  return (
    <PedometerContext.Provider
      value={{
        steps,
        setSteps,
        isWalking,
        setIsWalking,
        goal,
        setGoal,
        congratulationsVisible,
        setCongratulationsVisible,
        daysAchieved,
        setDaysAchieved,
        formattedDate,
        debuggerHost,
        uri,
        axios,
        Accelerometer,
        stepsToKilometers,
        calculateCaloriesBurned,
        handleGoalUpdate,
      }}
    >
      {children}
    </PedometerContext.Provider>
  );
};

export const usePedometerContext = () => useContext(PedometerContext);

export { PedometerContext, daysOfWeek };
