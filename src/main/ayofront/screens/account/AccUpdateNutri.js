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
import { useState } from "react";
import { useAccountsContext } from "../../store/accounts_context";
import axios from "axios";
import Constants from "expo-constants";

function AccUpdateNutri({ navigation }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const updateAccGoal = () => {
    axios
      .put(`${uri}/api/account/user1/goal`, accountInfos)
      .then((response) => {
        console.log("User info submitted successfully:", response.data);
        navigation.navigate("MyPage");
      })
      .catch(() => {
        Alert.alert("Error", "Failed to submit user info. Please try again.");
      });
  };

  const { accountInfos, setAccountInfos } = useAccountsContext();

  const goToAccUpdateInfo = () => {
    navigation.navigate("AccUpdateInfo");
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
          <Text style={styles.topText}>Edit Your Account Information</Text>
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
          <Button style={styles.prevBtn} onPress={goToAccUpdateInfo}>
            Prev
          </Button>
          <Button
            style={styles.confirmBtn}
            onPress={() => {
              if (validCheck) {
                Alert.alert(
                  "Invalid Information",
                  "Please check your information"
                );
              } else {
                updateAccGoal();
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

export default AccUpdateNutri;

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
