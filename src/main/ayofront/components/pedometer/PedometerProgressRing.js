import React from "react";
import { View, Text, Image } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { GlobalStyles } from "../UI/styles";

const PedometerProgressRing = ({ steps, goal }) => {
  const calculateAchievementPercentage = () => {
    if (goal === 0) {
      return 0;
    }
    let percentage = (steps / goal) * 100;
    percentage = Math.min(percentage, 100); // up to 100%
    return percentage.toFixed(0);
  };

  return (
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
          source={require("../../assets/marathon-shoes.png")}
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
            { color: GlobalStyles.colors.primary500, fontWeight: "bold" },
          ]}
        >
          Goal: {goal.toLocaleString()} steps
        </Text>
      </View>
    </View>
  );
};

const styles = {
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
};

export default PedometerProgressRing;
