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
import { useAccountsContext } from "../../store/accounts_context";

function AccountInfo({ navigation }) {
  const goToAccountNutri = () => {
    navigation.navigate("AccountNutri");
  };

  const { accountInfos, setAccountInfos } = useAccountsContext();

  // const [infoValues, setInfoValues] = useState({
  //   gender: "",
  //   age: "",
  //   height: "",
  //   curWeight: "",
  //   tarWeight: "",
  //   activity: "",
  //   calorie: "",
  //   carb: "",
  //   protein: "",
  //   fat: "",
  // });

  function infoChangedHandler(infoIdentifier, enteredInfoVal) {
    setAccountInfos({
      ...accountInfos,
      [infoIdentifier]: enteredInfoVal,
    });
  }

  // console.log(accountInfos);.

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

    // console.log(calculatedCalories.toFixed(1));

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
                    value: accountInfos.age,
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
                    value: accountInfos.height,
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
                    value: accountInfos.curWeight,
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
                    value: accountInfos.tarWeight,
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
                calculateGoals();
                goToAccountNutri();
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
