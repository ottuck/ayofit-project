import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordScreen from "./screens/record/record_test";
import FastScreen from "./screens/fast/fast_test";
import PedometerScreen from "./screens/pedometer/pedometer_test";
import AccountScreen from "./screens/account/account_test";
import { GlobalStyles } from "./components/UI/styles";

const Tab = createBottomTabNavigator();

export default function App() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [hello, setHello] = useState([]);

  useEffect(() => {
    axios
      .get(`${uri}/api/user`)
      .then((response) => {
        setHello(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <NavigationContainer style={styles.navigationContainer}>
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
          headerShown: false,
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
