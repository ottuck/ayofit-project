import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

import { GlobalStyles } from "../../components/UI/styles";
import Input from "../../components/account/UI/Input";
import Button from "../../components/account/UI/Button";
import { useState, useContext } from "react";
import { useAccountsContext } from "../../store/accounts_context";
import axios from "axios";
import Constants from "expo-constants";
import { LoginContext } from "../../store/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AccountNutri({ navigation, route }) {
  const { id } = route.params;

  const { userInfo, setUserInfo } = useContext(LoginContext);

  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  // const uri = "http://213.35.96.167";

  console.log(route.params);

  const registerAccountGoal = () => {
    axios
      .post(`${uri}/api/account/${id}/goal`, accountInfos)
      .then(() => {
        console.log("User info submitted successfully:");
        axios
          .post(`${uri}/api/account/${id}/confirm`)
          .then(() => {
            navigation.navigate("OnboardingScreen", { ...route.params });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { accountInfos, setAccountInfos } = useAccountsContext();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  function nutriChangedHandler(infoIdentifier, enteredInfoVal) {
    setAccountInfos({
      ...accountInfos,
      [infoIdentifier]: enteredInfoVal,
    });
  }

  const calorieIsValid = accountInfos.calorie > 0;
  const carbIsValid = accountInfos.carb > 0;
  const proteinIsValid = accountInfos.protein > 0;
  const fatIsValid = accountInfos.fat > 0;

  const validCheck =
    !calorieIsValid || !carbIsValid || !proteinIsValid || !fatIsValid;

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
          <Button
            style={styles.confirmBtn}
            onPress={() => {
              if (validCheck) {
                Alert.alert(
                  "Invalid Information",
                  "Please check your information"
                );
              } else {
                registerAccountGoal();
              }
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
    marginTop: "10%",
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
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
  },
  calorieContainer: {
    flex: 1,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
  },
  label: {
    fontWeight: "600",
  },
  calorieInput: {
    marginVertical: "2%",
  },
  nutrientContainer: {
    flex: 1.5,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    marginTop: "5%",
  },
  nutriInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: 80,
  },
  btnContainer: {
    flex: 3,
    marginTop: "10%",
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  prevBtn: { width: 300, height: 50 },
  confirmBtn: { width: 300, height: 50 },
});
