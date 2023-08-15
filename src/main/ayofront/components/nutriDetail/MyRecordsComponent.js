import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  MyRecordsDailyNutritionContainer,
  CircularProgressContainer,
  CircularProgressTextContainer,
  CircularProgressCarbText,
  CircularProgressPercentage,
  DailyConsumptionContainer,
  DailyConsumptionKcal,
  DailyConsumptionText,
  FaintLine,
  MyRecordsTodaysWeightContainer,
  TodaysWeightTextContainer,
  TodaysWeightText,
  TodaysWeightKg,
} from "../../components/nutriDetail/StyledComponents";

const MyRecordsComponent = () => {
  return (
    <MyRecordsDailyNutritionContainer>
      <DailyConsumptionContainer>
        <DailyConsumptionText>
          Daily Calorie Consumption :{" "}
        </DailyConsumptionText>
        <DailyConsumptionKcal>2,010 kcal</DailyConsumptionKcal>
      </DailyConsumptionContainer>
      <FaintLine></FaintLine>
      <CircularProgressContainer>
        <AnimatedCircularProgress
          size={110}
          width={7}
          fill={55}
          tintColor="#E2F0B5"
          backgroundColor="rgba(0, 0, 0, 0.2)"
        >
          {(fill) => (
            <CircularProgressTextContainer>
              <CircularProgressCarbText>Carb</CircularProgressCarbText>
              <CircularProgressPercentage>
                {fill.toFixed(2)}%
              </CircularProgressPercentage>
            </CircularProgressTextContainer>
          )}
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          size={110}
          width={7}
          fill={35}
          tintColor="#FFEC99"
          backgroundColor="rgba(0, 0, 0, 0.2)"
        >
          {(fill) => (
            <CircularProgressTextContainer>
              <CircularProgressCarbText>Protein</CircularProgressCarbText>
              <CircularProgressPercentage>
                {fill.toFixed(2)}%
              </CircularProgressPercentage>
            </CircularProgressTextContainer>
          )}
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          size={110}
          width={7}
          fill={75}
          tintColor="#FFD6D1"
          backgroundColor="rgba(0, 0, 0, 0.2)"
        >
          {(fill) => (
            <CircularProgressTextContainer>
              <CircularProgressCarbText>Fat</CircularProgressCarbText>
              <CircularProgressPercentage>
                {fill.toFixed(2)}%
              </CircularProgressPercentage>
            </CircularProgressTextContainer>
          )}
        </AnimatedCircularProgress>
      </CircularProgressContainer>
      <MyRecordsTodaysWeightContainer>
        <TodaysWeightTextContainer>
          <TodaysWeightText>Today's Weight : </TodaysWeightText>
          <TodaysWeightKg>72.3 Kg</TodaysWeightKg>
        </TodaysWeightTextContainer>
        <FaintLine></FaintLine>
      </MyRecordsTodaysWeightContainer>
    </MyRecordsDailyNutritionContainer>
  );
};

export default MyRecordsComponent;

const styles = StyleSheet.create({});
