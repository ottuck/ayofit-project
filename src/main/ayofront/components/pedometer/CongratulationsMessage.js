import React, { useState, useEffect } from "react";
import { Animated, Easing, Image, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../components/UI/styles";

const CongratulationsMessage = ({ isVisible }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, opacity]);

  return isVisible ? (
    <Animated.View style={[styles.container, { opacity }]}>
      <LinearGradient
        colors={[
          GlobalStyles.colors.gradientYellow,
          GlobalStyles.colors.gradientGreen,
        ]}
        style={styles.gradientBackground}
      >
        <Image
          source={require("../../assets/confetti-icon.png")}
          style={{
            height: 100,
            width: 100,
          }}
        />
        <Text style={styles.msgTitle}>Congratulations!</Text>
        <Text style={styles.msgContent}>You've successfully achieved</Text>
        <Text style={styles.msgContent}>today's step target</Text>
      </LinearGradient>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  msgTitle: {
    color: GlobalStyles.colors.blackOpacity50,
    fontSize: 32,
    fontWeight: "bold",
  },
  msgContent: {
    color: GlobalStyles.colors.blackOpacity50,
    fontSize: 18,
    textAlign: "center",
  },
  gradientBackground: {
    width: "80%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

export default CongratulationsMessage;
