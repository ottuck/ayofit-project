import { Image, Pressable, StyleSheet, View, Text } from "react-native";

function ImageButton({ label, src, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.imageContainer}>
        <Image source={src} style={styles.image} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default ImageButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 0,
  },
});
