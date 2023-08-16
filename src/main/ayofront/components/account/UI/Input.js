import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { GlobalStyles } from "../../UI/styles";

function Input({ label, textInputConfig, style }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, style]} {...textInputConfig}></TextInput>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 20,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 20,
  },
});
