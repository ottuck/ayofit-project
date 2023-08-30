import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from "./RecordScreen";
import RecordMain from "./RecordMain";
import { MealProvider } from "../../store/MealContext";

function RecordNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <MealProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecordScreen" component={RecordScreen} />
        <Stack.Screen name="RecordMain" component={RecordMain} />
      </Stack.Navigator>
    </MealProvider>
  );
}
export default RecordNavigator