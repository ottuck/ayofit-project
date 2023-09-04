import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LoginContext } from "../../store/LoginContext";

function Settings() {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const ClearLogin = async () => {
    await AsyncStorage.removeItem("@user")
      .then(() => {
        const emptyInfo = {
          id: null,
          email: null,
          pasword: null,
          name: null,
          picture: null,
          type: null,
          info: null,
        };
        setUserInfo(emptyInfo);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <Button title="log out" onPress={() => ClearLogin()}></Button>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "rgba(255, 233, 216, 1)",
  },
});
