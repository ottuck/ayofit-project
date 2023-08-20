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

  const [userWeightData, setUserWeightData] = useState([
    { date: "2023-08-15", weight: 58.2 },
    { date: "2023-08-16", weight: 58.2 },
    { date: "2023-08-17", weight: 58.0 },
    // ... add below data
  ]);

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

  const getNutritionData = (date) => {
    axios
      .get(`${uri}/api/nutrition/daily/user1/${date}`)
      .then((response) => {
        console.log(response.data);
        setDailyNutrition(response.data);
        setSelectedDate(date);
        setSelectedDateMeals(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getNutritionData(formattedToday);
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
        <LineChart
          data={{
            labels: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
            datasets: [
              {
                data: [58.2, 58.2, 58, 58.5, 58.2, 58.5, 58.3], // 여기에 몸무게 데이터
                color: () => "#E46C0A", // 라인 색상 지정
                strokeWidth: 3,
              },
            ],
          }}
          width={Dimensions.get("window").width - 58} // 차트 넓이 조절
          height={186} // 차트 높이 조절
          yAxisSuffix="kg"
          yAxisInterval={7}
          chartConfig={{
            backgroundColor: "#FFF4EC",
            backgroundGradientFrom: "#FFF4EC",
            backgroundGradientTo: "#FFF4EC",
            decimalPlaces: 1,
            color: (opacity = 1) => "#E46C0A",
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "2",
            },
            propsForBackgroundLines: {
              // 이 속성으로 그리드 라인을 숨김
              strokeWidth: 0,
            },
            propsForVerticalLabels: {
              // 이 속성으로 세로 라벨을 숨김
              opacity: 1,
            },
          }}
          bezier // 선을 부드럽게 만드는 속성
          style={{
            marginVertical: 8,
            marginLeft: 16, // 왼쪽 마진 추가
            marginRight: 16, // 오른쪽 마진 추가
            borderRadius: 16,
          }}
        />
      </MyRecordsTodaysWeightContainer>
    </MyRecordsDailyNutritionContainer>
  );
};

export default MyRecordsComponent;

const styles = StyleSheet.create({});
