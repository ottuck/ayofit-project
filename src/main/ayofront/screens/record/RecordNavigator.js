import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecordScreen from "./RecordScreen";
import RecordMain from "./RecordMain";
import SearchModal from "./SearchModal";
import ImagePickerExample from "./ImagePickerExample"

function RecordNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="SearchModal" component={SearchModal} options={{presentation: 'modal'}}/>
      <Stack.Screen name="RecordMain" component={RecordMain} />
      <Stack.Screen name="ImagePickerExample" component={ImagePickerExample} />
    </Stack.Navigator>
  );
}
export default RecordNavigator