import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../components/account/UI/loginStyles";
import Login from "../screens/account/Login";
import Signup from "../screens/account/Signup";
import AccountInfo from "../screens/account/AccountInfo";
import AccountNutri from "../screens/account/AccUpdateNutri";

const { primary, tertiary } = Colors;

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: tertiary,
        headerTransparent: true,
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        //options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountNutri"
        component={AccountNutri}
        //options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
