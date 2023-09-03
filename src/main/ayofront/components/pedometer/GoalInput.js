import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";
import axios from "axios";
import { GlobalStyles } from "../UI/styles";
import { LoginContext } from "../../store/LoginContext";

const GoalInput = ({ goal, onGoalChange, apiEndpoint, today }) => {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const [newGoal, setNewGoal] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const updateGoal = () => {
    if (newGoal.trim() === "") {
      console.log("Goal cannot be empty");
      setShowWarning(true);
      return;
    }
    axios
      .put(`${apiEndpoint}/api/pedometer/update-step-goal`, {
        pId: userInfo.id,
        pDate: new Date(today),
        pStepGoal: parseInt(newGoal),
      })
      .then((response) => {
        console.log(response.data);
        onGoalChange(parseInt(newGoal));
        setNewGoal("");
        setShowWarning(false);
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error("Update Failed:", error);
      });
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={isFocused ? "" : "Update your goal"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={newGoal}
        onChangeText={setNewGoal}
        inputMode="numeric"
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor={GlobalStyles.colors.primary200}
        selectionColor={GlobalStyles.colors.donutChartGreen}
        returnKeyType="done"
        onSubmitEditing={updateGoal}
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
    flex: 1,
  },
  input: {
    marginTop: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary500,
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
    color: "tomato",
    marginTop: 5,
  },
});

export default GoalInput;
