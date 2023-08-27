import React from "react";
import { View, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const SwipeDownToSave = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>Swipe Down to Save Daily Steps!</Text>
      <SimpleLineIcons name="arrow-down" size={24} color="black" />
    </View>
  );
};

export default SwipeDownToSave;
