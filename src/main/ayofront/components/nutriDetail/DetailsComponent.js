import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Progress from "react-native-progress";
import {
  FaintLine,
  MyRecordsTodaysWeightContainer,
  TodaysWeightTextContainer,
  TodaysWeightText,
  TodaysWeightKg,
  DateContainer,
  DateButtonContainer,
  DateButton,
  DateButtonText,
} from "../../components/nutriDetail/StyledComponents";
import DateCalendar from "./DateCalendar";

const DetailsComponent = () => {
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

  // 각각의 원에 대한 애니메이션 값 상태
  const [carbAnimationValue, setCarbAnimationValue] = useState(
    new Animated.Value(60)
  );
  const [proteinAnimationValue, setProteinAnimationValue] = useState(
    new Animated.Value(60)
  );
  const [fatAnimationValue, setFatAnimationValue] = useState(
    new Animated.Value(60)
  );

  useEffect(() => {
    // 탄수화물, 단백질, 지방 중 가장 큰 퍼센트를 찾기
    const maxPercentage = Math.max(
      carbPercentage,
      proteinPercentage,
      fatPercentage
    );

    // 해당 원만 크기를 더 크게 설정
    if (maxPercentage === carbPercentage) {
      Animated.timing(carbAnimationValue, {
        toValue: 85,
        duration: 700,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(carbAnimationValue, {
        toValue: 60,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }

    if (maxPercentage === proteinPercentage) {
      Animated.timing(proteinAnimationValue, {
        toValue: 85,
        duration: 700,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(proteinAnimationValue, {
        toValue: 60,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }

    if (maxPercentage === fatPercentage) {
      Animated.timing(fatAnimationValue, {
        toValue: 85,
        duration: 700,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fatAnimationValue, {
        toValue: 60,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  }, [carbPercentage, proteinPercentage, fatPercentage]);

  const [dateButton, setDateButton] = useState(0);
  const mode = ["Day", "Week", "Month"][dateButton];

  return (
    <View>
      <DateContainer>
        <DateButtonContainer>
          {["Day", "Week", "Month"].map((dateButtonText, index) => (
            <DateButton
              key={dateButtonText}
              isActive={dateButton === index}
              onPress={() => setDateButton(index)}
            >
              <DateButtonText isActive={dateButton === index}>
                {dateButtonText}
              </DateButtonText>
            </DateButton>
          ))}
        </DateButtonContainer>
        <DateCalendar mode={mode} />
      </DateContainer>

      <View style={styles.dateNutritionInfo}>
        <Text style={{ color: "#000000", fontWeight: "500", fontSize: 16 }}>
          Daily Calorie Consumption :{" "}
          <Text style={{ color: "#FB9129", fontWeight: "600", fontSize: 17 }}>
            {Math.round(totalCalories)} kcal
          </Text>
        </Text>
        <View style={styles.faintLine} />
        <View style={styles.mainNutritionDetailsContainer}>
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={carbPercentage / 100}
              width={160}
              height={12}
              color={"#E0F0B5"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <Text style={styles.progressBarPer}>
              {carbPercentage.toFixed(2)}% / 100
            </Text>
            <Progress.Bar
              progress={proteinPercentage / 100}
              width={160}
              height={12}
              color={"#FFEC99"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <Text style={styles.progressBarPer}>
              {proteinPercentage.toFixed(2)}% / 100
            </Text>
            <Progress.Bar
              progress={fatPercentage / 100}
              width={160}
              height={12}
              color={"#FFD6D1"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <Text style={styles.progressBarPer}>
              {fatPercentage.toFixed(2)}% / 100
            </Text>
          </View>
          <View style={styles.progressBarValueContainer}>
            <View style={styles.rectangleContainer}>
              <Image
                source={require("../../assets/rectangleCarb.png")}
                style={{
                  height: 18,
                  width: 18,
                }}
              />
              <Image
                source={require("../../assets/rectangleProtein.png")}
                style={{
                  height: 18,
                  width: 18,
                }}
              />
              <Image
                source={require("../../assets/rectangleFat.png")}
                style={{
                  height: 18,
                  width: 18,
                }}
              />
            </View>
            <View style={styles.nutritionValueContainer}>
              <Text style={styles.nutritionValueText}>Carb</Text>
              <Text style={styles.nutritionValue}>{totalCarbohydrate} g</Text>
              <Text style={styles.nutritionValueText}>Protein</Text>
              <Text style={styles.nutritionValue}>{totalProtein} g</Text>
              <Text style={styles.nutritionValueText}>Fat</Text>
              <Text style={styles.nutritionValue}>{totalFat} g</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressBarBottomContainer}>
          <View style={styles.calorieFireContainer}>
            <Image
              source={require("../../assets/calorieFire.png")}
              style={{
                height: 32,
                width: 32,
                marginRight: 18,
              }}
            />
          </View>
          <View style={styles.activityCalorieContainer}>
            <Text style={styles.activityCalorieText}>
              Daily Activity Level : Active
            </Text>
            <Text style={styles.activityCalorieText}>
              Calorie Needs Per Day : 2,400 kcal
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.resetNutritionContainer}>
        <TouchableOpacity style={styles.resetGoalButton}>
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
            Reset your goal
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 312,
          height: 220,
          backgroundColor: "white",
          marginTop: 20,
        }}
      ></View>
      <View style={styles.diamondContainer}>
        {/* 첫 번째 원 */}
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: "#FFD6D1",
              width: fatAnimationValue,
              height: fatAnimationValue,
            },
          ]}
        >
          <Text>{`${fatPercentage.toFixed(2)}%`}</Text>
        </Animated.View>

        {/* 두 번째 원 */}
        <View style={styles.circleRow}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: "#E2F0B5",
                width: carbAnimationValue,
                height: carbAnimationValue,
              },
            ]}
          >
            <Text>{`${carbPercentage.toFixed(2)}%`}</Text>
          </Animated.View>
          {/* 세 번째 원 */}
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: "#FFEC99",
                width: proteinAnimationValue,
                height: proteinAnimationValue,
              },
            ]}
          >
            <Text>{`${proteinPercentage.toFixed(2)}%`}</Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({
  diamondContainer: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginTop: 20,
  },
  circleRow: {
    flexDirection: "row",
    marginTop: -6,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1.6,
  },
  dateNutritionInfo: {
    width: "92%",
    height: "31%",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
    paddingTop: 10,
    alignItems: "center",
    // justifyContent: "center",
  },
  faintLine: {
    height: 1,
    width: "92%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginVertical: 8,
  },
  mainNutritionDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    height: "56%",
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.65)",
  },
  progressBarContainer: {
    height: "100%",
    justifyContent: "space-evenly",
    marginTop: 6,
    marginLeft: 12,
  },
  progressBarPer: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
  },
  rectangleContainer: {
    justifyContent: "space-around",
    height: "100%",
    marginTop: -1.6,
    marginLeft: 20,
  },
  progressBarValueContainer: {
    flexDirection: "row",
  },
  nutritionValueContainer: {
    justifyContent: "space-evenly",
    height: "100%",
    marginTop: 3.2,
    marginLeft: 18,
  },
  nutritionValueText: {
    marginTop: 16,
    fontSize: 17.5,
    fontWeight: "600",
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.5)",
  },
  progressBarBottomContainer: {
    flexDirection: "row",
    width: "100%",
    height: "28.6%",
    alignItems: "center",
    justifyContent: "center",
  },
  activityCalorieText: {
    marginVertical: 4,
    color: "rgba(0, 0, 0, 0.7)",
  },
  resetNutritionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  resetGoalButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 42,
    backgroundColor: "#E46C0A",
    borderRadius: 18,
  },
});
