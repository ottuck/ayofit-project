import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import { GlobalStyles } from "../../components/UI/styles";
import Input from "../../components/account/UI/Input";
import Button from "../../components/account/UI/Button";
import { useState } from "react";
import { useAccountsContext } from "../../store/accounts_context";
import axios from "axios";
import Constants from "expo-constants";

function AccountNutri({ navigation }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const registerAccountGoal = () => {
    axios
      .post(`${uri}/api/account/user2/goal`, accountInfos)
      .then((response) => {
        console.log("User info submitted successfully:", response.data);
        navigation.navigate("MainTabs");
      })
      .catch(() => {
        Alert.alert("Error", "Failed to submit user info. Please try again.");
      });
  };

  const { accountInfos, setAccountInfos } = useAccountsContext();

  const goToAccountInfo = () => {
    navigation.navigate("AccountInfo");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  function nutriChangedHandler(infoIdentifier, enteredInfoVal) {
    setAccountInfos({
      ...accountInfos,
      [infoIdentifier]: enteredInfoVal,
    });
  }

  return (
    <TouchableNativeFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.topText}>Tell us about your goals</Text>
          <Text style={styles.topText}>to get started.</Text>
        </View>
        <View style={styles.calorieContainer}>
          <Input
            style={styles.calorieInput}
            labelStyle={styles.label}
            label="Daily Calorie Goal"
            textInputConfig={{
              keyboardType: "decimal-pad",
              placeholder: "kcal",
              maxLength: 5,
              onChangeText: nutriChangedHandler.bind(this, "calorie"),
              value: accountInfos.calorie,
            }}
          />
        </View>
        <View style={styles.nutrientContainer}>
          <Text style={styles.text}>Nutrients Goal</Text>
          <View style={styles.nutriInputContainer}>
            <Input
              label="Carb"
              style={styles.input}
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
                placeholder: "g",
                onChangeText: nutriChangedHandler.bind(this, "carb"),
                value: accountInfos.carb,
              }}
            />
            <Input
              label="Protein"
              style={styles.input}
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
                placeholder: "g",
                onChangeText: nutriChangedHandler.bind(this, "protein"),
                value: accountInfos.protein,
              }}
            />
            <Input
              label="Fat"
              style={styles.input}
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
                placeholder: "g",
                onChangeText: nutriChangedHandler.bind(this, "fat"),
                value: accountInfos.fat,
              }}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.prevBtn} onPress={goToAccountInfo}>
            Prev
          </Button>
          <Button
            style={styles.confirmBtn}
            onPress={() => {
              registerAccountGoal();
            }}
          >
            Confirm
          </Button>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default AccountNutri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  top: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  topText: {
    fontSize: 28,
    fontWeight: "700",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  calorieContainer: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  label: {
    fontWeight: "600",
  },
  calorieInput: {
    marginVertical: 10,
  },
  nutrientContainer: {
    flex: 1.5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  nutriInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: 80,
  },
  btnContainer: {
    flex: 3,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  prevBtn: { width: 300, height: 50 },
  confirmBtn: { width: 300, height: 50 },
});
