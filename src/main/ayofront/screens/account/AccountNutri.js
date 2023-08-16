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
            label="Daily Calorie Goal"
            textInputConfig={{
              keyboardType: "decimal-pad",
              maxLength: 5,
              autoCorrect: false,
              placeholder: "kcal",
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
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  calorieContainer: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
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
