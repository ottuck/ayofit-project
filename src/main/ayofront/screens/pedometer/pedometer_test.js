import React, { useState, useEffect, useCallback } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import { LinearGradient } from "expo-linear-gradient";
import CircularProgress from "react-native-circular-progress-indicator";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import { GlobalStyles } from "../../components/UI/styles";

// SplashScreen.preventAutoHideAsync();

function PedometerScreen() {
  const [steps, setSteps] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [goal, setGoal] = useState(10000);
  const [newGoal, setNewGoal] = useState("");
  const [congratulationsVisible, setCongratulationsVisible] = useState(false);
  const congratulationsOpacity = new Animated.Value(0);

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

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

  const calculateAchievementPercentage = () => {
    if (goal === 0) {
      return 0;
    }
    let percentage = (steps / goal) * 100;
    percentage = Math.min(percentage, 100); // up to 100%
    return percentage.toFixed(0);
  };

  const calculateCaloriesBurned = () => {
    // const weightInKg = 70; // User's Weight
    const caloriesPerStep = 0.035;
    const totalCaloriesBurned = steps * caloriesPerStep;

    return totalCaloriesBurned.toFixed(2);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Progress Ring */}
      <View style={styles.progressContainer}>
        <CircularProgress
          value={calculateAchievementPercentage()}
          radius={180}
          progressValueColor={GlobalStyles.colors.primary500}
          duration={500}
          strokeColorConfig={[
            { color: GlobalStyles.colors.gradientGreen, value: 0 },
            { color: GlobalStyles.colors.gradientYellow, value: 50 },
            { color: GlobalStyles.colors.primary200, value: 100 },
          ]}
          activeStrokeWidth={24}
          inActiveStrokeOpacity={0.3}
        />
        <View style={styles.progressIconContainer}>
          <Image
            source={require("../../assets/marathon-shoes.png")} // 이미지 파일의 경로
            style={styles.progressIcon}
          />
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>%</Text>
          <Text style={styles.progressText}>Achieved</Text>
          <Text
            style={[
              styles.progressText,
              { color: GlobalStyles.colors.blackOpacity50 },
            ]}
          >
            Current Status: {steps.toLocaleString()} steps
          </Text>
          <Text
            style={[
              styles.progressText,
              { color: GlobalStyles.colors.blackOpacity50 },
            ]}
          >
            Goal: {goal.toLocaleString()} steps
          </Text>
        </View>
      </View>
      <View style={styles.BottomTextContainer}>
        <View>
          <Text style={styles.text}>{stepsToKilometers(steps)} km</Text>
        </View>

        <View>
          {/* ing */}
          <Text style={styles.customText}>
            Calories Burned: {calculateCaloriesBurned()} kcal
          </Text>
        </View>
      </View>

      {/* User Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your goal"
          value={newGoal}
          onChangeText={(text) => setNewGoal(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={updateGoal}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

      {/* Congratulations Message */}
      {congratulationsVisible && (
        <Animated.View style={styles.congratulationsContainer}>
          <Animated.View
            style={[
              styles.congratulations,
              { opacity: congratulationsOpacity },
            ]}
          >
            <LinearGradient
              colors={[
                GlobalStyles.colors.gradientYellow,
                GlobalStyles.colors.gradientGreen,
              ]}
              style={styles.gradientBackground}
            >
              <Text style={styles.congratulationsText}>Congratulations!</Text>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  customText: {
    fontFamily: "OpenSans_700Bold_Italic",
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary50,
  },
  text: {
    fontSize: 20,
    marginBottom: 18,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressIconContainer: {
    position: "absolute",
    top: "15%",
    zIndex: 999,
  },
  progressIcon: {
    width: 72,
    height: 72,
  },
  progressTextContainer: {
    position: "absolute",
    top: "60%",
    zIndex: 999,
  },
  progressText: {
    color: GlobalStyles.colors.primary500,
    fontSize: 18,
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 200,
  },
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  congratulationsContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  congratulations: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  congratulationsText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default PedometerScreen;
