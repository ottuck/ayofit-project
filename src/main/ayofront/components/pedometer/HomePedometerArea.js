import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomePedometerProgressBar from "../../components/pedometer/HomePedometerProgressBar";
import { PedometerContext } from "../../store/PedometerContext";
import { GlobalStyles } from "../UI/styles";

const HomePedometerArea = () => {
  const { todayData } = useContext(PedometerContext);
  //   console.log("Has recorded today? : " + todayData);

  useEffect(() => {
    // console.log("Has recorded today? : " + todayData);
  }, [todayData]);

  const navigation = useNavigation();

  const navigateToStepCounter = () => {
    navigation.navigate("STEP COUNTER");
  };

  return (
    <TouchableOpacity onPress={navigateToStepCounter}>
      {todayData ? (
        <HomePedometerProgressBar />
      ) : (
        <View style={styles.blurBox}>
          <Text style={styles.blurText}>🎯 Set Today's Step Goal 🎯</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = {
  blurBox: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  blurText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
};

export default HomePedometerArea;
