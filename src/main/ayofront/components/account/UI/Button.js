import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../UI/styles";

function Button({ children, onPress, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={(pressed) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  buttonText: {
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.5,
  },
});
