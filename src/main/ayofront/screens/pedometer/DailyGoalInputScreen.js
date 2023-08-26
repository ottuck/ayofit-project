import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { GlobalStyles } from "../../components/UI/styles";
import { Image } from "react-native";

function DailyGoalInputScreen({ navigation }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const [inputGoal, setInputGoal] = useState("");

  const submitGoal = async () => {
    try {
      const userId = "user4";

      await axios.post(`${uri}/api/pedometer/add-goal`, {
        pId: userId,
        pGoal: inputGoal,
        pDate: new Date().toISOString().split("T")[0],
      });

      console.log("Goal added on the server.");
    } catch (error) {
      console.error("Failed to add goal on the server:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.goalIcon}
        source={require("../../assets/goal-target-icon.png")}
      />
      <Text style={styles.goalText}>Enter your daily goal:</Text>
      <TextInput
        style={styles.input}
        value={inputGoal}
        onChangeText={(text) => setInputGoal(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={submitGoal} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
  },
  goalIcon: {
    width: 100,
    height: 100,
  },
  goalText: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
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
});

export default DailyGoalInputScreen;
