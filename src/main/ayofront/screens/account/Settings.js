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
          a_type: 0,
          activity: "",
          age: 0,
          curWeight: 0,
          gender: "",
          height: 0,
          l_email: "",
          l_id: "",
          l_info: "",
          l_name: "",
          l_password: "",
          l_picture: "",
          l_type: "",
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
