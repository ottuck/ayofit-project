import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const DistanceCaloriesBox = ({ iconSource, title, value }) => {
  return (
    <View style={styles.bottomTextBox}>
      <Image source={iconSource} style={styles.bottomTextIcon} />
      <Text style={styles.customText}>{title}</Text>
      <Text style={[styles.customText, styles.valueText]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTextBox: {
    flex: 1,
  },
  bottomTextIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  customText: {
    fontFamily: "OpenSans_700Bold_Italic",
    fontSize: 14,
    textAlign: "center",
  },
  valueText: {
    fontFamily: "OpenSans_400Regular",
  },
});

export default DistanceCaloriesBox;
