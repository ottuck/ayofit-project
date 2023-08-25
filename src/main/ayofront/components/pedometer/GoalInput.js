import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { GlobalStyles } from "../UI/styles";

const GoalInput = ({ goal, onGoalChange, apiEndpoint, today }) => {
  const [newGoal, setNewGoal] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const updateGoal = () => {
    if (newGoal.trim() === "") {
      console.log("Goal cannot be empty");
      setShowWarning(true);
      return;
    }
    axios
      .put(`${apiEndpoint}/api/pedometer/update-step-goal`, {
        pId: "user4",
        pDate: new Date(today),
        pStepGoal: parseInt(newGoal),
      })
      .then((response) => {
        console.log(response.data); // "Step goal updated successfully"
        onGoalChange(parseInt(newGoal));
        setNewGoal(""); // Empty input field
        setShowWarning(false); // Hide the warning
      })
      .catch((error) => {
        console.error("Update Failed:", error);
      });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={newGoal}
        onChangeText={setNewGoal}
        inputMode="numeric"
        keyboardType="numeric"
        maxLength={10}
      />
      {showWarning && (
        <Text style={styles.warningText}>Set your step target here</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={updateGoal}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
  },
  input: {
    marginTop: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 200,
  },
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  warningText: {
    color: "red",
    marginTop: 5,
  },
});

export default GoalInput;
