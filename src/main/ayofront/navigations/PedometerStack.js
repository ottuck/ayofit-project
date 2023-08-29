import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PedometerScreen from "../screens/pedometer/PedometerScreen";
import StepsAnalysisScreen from "../screens/pedometer/StepsAnalysisScreen";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

function PedometerStack() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      navigation.navigate("Pedometer"); // Step Counter 스크린으로 이동
    }
  }, [isFocused, navigation]);

  return (
    <Stack.Navigator initialRouteName="Pedometer">
      <Stack.Screen
        name="Pedometer"
        component={PedometerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Steps Analysis" component={StepsAnalysisScreen} />
    </Stack.Navigator>
  );
}

export default PedometerStack;
