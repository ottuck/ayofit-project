import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordScreen from "./screens/record/record_test";
import FastScreen from "./screens/fast/fast_test";
import PedometerScreen from "./screens/pedometer/pedometer_test";
import AccountScreen from "./screens/account/account_test";
import AccountInfo from "./screens/account/AccountInfo";
import AccountNutri from "./screens/account/AccountNutri";
import { GlobalStyles } from "./components/UI/styles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HOME") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "DIET RECORD") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          } else if (route.name === "CHALLENGE") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "STEP COUNTER") {
            iconName = focused ? "walk" : "walk-outline";
          } else if (route.name === "MY PAGE") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: GlobalStyles.colors.blackOpacity50,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary50,
          borderRadius: 16,
          height: 65,
        },
      })}
    >
      <Tab.Screen name="HOME" component={NutriDetailScreen} />
      <Tab.Screen name="DIET RECORD" component={RecordScreen} />
      <Tab.Screen name="CHALLENGE" component={FastScreen} />
      <Tab.Screen name="STEP COUNTER" component={PedometerScreen} />
      <Tab.Screen name="MY PAGE" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary50,
            // 다른 해더 스타일 설정들...
          },
          headerTintColor: GlobalStyles.colors.primary500,
          headerTitleStyle: {
            fontWeight: "bold",
            // 다른 헤더 타이틀 스타일 설정들...
          },
        }}
      >
        <Stack.Screen
          name="AccountInfo"
          component={AccountInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountNutri"
          component={AccountNutri}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
