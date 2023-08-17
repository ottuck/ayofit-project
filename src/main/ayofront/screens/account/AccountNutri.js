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

function AccountNutri({ navigation }) {
  const goToAccountInfo = () => {
    navigation.navigate("AccountInfo");
  };

  const goToMainTabs = () => {
    navigation.navigate("MainTabs");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [infoValues, setInfoValues] = useState({
    gender: "",
    age: "",
    height: "",
    curWeight: "",
    tarWeight: "",
    activity: "",
    calorie: "",
    carb: "",
    protein: "",
    fat: "",
  });

  function infoChangedHandler(infoIdentifier, enteredInfoVal) {
    setInfoValues((curInfoVal) => {
      return { ...curInfoVal, [infoIdentifier]: enteredInfoVal };
    });
  }

  console.log(infoValues);

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
              maxLength: 5,
              autoCorrect: false,
              placeholder: "kcal",
              onChangeText: infoChangedHandler.bind(this, "calorie"),
              value: infoValues.calorie,
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
                maxLength: 5,
                autoCorrect: false,
                placeholder: "g",
                onChangeText: infoChangedHandler.bind(this, "carb"),
                value: infoValues.carb,
              }}
            />
            <Input
              label="Protein"
              style={styles.input}
              textInputConfig={{
                keyboardType: "decimal-pad",
                maxLength: 5,
                autoCorrect: false,
                placeholder: "g",
                onChangeText: infoChangedHandler.bind(this, "protein"),
                value: infoValues.protein,
              }}
            />
            <Input
              label="Fat"
              style={styles.input}
              textInputConfig={{
                keyboardType: "decimal-pad",
                maxLength: 5,
                autoCorrect: false,
                placeholder: "g",
                onChangeText: infoChangedHandler.bind(this, "fat"),
                value: infoValues.fat,
              }}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.prevBtn} onPress={goToAccountInfo}>
            Prev
          </Button>
          <Button style={styles.confirmBtn} onPress={goToMainTabs}>
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
