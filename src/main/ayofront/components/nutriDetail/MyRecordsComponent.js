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
import { ScrollView } from "react-native";
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
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateMeals, setSelectedDateMeals] = useState([]);
  const [dailyNutrition, setDailyNutrition] = useState([]);
  const [monthlyNutrition, setMonthlyNutrition] = useState([]);

  let totalCarbohydrate = 0;
  let totalProtein = 0;
  let totalFat = 0;

  if (selectedDateMeals.length > 0 && selectedDateMeals[0]) {
    totalCarbohydrate = selectedDateMeals[0].totalCarbohydrate;
    totalProtein = selectedDateMeals[0].totalProtein;
    totalFat = selectedDateMeals[0].totalFat;
  }

  let totalCalories = totalCarbohydrate * 4 + totalProtein * 4 + totalFat * 9;

  const todayInTokyo = new Date();
  todayInTokyo.setHours(todayInTokyo.getHours() + 9); // 도쿄 시간대에 맞게 시간을 조정.
  const formattedToday = todayInTokyo.toISOString().split("T")[0]; // ISO 형식을 사용하여 날짜만 가져오기.
  let formattedMonth = formattedToday.substring(0, 7) + "-01"; // 월의 시작 날짜를 설정.
  // formattedMonth += "01"; 위에서 "-01"을 붙이지 않을 경우 두줄로 이렇게도 작성할수있음.
  // console.log(formattedMonth); 2023-08-01

  const getTodayNutrition = () => {
    axios
      .get(`${uri}/api/nutrition/daily/user1/${formattedToday}`)
      .then((response) => {
        // console.log(response.data);
        setSelectedDate(formattedToday);
        setSelectedDateMeals(response.data);
      })
      .catch((error) => console.log(error));
  };

  // const getMonthNutrition = () => {
  //   axios
  //     .get(`${uri}/api/nutrition/monthly/user1/${formattedMonth}`)
  //     .then((response) => {
  //       // console.log(response.data);
  //       setSelectedDate(formattedMonth);
  //       setSelectedDateMeals(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    axios
      .get(`${uri}/api/nutrition/daily/user1/${formattedToday}`)
      .then((response) => {
        console.log(response.data);
        setDailyNutrition(response.data);
      })
      .catch((error) => console.log(error));
    getTodayNutrition();

    // axios
    //   .get(`${uri}/api/nutrition/monthly/user1/${formattedMonth}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setMonthlyNutrition(response.data);
    //   })
    //   .catch((error) => console.log(error));
    // getMonthNutrition();
  }, []);

  let totalNutrients =
    (selectedDateMeals[0]?.totalCarbohydrate || 0) +
    (selectedDateMeals[0]?.totalProtein || 0) +
    (selectedDateMeals[0]?.totalFat || 0);

  let carbPercentage =
    (selectedDateMeals[0]?.totalCarbohydrate / totalNutrients) * 100 || 0;
  let proteinPercentage =
    (selectedDateMeals[0]?.totalProtein / totalNutrients) * 100 || 0;
  let fatPercentage =
    (selectedDateMeals[0]?.totalFat / totalNutrients) * 100 || 0;
  return (
    <MyRecordsDailyNutritionContainer>
      <DailyConsumptionContainer>
        <DailyConsumptionText>
          Daily Calorie Consumption :{" "}
        </DailyConsumptionText>
        <DailyConsumptionKcal>
          {Math.floor(totalCalories)} kcal
        </DailyConsumptionKcal>
      </DailyConsumptionContainer>
      <FaintLine></FaintLine>
      <CircularProgressContainer>
        <AnimatedCircularProgress
          size={110}
          width={7}
          fill={carbPercentage}
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
          fill={proteinPercentage}
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
          fill={fatPercentage}
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
