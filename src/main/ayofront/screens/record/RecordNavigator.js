import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from "./RecordScreen";
import RecordMain from "./RecordMain";

function RecordNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="RecordMain" component={RecordMain} />
    </Stack.Navigator>
  );
}
export default RecordNavigator