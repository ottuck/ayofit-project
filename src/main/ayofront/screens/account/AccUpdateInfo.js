import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import Input from "../../components/account/UI/Input";
import IconButton from "../../components/account/UI/IconButton";
import Button from "../../components/account/UI/Button";
import { useAccountsContext } from "../../store/accounts_context";
import axios from "axios";
import Constants from "expo-constants";
import { useEffect } from "react";

function AccUpdateInfo({ navigation }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const getAccountInfos = () => {
    axios
      .get(`${uri}/api/account/user1`)
      .then((response) => {
        console.log(response.data);
        setAccountInfos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAccountTarWeight = () => {
    axios
      .get(`${uri}/api/account/user1/weight`)
      .then((response) => {
        console.log(response.data);
        setAccountInfos({
          ...accountInfos,
          tarWeight: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateAccInfos = () => {
    axios
      .put(`${uri}/api/account/user1`, accountInfos)
      .then((response) => {
        console.log("User info submitted successfully:", response.data);
        navigation.navigate("AccUpdateNutri");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAccountInfos();
    getAccountTarWeight();
  }, []);

  const { accountInfos, setAccountInfos } = useAccountsContext();

  function infoChangedHandler(infoIdentifier, enteredInfoVal) {
    setAccountInfos({
      ...accountInfos,
      [infoIdentifier]: enteredInfoVal,
    });
  }

  const ageIsValid = accountInfos.age > 0;
  const heightIsValid = accountInfos.height > 100;
  const curWeightIsValid = accountInfos.curWeight > 0;
  const tarWeightIsValid = accountInfos.tarWeight > 0;
  const genderIsValid = accountInfos.gender !== "";
  const activityIsValid = accountInfos.activity !== "";

  const validCheck =
    !genderIsValid ||
    !ageIsValid ||
    !heightIsValid ||
    !curWeightIsValid ||
    !tarWeightIsValid ||
    !activityIsValid;

  const calculateGoals = () => {
    let squaredHeight =
      accountInfos.height * 0.01 * (accountInfos.height * 0.01);
    let standardWeight = 0;
    let calculatedCalories = 0;
    if (accountInfos.gender === "male") {
      standardWeight = squaredHeight * 22;
    } else {
      standardWeight = squaredHeight * 21;
    }

    if (accountInfos.activity === "low") {
      calculatedCalories = standardWeight * 25;
    } else if (accountInfos.activity === "moderate") {
      calculatedCalories = standardWeight * 30;
    } else {
      calculatedCalories = standardWeight * 40;
    }

    const roundedCalculatedCalories = calculatedCalories.toFixed(1);

    const carbRatio = 0.5;
    const proteinRatio = 0.3;
    const fatRatio = 0.2;

    const carbCalories = roundedCalculatedCalories * carbRatio;
    const proteinCalories = roundedCalculatedCalories * proteinRatio;
    const fatCalories = roundedCalculatedCalories * fatRatio;

    const carbGrams = (carbCalories / 4).toFixed(1);
    const proteinGrams = (proteinCalories / 4).toFixed(1);
    const fatGrams = (fatCalories / 9).toFixed(1);

    setAccountInfos({
      ...accountInfos,
      calorie: roundedCalculatedCalories,
      carb: carbGrams,
      protein: proteinGrams,
      fat: fatGrams,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.container}
      behavior={Platform.OS === "android" ? "height" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.topText}>Edit Your Account Information</Text>
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
                    accountInfos.gender === "male"
                      ? GlobalStyles.colors.primary500
                      : "black"
                  }
                  style={
                    accountInfos.gender === "male"
                      ? styles.genderLabel
                      : "black"
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
                    accountInfos.gender === "female"
                      ? GlobalStyles.colors.primary500
                      : "black"
                  }
                  style={
                    accountInfos.gender === "female"
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
                    value: accountInfos.age.toString(),
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
                    value: accountInfos.height.toString(),
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
                    value: accountInfos.curWeight.toString(),
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
                    value: accountInfos.tarWeight.toString(),
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
                color={accountInfos.activity === "high" ? "#CE4257" : "black"}
              />
              <IconButton
                style={styles.moderate}
                label="Moderate"
                icon="neutral"
                size={40}
                onPress={() => infoChangedHandler("activity", "moderate")}
                color={
                  accountInfos.activity === "moderate" ? "#FF7F51" : "black"
                }
              />
              <IconButton
                style={styles.low}
                label="Low"
                icon="dizzy"
                size={40}
                onPress={() => infoChangedHandler("activity", "low")}
                color={accountInfos.activity === "low" ? "#FF9B54" : "black"}
              />
            </View>
          </View>
          <View style={styles.next}>
            <Button
              style={styles.nextBtn}
              onPress={() => {
                if (validCheck) {
                  Alert.alert(
                    "Invalid Information",
                    "Please check your information"
                  );
                } else {
                  calculateGoals();
                  updateAccInfos();
                }
              }}
            >
              Next
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AccUpdateInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GlobalStyles.colors.primary50 },
  top: {
    flex: 1,
    marginTop: "5%",
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
    marginBottom: "5%",
  },
  genderContainer: {
    flex: 0.7,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
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
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
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
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
  },
  activityContainer: {
    flex: 1,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  high: { color: "#CE4257", fontWeight: "600" },
  moderate: { color: "#FF7F51", fontWeight: "600" },
  low: { color: "#FF9B54", fontWeight: "600" },
  next: {
    flex: 1,
    marginHorizontal: "5%",
    paddingHorizontal: "5%",
    alignSelf: "center",
  },
  nextBtn: { width: 300, height: 50 },
});
