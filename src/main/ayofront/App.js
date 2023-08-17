import { useState } from "react";
import { StyleSheet, Image, Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import OnboardingScreen from "./screens/Onboarding";
import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordScreen from "./screens/record/RecordNavigator";
import FastScreen from "./screens/fast/fast_test";
import PedometerScreen from "./screens/pedometer/PedometerScreen";
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
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  const { width, height } = Dimensions.get("window");
  const desiredImageAspectRatio = 9 / 16;

  const imageWidth = width;
  const imageHeight = imageWidth / desiredImageAspectRatio;

  const handleOnboardingComplete = () => {
    setCompletedOnboarding(true);
  };

  if (showOnboarding && !completedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer style={styles.navigationContainer}>
        <Stack.Navigator>
          <Stack.Screen
            name="AccountInfo"
            component={AccountInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AccountNutri" component={AccountNutri} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
