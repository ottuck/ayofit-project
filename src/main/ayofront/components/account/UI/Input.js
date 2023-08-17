import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { GlobalStyles } from "../../UI/styles";

function Input({ label, textInputConfig, style, labelStyle }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: GlobalStyles.colors.whiteOpacity50,
    padding: 6,
    paddingLeft: 10,
    borderRadius: 20,
    fontSize: 20,
    borderWidth: 1,
  },
});
