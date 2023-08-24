import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { GlobalStyles } from "../UI/styles";

const GoalInput = ({ initialGoal, onGoalChange, apiEndpoint, today }) => {
  // const [newGoal, setNewGoal] = useState(initialGoal.toString());
  const [newGoal, setNewGoal] = useState();

  const updateGoal = () => {
    axios
      .put(`${apiEndpoint}/api/pedometer/update-step-goal`, {
        pId: "user4", // 사용자 ID 설정
        pDate: new Date(today), // 오늘 날짜
        pStepGoal: parseInt(newGoal),
      })
      .then((response) => {
        console.log(response.data); // "Step goal updated successfully"
        onGoalChange(parseInt(newGoal)); // 업데이트된 목표 값을 부모 컴포넌트로 전달
        setNewGoal(""); // 입력 필드 비우기
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
        keyboardType="numeric"
      />
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
});

export default GoalInput;
