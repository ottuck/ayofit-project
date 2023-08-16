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
  const [weeklyNutrition, setWeeklyNutrition] = useState([]);
  const [monthlyNutrition, setMonthlyNutrition] = useState([]);

  const [dailyTotalCarbohydrate, setDailyTotalCarbohydrate] = useState(0);
  const [dailyTotalProtein, setDailyTotalProtein] = useState(0);
  const [dailyTotalFat, setDailyTotalFat] = useState(0);
  const [weeklyTotalCarbohydrate, setWeeklyTotalCarbohydrate] = useState(0);
  const [weeklyTotalProtein, setWeeklyTotalProtein] = useState(0);
  const [weeklyTotalFat, setWeeklyTotalFat] = useState(0);
  const [monthlyTotalCarbohydrate, setMonthlyTotalCarbohydrate] = useState(0);
  const [monthlyTotalProtein, setMonthlyTotalProtein] = useState(0);
  const [monthlyTotalFat, setMonthlyTotalFat] = useState(0);

  const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [carbPercentage, setCarbPercentage] = useState(0);
  const [proteinPercentage, setProteinPercentage] = useState(0);
  const [fatPercentage, setFatPercentage] = useState(0);

  let todayInTokyo = new Date();
  todayInTokyo.setHours(todayInTokyo.getHours() + 9); // 도쿄 시간대에 맞게 시간을 조정.
  let formattedToday = todayInTokyo.toISOString().split("T")[0]; // ISO 형식을 사용하여 날짜만 가져오기.
  let formattedMonth = formattedToday.substring(0, 7) + "-01"; // 월의 시작 날짜를 설정.
  // formattedMonth += "01"; 위에서 "-01"을 붙이지 않을 경우 두줄로 이렇게도 작성할수있음.
  // console.log(formattedMonth); 2023-08-01

  const computeNutritionForMode = () => {
    let carbs, proteins, fats;

    switch (mode) {
      case "Day":
        if (dailyNutrition[0]) {
          carbs = dailyNutrition[0].totalCarbohydrate;
          proteins = dailyNutrition[0].totalProtein;
          fats = dailyNutrition[0].totalFat;
        }
        break;

      case "Week":
        carbs = weeklyTotalCarbohydrate;
        proteins = weeklyTotalProtein;
        fats = weeklyTotalFat;
        break;
      case "Month":
        if (monthlyNutrition[0]) {
          carbs = monthlyNutrition[0].totalCarbohydrate;
          proteins = monthlyNutrition[0].totalProtein;
          fats = monthlyNutrition[0].totalFat;
        }
        break;
      default:
        break;
    }

    const calories = carbs * 4 + proteins * 4 + fats * 9;
    let totalNutrients = carbs + proteins + fats;

    const carbPercent = totalNutrients ? (carbs / totalNutrients) * 100 : 0;
    const proteinPercent = totalNutrients
      ? (proteins / totalNutrients) * 100
      : 0;
    const fatPercent = totalNutrients ? (fats / totalNutrients) * 100 : 0;

    setTotalCarbohydrate(carbs);
    setTotalProtein(proteins);
    setTotalFat(fats);
    setTotalCalories(calories);
    setCarbPercentage(carbPercent);
    setProteinPercentage(proteinPercent);
    setFatPercentage(fatPercent);
  };

  const getTodayNutrition = () => {
    axios
      .get(`${uri}/api/nutrition/daily/user1/${formattedToday}`)
      .then((response) => {
        setSelectedDate(formattedToday);
        setSelectedDateMeals(response.data);
        setDailyNutrition(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getWeeklyNutrition = () => {
    axios
      .get(`${uri}/api/nutrition/weekly/user1`)
      .then((response) => {
        const data = response.data[0];
        setWeeklyTotalCarbohydrate(data.totalCarbohydrate);
        setWeeklyTotalProtein(data.totalProtein);
        setWeeklyTotalFat(data.totalFat);
        setWeeklyNutrition(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getMonthNutrition = () => {
    axios
      .get(`${uri}/api/nutrition/monthly/user1/${formattedMonth}`)
      .then((response) => {
        setSelectedDate(formattedMonth);
        setSelectedDateMeals(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodayNutrition();
    getWeeklyNutrition();
    getMonthNutrition();
  }, []);

  let totalNutrients =
    (selectedDateMeals[0]?.totalCarbohydrate || 0) +
    (selectedDateMeals[0]?.totalProtein || 0) +
    (selectedDateMeals[0]?.totalFat || 0);

  let computedCarbPercentage =
    (selectedDateMeals[0]?.totalCarbohydrate / totalNutrients) * 100 || 0;
  let computedProteinPercentage =
    (selectedDateMeals[0]?.totalProtein / totalNutrients) * 100 || 0;
  let computedFatPercentage =
    (selectedDateMeals[0]?.totalFat / totalNutrients) * 100 || 0;

  // 각각의 원에 대한 애니메이션 값 상태
  const [carbAnimationValue, setCarbAnimationValue] = useState(
    new Animated.Value(65)
  );
  const [proteinAnimationValue, setProteinAnimationValue] = useState(
    new Animated.Value(65)
  );
  const [fatAnimationValue, setFatAnimationValue] = useState(
    new Animated.Value(65)
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
        toValue: 65,
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
        toValue: 65,
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
        toValue: 65,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  }, [carbPercentage, proteinPercentage, fatPercentage]);

  const [dateButton, setDateButton] = useState(0);
  const mode = ["Day", "Week", "Month"][dateButton];

  const fetchData = (mode) => {
    let endpoint = "";
    switch (mode) {
      case "daily":
        endpoint = `${uri}/api/nutrition/daily/user1/${formattedToday}`;
        break;
      case "weekly":
        endpoint = `${uri}/api/nutrition/weekly/user1`;
        break;
      case "monthly":
        endpoint = `${uri}/api/nutrition/monthly/user1/${formattedMonth}`;
        break;
      default:
        break;
    }

    axios
      .get(endpoint)
      .then((response) => {
        if (mode === "daily") {
          setSelectedDateMeals(response.data);
        } else if (mode === "weekly") {
          setWeeklyNutrition(response.data);
        } else if (mode === "monthly") {
          setMonthlyNutrition(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDateButtonClick = (index) => {
    setDateButton(index);
    const modes = ["daily", "weekly", "monthly"];
    fetchData(modes[index]);
  };

  const handleDateChange = (newDate) => {
    // 새로운 날짜를 받아서 데이터를 다시 요청합니다.
    fetchData(newDate);
  };

  useEffect(() => {
    fetchData("daily");
  }, []);

  useEffect(() => {
    computeNutritionForMode();
  }, [
    dateButton,
    dailyNutrition,
    weeklyNutrition,
    monthlyNutrition,
    weeklyTotalCarbohydrate,
    weeklyTotalProtein,
    weeklyTotalFat,
  ]);

  return (
    <View>
      <DateContainer>
        <DateButtonContainer>
          {["Day", "Week", "Month"].map((dateButtonText, index) => (
            <DateButton
              key={dateButtonText}
              isActive={dateButton === index}
              onPress={() => handleDateButtonClick(index)}
            >
              <DateButtonText isActive={dateButton === index}>
                {dateButtonText}
              </DateButtonText>
            </DateButton>
          ))}
        </DateButtonContainer>
        <DateCalendar mode={mode} onDateChange={handleDateChange} />
      </DateContainer>

      <View style={styles.dateNutritionInfo}>
        <Text style={{ color: "#000000", fontWeight: "500", fontSize: 18 }}>
          Daily Calorie Consumption :{" "}
          <Text style={{ color: "#FB9129", fontWeight: "600", fontSize: 19 }}>
            {Math.round(totalCalories)} kcal
          </Text>
        </Text>
        <View style={styles.faintLine} />
        <View style={styles.mainNutritionDetailsContainer}>
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={carbPercentage / 100}
              width={172}
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
              width={172}
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
              width={172}
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "rgba(0, 0, 0, 0.8)",
            }}
          >{`${fatPercentage.toFixed(2)}%`}</Text>
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >{`${carbPercentage.toFixed(2)}%`}</Text>
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.8)",
              }}
            >{`${proteinPercentage.toFixed(2)}%`}</Text>
          </Animated.View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Text>Carb</Text>
          <Text>Protein</Text>
          <Text>Fat</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({
  diamondContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    width: "92%",
    height: 180,
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 16,
  },
  circleRow: {
    flexDirection: "row",
    marginTop: -8,
    marginLeft: -10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  dateNutritionInfo: {
    width: "92%",
    height: "42%",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
    paddingTop: 10,
    alignItems: "center",
    // justifyContent: "center",
  },
  faintLine: {
    height: 1.2,
    width: "92%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    marginVertical: 12.6,
  },
  mainNutritionDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    width: "92%",
    height: "56%",
    borderRadius: 16,
  },
  progressBarContainer: {
    height: "100%",
    justifyContent: "space-evenly",
    marginTop: 6,
    marginLeft: 22,
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
    marginLeft: 22,
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
    fontSize: 17.6,
    fontWeight: "600",
  },
  nutritionValue: {
    fontSize: 16.2,
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
