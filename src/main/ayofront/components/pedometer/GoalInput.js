import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";

const GoalInput = ({ newGoal, onGoalChange, onUpdateGoal }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your goal"
        value={newGoal}
        onChangeText={onGoalChange}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={onUpdateGoal}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // borderWidth: 2,
    // borderColor: "tomato",
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
});

export default GoalInput;
