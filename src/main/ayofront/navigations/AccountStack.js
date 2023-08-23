import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "../screens/account/MyPage";
import AccUpdateInfo from "../screens/account/AccUpdateInfo";
import AccountNutri from "../screens/account/AccountNutri";
import AccUpdateNutri from "../screens/account/AccUpdateNutri";
import Settings from "../screens/account/Settings";

const NativeStack = createNativeStackNavigator();

function AccountMain() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen
        name="AccUpdateInfo"
        component={AccUpdateInfo}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen
        name="AccUpdateNutri"
        component={AccUpdateNutri}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen name="Settings" component={Settings} />
    </NativeStack.Navigator>
  );
}

export default AccountMain;
