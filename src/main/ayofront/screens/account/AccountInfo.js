import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import ImageButton from "../../components/account/UI/ImageButton";
import Input from "../../components/account/UI/Input";
import IconButton from "../../components/account/UI/IconButton";
import Button from "../../components/account/UI/Button";

function AccountInfo({ navigation }) {
  const goToAccountNutri = () => {
    navigation.navigate("AccountNutri");
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Tell us about your goals</Text>
        <Text style={styles.topText}>to get started.</Text>
      </View>
      <View style={styles.genderContainer}>
        <Text style={styles.text}>Gender</Text>
        <View style={styles.imageContainer}>
          <View>
            <ImageButton label="male" src={require("../../images/male.png")} />
          </View>
          <View>
            <ImageButton
              label="female"
              src={require("../../images/female.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.ageHeightContainer}>
        <View style={styles.inputsRow}>
          <View style={styles.rowInput}>
            <Input
              label="Age"
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
              }}
            />
          </View>
          <View style={styles.rowInput}>
            <Input
              label="Height"
              textInputConfig={{
                keyboardType: "decimal-pad",
                maxLength: 5,
                autoCorrect: false,
                placeholder: "cm",
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.weightContainer}>
        <View style={styles.inputsRow}>
          <View style={styles.rowInput}>
            <Input
              label="Current Weight"
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
                placeholder: "kg",
              }}
            />
          </View>
          <View style={styles.rowInput}>
            <Input
              label="Target Weight"
              textInputConfig={{
                keyboardType: "decimal-pad",
                autoCorrect: false,
                placeholder: "kg",
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.text}>Give us an idea of your daily activity</Text>
        <View style={styles.icons}>
          <IconButton
            style={styles.high}
            label="High"
            icon="slightly-smile"
            size={40}
          />
          <IconButton
            style={styles.moderate}
            label="Moderate"
            icon="neutral"
            size={40}
          />
          <IconButton style={styles.low} label="Low" icon="dizzy" size={40} />
        </View>
      </View>
      <View style={styles.next}>
        <Button style={styles.nextBtn} onPress={goToAccountNutri}>
          Next
        </Button>
      </View>
    </View>
  );
}

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
  },
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
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  genderContainer: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ageHeightContainer: {
    flex: 0.7,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
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
