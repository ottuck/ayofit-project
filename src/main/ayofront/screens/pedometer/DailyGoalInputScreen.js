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
  const uri = "http://213.35.96.167/";
  const navigation = useNavigation();

  const [inputGoal, setInputGoal] = useState("");
  const [goalAdded, setGoalAdded] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const { todayData, setTodayData, setGoal } = useContext(PedometerContext);

  const submitGoal = async () => {
    if (!inputGoal) {
      setShowWarning(true);
      return;
    }
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

  useEffect(() => {
    if (goalAdded) {
      navigation.goBack();
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
          <Text style={styles.goalText}>Enter your daily goal:</Text>
          <TextInput
            style={styles.input}
            value={inputGoal}
            onChangeText={(text) => setInputGoal(text)}
            keyboardType="numeric"
            selectionColor={GlobalStyles.colors.primary200}
          />

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
            shouldResetAfterSuccess={true}
          />
          {showWarning && (
            <Text style={styles.warningText}>
              Please enter a goal before submitting.
            </Text>
          )}
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
  warningText: {
    color: "tomato",
    fontSize: 14,
    marginTop: 10,
  },
  swipeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DailyGoalInputScreen;
