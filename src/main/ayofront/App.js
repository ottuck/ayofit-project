import { StyleSheet, Dimensions, StatusBar, View } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import OnboardingScreen from "./screens/Onboarding";
import NutriDetailScreen from "./screens/nutriDetail/nutriDetail_test";
import RecordScreen from "./screens/record/RecordNavigator";
import FastRoot from "./navigations/FastRoot";
import { GlobalStyles } from "./components/UI/styles";
import FontProvider from "./components/FontProvider";
import AccountsContextProvider from "./store/accounts_context";
import AccountMain from "./navigations/AccountStack";
import { PedometerProvider } from "./store/PedometerContext";
import { PhotoProvider } from "./store/image_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import PedometerStack from "./navigations/PedometerStack";
import LoginStack from "./navigations/LoginStack";
import { LoginContext } from "./store/LoginContext";
import { MealProvider } from "./store/MealContext";

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
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: GlobalStyles.colors.blackOpacity50,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary50,
          borderRadius: 16,

          height: Platform.OS === "ios" ? 90 : 65,
          overflow: "hidden",
          position: "absolute",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HOME" component={NutriDetailScreen} />
      <Tab.Screen name="DIET RECORD" component={RecordScreen} />
      <Tab.Screen name="CHALLENGE" component={FastRoot} />
      <Tab.Screen name="STEP COUNTER" component={PedometerStack} />
      <Tab.Screen name="MY PAGE" component={AccountMain} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { width, height } = Dimensions.get("window");
  const desiredImageAspectRatio = 9 / 16;

  const imageWidth = width;
  const imageHeight = imageWidth / desiredImageAspectRatio;

  const [userInfo, setUserInfo] = useState();

  console.log(userInfo);

  const checkLoginCredentials = async () => {
    await AsyncStorage.getItem("@user")
      .then((result) => {
        const emptyInfo = {
          id: null,
          email: null,
          pasword: null,
          name: null,
          picture: null,
          type: null,
          info: null,
        };
        if (result !== null) {
          setUserInfo(JSON.parse(result));
        } else {
          setUserInfo(emptyInfo);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  return (
    <LoginContext.Provider value={{ userInfo, setUserInfo }}>
      <AccountsContextProvider>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <FontProvider>
            <MealProvider>
              <PhotoProvider>
                <StatusBar
                  backgroundColor={GlobalStyles.colors.primary500}
                  barStyle="default"
                />
                <NavigationContainer style={styles.navigationContainer}>
                  <PedometerProvider>
                    <Stack.Navigator>
                      {userInfo?.id ? (
                        <Stack.Screen
                          name="MainTabs"
                          component={MainTabsScreen}
                          options={{ headerShown: false }}
                        />
                      ) : (
                        <Stack.Screen
                          name="LoginStack"
                          component={LoginStack}
                          options={{ headerShown: false }}
                        />
                      )}
                    </Stack.Navigator>
                  </PedometerProvider>
                </NavigationContainer>
              </PhotoProvider>
            </MealProvider>
          </FontProvider>
        </SafeAreaView>
      </AccountsContextProvider>
    </LoginContext.Provider>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});
