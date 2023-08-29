import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import Constants from "expo-constants";
import { Accelerometer } from "expo-sensors";
import { Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PedometerContext = createContext();
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const PedometerProvider = ({ children }) => {
  // ---------- Consts ----------

  const uri = "http://213.35.96.167/";

  const [todayData, setTodayData] = useState(null);

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

  const formattedDateRef = useRef(formattedDate);

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

  const updateStepsOnServer = async (updatedSteps) => {
    if (updatedSteps !== 0) {
      const userId = "user4";
      const currentDate = new Date();

      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      try {
        await axios.put(`${uri}/api/pedometer/update-step-goal`, {
          pId: userId,
          pDate: formattedDate,
          pStepCnt: updatedSteps,
        });
        // console.log("Daily step count updated successfully.");
        setSteps(updatedSteps);
        await AsyncStorage.setItem("steps", updatedSteps.toString());
      } catch (error) {
        // console.error("Failed to update daily step count:", error);
      }
    }
  };

  const handleStepsUpdate = async (updatedSteps) => {
    setSteps(updatedSteps);
    await updateStepsOnServer(updatedSteps);
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
        // console.log(response.data);

        // Find today's data from weekly achievement
        const todayData = weeklyAchievement.find(
          (item) =>
            new Date(item.pDate).toISOString().split("T")[0] === formattedDate
        );

        if (todayData) {
          const todayStepGoal = todayData.pStepGoal;
          const todayCurrentStep = todayData.pStepCnt;
          // console.log(`${userId}'s daily initial goal:`, todayStepGoal);
          setGoal(todayStepGoal);
          setSteps(todayCurrentStep);
          setTodayData(true);
        } else {
          // console.log("Today's data not found, using existing goal.");
          setTodayData(false);
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
        // console.error("Failed to fetch weekly achievement data:", error);
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
        uri,
        axios,
        Accelerometer,
        stepsToKilometers,
        calculateCaloriesBurned,
        handleGoalUpdate,
        updateStepsOnServer,
        formattedDateRef,
        todayData,
        setTodayData,
      }}
    >
      {children}
    </PedometerContext.Provider>
  );
};

export const usePedometerContext = () => useContext(PedometerContext);

export { PedometerContext, daysOfWeek };
