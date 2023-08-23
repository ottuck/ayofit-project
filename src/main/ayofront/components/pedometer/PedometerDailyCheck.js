import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GlobalStyles } from "../../components/UI/styles";

const PedometerDailyCircles = ({ day, isAchieved }) => {
  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayText}>{day}</Text>
      <View style={styles.dayCircle}>
        {isAchieved ? (
          <Image
            source={require("../../assets/day-check-icon.png")}
            style={styles.checkMark}
          />
        ) : (
          <Text style={styles.xMark}>✕</Text>
          // <Text style={styles.xMark}></Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: "center",
  },
  dayCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary500,
    borderStyle: "dashed",
    backgroundColor: `rgba(228,108,10,0.5)`,
  },
  dayText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkMark: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  xMark: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
});

export default PedometerDailyCircles;
