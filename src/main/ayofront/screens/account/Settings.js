import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { LoginContext } from "../../store/LoginContext";

function Settings() {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const ClearLogin = async () => {
    await AsyncStorage.removeItem("@user")
      .then(() => {
        const emptyInfo = {
          id: "",
          email: "",
          pasword: "",
          name: "",
          picture: "",
          type: "",
        };
        setUserInfo(emptyInfo);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <Text>Settings!</Text>
      <Button title="log out" onPress={() => ClearLogin()}></Button>
    </View>
  );
}

export default Settings;
