import { Pressable, StyleSheet, View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress, label, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.btnContainer}>
        <Fontisto name={icon} size={size} color={color} />
        <Text style={[styles.iconText, style]}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  iconText: {
    textAlign: "center",
    marginTop: 5,
  },
});
