import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { GlobalStyles } from "../../components/UI/styles";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PedometerContext } from "../../store/PedometerContext";
import SwipeButton from "rn-swipe-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DailyGoalInputScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const [inputGoal, setInputGoal] = useState("");
  const [goalAdded, setGoalAdded] = useState(false);
  const navigation = useNavigation();

  const { todayData, setTodayData, setGoal } = useContext(PedometerContext);

  const submitGoal = async () => {
    try {
      const userId = "user4";

      await axios.post(`${uri}/api/pedometer/add-goal`, {
        pId: userId,
        pStepGoal: inputGoal,
        pDate: new Date().toISOString().split("T")[0],
      });

      console.log("Goal added on the server.");
      setGoalAdded(true);
      setTodayData(true);
      setGoal(inputGoal);
    } catch (error) {
      console.error("Failed to add goal on the server:", error);
    }
  };

  // goalAdded 값이 변경되면 화면을 다시 렌더링
  useEffect(() => {
    if (goalAdded) {
      navigation.goBack(); // 이전 화면으로 돌아감
    }
  }, [goalAdded]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={require("../../assets/wavy-frame.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          {/* <Image
            style={styles.goalIcon}
            source={require("../../assets/goal-target-icon.png")}
          /> */}
          <Text style={styles.goalText}>Enter your daily goal:</Text>
          <TextInput
            style={styles.input}
            value={inputGoal}
            onChangeText={(text) => setInputGoal(text)}
            keyboardType="numeric"
            selectionColor={GlobalStyles.colors.primary200}
          />
          {/* <TouchableOpacity onPress={submitGoal} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}

          <SwipeButton
            disabled={false}
            swipeSuccessThreshold={70}
            height={45}
            width={220}
            title="     Swipe to Submit"
            titleStyles={styles.swipeText}
            thumbIconComponent={() => (
              <MaterialCommunityIcons name="rabbit" size={24} color="white" />
            )}
            onSwipeSuccess={submitGoal}
            railFillBackgroundColor={GlobalStyles.colors.gradientYellow}
            railFillBorderColor="white"
            thumbIconBackgroundColor="#ed9a73"
            thumbIconBorderColor="white"
            railBackgroundColor={GlobalStyles.colors.gradientGreen}
            railBorderColor="transparent"
          ></SwipeButton>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goalIcon: {
    width: 80,
    height: 80,
  },
  goalText: {
    fontSize: 22,
    color: GlobalStyles.colors.primary500,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold_Italic",
  },
  input: {
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    width: 200,
    borderRadius: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.gradientGreen,
    width: 100,
    height: 50,
    borderRadius: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 50,
  },
  swipeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DailyGoalInputScreen;
