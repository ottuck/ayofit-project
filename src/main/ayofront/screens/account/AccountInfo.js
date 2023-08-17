import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import Input from "../../components/account/UI/Input";
import IconButton from "../../components/account/UI/IconButton";
import Button from "../../components/account/UI/Button";
import { useState } from "react";

function AccountInfo({ navigation }) {
  const goToAccountNutri = () => {
    navigation.navigate("AccountNutri");
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
      if (infoIdentifier === "gender") {
        return {
          ...curInfoVal,
          gender: enteredInfoVal,
        };
      }
      if (infoIdentifier === "activity") {
        return {
          ...curInfoVal,
          activity: enteredInfoVal,
        };
      }
      return { ...curInfoVal, [infoIdentifier]: enteredInfoVal };
    });
  }
  console.log(infoValues);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.container}
      behavior={Platform.OS === "android" ? "height" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topText}>Tell us about your goals</Text>
            <Text style={styles.topText}>to get started.</Text>
          </View>
          <View style={styles.genderContainer}>
            <Text style={styles.text}>Gender</Text>
            <View style={styles.genderIconContainer}>
              <View>
                <IconButton
                  icon="male"
                  size={45}
                  label="male"
                  onPress={() => infoChangedHandler("gender", "male")}
                  color={
                    infoValues.gender === "male"
                      ? GlobalStyles.colors.primary500
                      : "black"
                  }
                  style={
                    infoValues.gender === "male" ? styles.genderLabel : "black"
                  }
                />
              </View>
              <View>
                <IconButton
                  icon="female"
                  size={45}
                  label="female"
                  onPress={() => infoChangedHandler("gender", "female")}
                  color={
                    infoValues.gender === "female"
                      ? GlobalStyles.colors.primary500
                      : "black"
                  }
                  style={
                    infoValues.gender === "female"
                      ? styles.genderLabel
                      : "black"
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.ageHeightContainer}>
            <View style={styles.inputsRow}>
              <View style={styles.rowInput}>
                <Input
                  labelStyle={styles.label}
                  label="Age"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    autoCorrect: false,
                    onChangeText: infoChangedHandler.bind(this, "age"),
                    value: infoValues.age,
                  }}
                />
              </View>
              <View style={styles.rowInput}>
                <Input
                  labelStyle={styles.label}
                  label="Height"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    maxLength: 5,
                    autoCorrect: false,
                    placeholder: "cm",
                    onChangeText: infoChangedHandler.bind(this, "height"),
                    value: infoValues.height,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.weightContainer}>
            <View style={styles.inputsRow}>
              <View style={styles.rowInput}>
                <Input
                  labelStyle={styles.label}
                  label="Current Weight"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    autoCorrect: false,
                    placeholder: "kg",
                    onChangeText: infoChangedHandler.bind(this, "curWeight"),
                    value: infoValues.curWeight,
                  }}
                />
              </View>
              <View style={styles.rowInput}>
                <Input
                  labelStyle={styles.label}
                  label="Target Weight"
                  textInputConfig={{
                    keyboardType: "decimal-pad",
                    autoCorrect: false,
                    placeholder: "kg",
                    onChangeText: infoChangedHandler.bind(this, "tarWeight"),
                    value: infoValues.tarWeight,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.text}>
              Give us an idea of your daily activity
            </Text>
            <View style={styles.icons}>
              <IconButton
                style={styles.high}
                label="High"
                icon="slightly-smile"
                size={40}
                onPress={() => infoChangedHandler("activity", "high")}
                color={infoValues.activity === "high" ? "#CE4257" : "black"}
              />
              <IconButton
                style={styles.moderate}
                label="Moderate"
                icon="neutral"
                size={40}
                onPress={() => infoChangedHandler("activity", "moderate")}
                color={infoValues.activity === "moderate" ? "#FF7F51" : "black"}
              />
              <IconButton
                style={styles.low}
                label="Low"
                icon="dizzy"
                size={40}
                onPress={() => infoChangedHandler("activity", "low")}
                color={infoValues.activity === "low" ? "#FF9B54" : "black"}
              />
            </View>
          </View>
          <View style={styles.next}>
            <Button style={styles.nextBtn} onPress={goToAccountNutri}>
              Next
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AccountInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary50 },
  top: {
    flex: 1,
    marginTop: 50,
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
  genderContainer: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  genderIconContainer: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  genderLabel: {
    color: GlobalStyles.colors.primary500,
  },
  ageHeightContainer: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  label: {
    fontWeight: "600",
  },
  inputsRow: { flexDirection: "row", justifyContent: "space-between" },
  rowInput: {
    flex: 1,
  },
  weightContainer: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  activityContainer: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  high: { color: "#CE4257", fontWeight: "600" },
  moderate: { color: "#FF7F51", fontWeight: "600" },
  low: { color: "#FF9B54", fontWeight: "600" },
  next: {
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  nextBtn: { width: 300, height: 50 },
});