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
        behavior={Platform.OS === "ios" ? "padding" : ""}
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
          />
          {/* <TouchableOpacity onPress={submitGoal} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}

          <SwipeButton
            disabled={false}
            //disable the button by doing true (Optional)
            swipeSuccessThreshold={70}
            height={45}
            //height of the button (Optional)
            width={240}
            //width of the button (Optional)
            title="Swipe to Submit"
            //Text inside the button (Optional)
            //thumbIconImageSource={thumbIcon}
            //You can also set your own icon for the button (Optional)
            onSwipeSuccess={submitGoal}
            //After the completion of swipe (Optional)
            railFillBackgroundColor={GlobalStyles.colors.gradientYellow} //(Optional)
            railFillBorderColor="white" //(Optional)
            thumbIconBackgroundColor="#ed9a73" //(Optional)
            thumbIconBorderColor="white" //(Optional)
            railBackgroundColor={GlobalStyles.colors.gradientGreen} //(Optional)
            railBorderColor="transparent" //(Optional)
            style={styles.swipeText}
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
    fontSize: 24,
    color: GlobalStyles.colors.primary500,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "OpenSans_700Bold_Italic",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: 200,
  },
  button: {
    backgroundColor: GlobalStyles.colors.gradientGreen,
    width: 100,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  swipeText: {
    color: "white",
    fontSize: 18,
  },
});

export default DailyGoalInputScreen;
