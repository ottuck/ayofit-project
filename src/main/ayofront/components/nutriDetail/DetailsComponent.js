import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { BarChart } from "react-native-gifted-charts";
import * as Progress from "react-native-progress";
import {
  DateContainer,
  DateButtonContainer,
  DateButton,
  DateButtonText,
  DetailsNutritionInfo,
  DetailsCalConsumptionText,
  DetailsCalConsumptionKcal,
  DetailsFaintLine,
  DetailsBarAndValueContainer,
  DetailsProgressBarContainer,
  DetailsProgressBarPer,
  DetailsNutrionImgContainer,
  DetailsNutritionGramContainer,
  DetailsGramContainer,
  DetailsGramText,
  DetailsGramValue,
  DetailsProgressBarBottomContainer,
  DetailsActivityCalorieText,
  DetailsResetButtonContainer,
  DetailsResetGoalButton,
  DetailsResetButtonText,
  DetailsCircleContainer,
  DetailsCircleRow,
  WeightCalendarButton,
  WeightCalendarButtonText,
} from "../../components/nutriDetail/StyledComponents";
import DateCalendar from "./DateCalendar";

const DetailsComponent = () => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [selectedDateMeals, setSelectedDateMeals] = useState([]);
  const [resetDate, setResetDate] = useState(false);
  const [dailyNutrition, setDailyNutrition] = useState([]);
  const [weeklyNutrition, setWeeklyNutrition] = useState([]);
  const [monthlyNutrition, setMonthlyNutrition] = useState([]);

  const [dailyTotalCarbohydrate, setDailyTotalCarbohydrate] = useState(0);
  const [dailyTotalProtein, setDailyTotalProtein] = useState(0);
  const [dailyTotalFat, setDailyTotalFat] = useState(0);

  const [weeklyStartDate, setWeeklyStartDate] = useState(weekStartDate);
  const [weeklyEndDate, setWeeklyEndDate] = useState(formattedToday);
  const [weeklyTotalCarbohydrate, setWeeklyTotalCarbohydrate] = useState(0);
  const [weeklyTotalProtein, setWeeklyTotalProtein] = useState(0);
  const [weeklyTotalFat, setWeeklyTotalFat] = useState(0);

  const [monthlyStartDate, setMonthlyStartDate] = useState(formattedMonth);
  const [monthlyEndDate, setMonthlyEndDate] = useState(formattedToday);
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

  const [isWeeklyConsumption, setIsWeeklyConsumption] = useState(false);
  const [isMonthlyConsumption, setIsMonthlyConsumption] = useState(false);

  const [hasRecorded, setHasRecorded] = useState(false); // 체중 기록 유무 확인
  const [recordedWeight, setRecordedWeight] = useState(0); // 기록된 체중
  const [weightData, setWeightData] = useState([]); // 차트에 몸무게 여러개담는 데이터

  let todayInTokyo = new Date();
  todayInTokyo.setHours(todayInTokyo.getHours() + 9); // 도쿄 시간대에 맞게 시간을 조정.
  let formattedToday = todayInTokyo.toISOString().split("T")[0]; // ISO 형식을 사용하여 날짜만 가져오기.
  let formattedMonth = formattedToday.substring(0, 7) + "-01"; // 월의 시작 날짜를 설정.
  let weekStartDate = new Date();
  weekStartDate.setDate(todayInTokyo.getDate() - 6);
  weekStartDate = weekStartDate.toISOString().split("T")[0];
  // formattedMonth += "01"; 위에서 "-01"을 붙이지 않을 경우 두줄로 이렇게도 작성할수있음.
  // console.log(formattedMonth); 2023-08-01

  const fetchWeeklyAveragesByUserId = (rId, formattedToday) => {
    axios
      .get(`${uri}/api/weights/weekly-averages/${rId}/${formattedToday}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        if (error.response) {
          console.log("Response Data: ", error.response.data);
          console.log("Response Status: ", error.response.status);
        }
      });
  };

  fetchWeeklyAveragesByUserId("user3", formattedToday);
  // fetchWeeklyAveragesByUserId("user3", "2023-07-28");

  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i <= 6; i++) {
      // i의 시작값을 5에서 시작하도록 수정
      const d = new Date();
      d.setHours(d.getHours() + 9);
      d.setDate(d.getDate() - i);
      const formatted = `${String(d.getFullYear()).substr(2)}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      dates.push(formatted);
    }
    return dates;
  };

  const fillMissingDates = (data) => {
    const last7Days = getLast7Days();
    const filledData = last7Days.map((date) => {
      const found = data.find((item) => item.rWeightDate === date);
      if (found) return found;
      return {
        rId: "0",
        rNo: 0,
        rWeight: 0,
        rWeightDate: date,
      };
    });
    return filledData;
  };

  const fetchAllWeightsByUserId = (rId) => {
    axios
      .get(`${uri}/api/weights/user/${rId}`)
      .then((response) => {
        // console.log(response.data);
        const sortedData = fillMissingDates(response.data).sort(
          (a, b) => new Date(a.rWeightDate) - new Date(b.rWeightDate) // 날짜를 오름차순으로 정렬
        );
        setWeightData(sortedData);
      })
      .catch((error) => console.log(error));
  };

  const fetchWeightByDateAndId = (rId, rWeightDate) => {
    axios
      .get(`${uri}/api/weights/${rId}/${rWeightDate}`)
      .then((response) => {
        // console.log(response.data);
        if (response.data) {
          setHasRecorded(true);
          setRecordedWeight(response.data.rWeight);
        } else {
          setHasRecorded(false);
          setRecordedWeight(0);
        }
      })
      .catch((error) => console.log(error));
  };

  const createChartData = () => {
    if (weightData.length === 0) return { lineData: [], barDataWithLabels: [] };

    let lineData = [];
    let barDataWithLabels = [];
    for (let i = 0; i < 7; i++) {
      const data = weightData[i];
      const adjustedValue =
        data.rWeight === 0 ? data.rWeight + 10 : data.rWeight;
      const dataPointTextString =
        data.rWeight === 0
          ? "   " + data.rWeight.toString()
          : data.rWeight.toString();

      lineData.push({
        value: adjustedValue,
        dataPointText: dataPointTextString,
      });
      barDataWithLabels.push({
        value: data.rWeight,
        topLabelComponent: () => (
          <Text
            style={{
              color: "#d88b4b",
              fontSize: 16.5, // 세미콜론을 쉼표로 수정
              fontWeight: 600, // 세미콜론을 쉼표로 수정
              width: 42,
              height: 23,
              textAlign: "center",
            }}
          >
            {data.rWeight}
          </Text>
        ),
        label:
          i === 6 ? "Today" : data.rWeightDate.substring(3).replace("-", "/"),
        labelWidth: 24,
        frontColor: "#f5d0b1",
      });
    }
    return { lineData, barDataWithLabels };
  };

  const { lineData, barDataWithLabels } = createChartData();

  // const { lineData, barDataWithLabels } = createWeeklyChartData(weeklyAverages);

  const computeNutritionForMode = () => {
    let carbs, proteins, fats;

    switch (mode) {
      case "Day":
        carbs = dailyTotalCarbohydrate;
        proteins = dailyTotalProtein;
        fats = dailyTotalFat;
        break;

      case "Week":
        carbs = weeklyTotalCarbohydrate;
        proteins = weeklyTotalProtein;
        fats = weeklyTotalFat;
        break;
      case "Month":
        carbs = monthlyTotalCarbohydrate;
        proteins = monthlyTotalProtein;
        fats = monthlyTotalFat;
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

  const getTodayNutrition = (specificDate = formattedToday) => {
    // 초기화
    setDailyTotalCarbohydrate(0);
    setDailyTotalProtein(0);
    setDailyTotalFat(0);
    setDailyNutrition([]);

    axios
      .get(`${uri}/api/nutrition/daily/user1/${specificDate}`)
      .then((response) => {
        if (response.data[0] !== null) {
          const data = response.data[0];
          setDailyTotalCarbohydrate(data.totalCarbohydrate);
          setDailyTotalProtein(data.totalProtein);
          setDailyTotalFat(data.totalFat);
          setDailyNutrition(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getWeeklyNutrition = (
    startDate = weekStartDate,
    endDate = formattedToday
  ) => {
    setWeeklyTotalCarbohydrate(0);
    setWeeklyTotalProtein(0);
    setWeeklyTotalFat(0);
    setWeeklyNutrition([]);
    axios
      .get(`${uri}/api/nutrition/weekly/user1/${startDate}/${endDate}`)
      .then((response) => {
        if (response.data[0] !== null) {
          const data = response.data[0];
          setWeeklyTotalCarbohydrate(data.totalCarbohydrate);
          setWeeklyTotalProtein(data.totalProtein);
          setWeeklyTotalFat(data.totalFat);
          setWeeklyNutrition(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getMonthNutrition = (
    startDate = formattedMonth,
    endDate = formattedToday
  ) => {
    setMonthlyTotalCarbohydrate(0);
    setMonthlyTotalProtein(0);
    setMonthlyTotalFat(0);
    setMonthlyNutrition([]);
    axios
      .get(`${uri}/api/nutrition/monthly/user1/${startDate}/${endDate}`)
      .then((response) => {
        if (response.data[0] !== null) {
          const data = response.data[0];
          setMonthlyTotalCarbohydrate(data.totalCarbohydrate);
          setMonthlyTotalProtein(data.totalProtein);
          setMonthlyTotalFat(data.totalFat);
          setMonthlyNutrition(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodayNutrition();
    getWeeklyNutrition();
    getMonthNutrition();
    fetchWeightByDateAndId("user3", formattedToday);
    fetchAllWeightsByUserId("user3");
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
  totalCarbohydrate;

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
        console.log(endpoint);
        break;
      case "weekly":
        endpoint = `${uri}/api/nutrition/weekly/user1/${weekStartDate}/${formattedToday}`;
        console.log(endpoint);
        break;
      case "monthly":
        endpoint = `${uri}/api/nutrition/monthly/user1/${formattedMonth}/${formattedToday}`;
        console.log(endpoint);
        break;
      default:
        break;
    }

    axios
      .get(endpoint)
      .then((response) => {
        if (mode === "daily") {
          setDailyNutrition(response.data);
          getTodayNutrition(formattedToday);
        } else if (mode === "weekly") {
          setWeeklyNutrition(response.data);
          getWeeklyNutrition(weekStartDate, formattedToday);
        } else if (mode === "monthly") {
          setMonthlyNutrition(response.data);
          getMonthNutrition(formattedMonth, formattedToday);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDateButtonClick = (index) => {
    if (dateButton === index) {
      setResetDate(!resetDate); // 현재 상태를 반전시켜 변경을 감지
    }
    setDateButton(index);
    const modes = ["daily", "weekly", "monthly"];
    fetchData(modes[index]);

    // 주간 버튼과 월간 버튼을 눌렀을 때 Text 변경
    if (index === 1) {
      setIsWeeklyConsumption(true);
      setIsMonthlyConsumption(false);
    } else if (index === 2) {
      setIsWeeklyConsumption(false);
      setIsMonthlyConsumption(true);
    } else {
      setIsWeeklyConsumption(false);
      setIsMonthlyConsumption(false);
    }
  };

  const handleDateChange = (newDate) => {
    // 새로운 날짜를 받아서 데이터를 다시 요청
    let formattedNewDate = newDate.toISOString().split("T")[0];
    console.log(formattedNewDate); // 하루, 일주일, 한달 - 날짜변경시 -

    switch (
      mode // mode 변수를 사용해 현재 설정된 모드를 확인
    ) {
      case "Day":
        getTodayNutrition(formattedNewDate);
        break;
      case "Week":
        // 주의 첫날을 계산
        let weekStartDate = new Date(newDate);
        weekStartDate.setDate(newDate.getDate() - 6); // 일주일 전 날짜로 설정
        let calculatedWeekStart = weekStartDate.toISOString().split("T")[0];
        setWeeklyStartDate(calculatedWeekStart);
        setWeeklyEndDate(formattedNewDate);

        getWeeklyNutrition(calculatedWeekStart, formattedNewDate); // 날짜변경시에도 주의 시작날짜로 요청
        break;
      case "Month":
        // 월의 첫날을 계산
        let monthStartDate =
          newDate.toISOString().split("T")[0].substring(0, 7) + "-01";
        console.log(monthStartDate);

        let monthEnd = new Date(formattedNewDate);
        monthEnd.setMonth(monthEnd.getMonth() + 1, 0); // 월의 마지막날
        monthEnd = monthEnd.toISOString().split("T")[0];
        console.log(monthEnd);
        // ex: 2023-07-31, // 2023-08-31

        setMonthlyStartDate(monthStartDate);
        setMonthlyEndDate(monthEnd);

        getMonthNutrition(monthStartDate, monthEnd);
        break;
      default:
        break;
    }
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
        <DateCalendar
          mode={mode}
          onDateChange={handleDateChange}
          resetDate={resetDate}
        />
      </DateContainer>

      <DetailsNutritionInfo>
        <DetailsCalConsumptionText>
          {isWeeklyConsumption
            ? "Weekly"
            : isMonthlyConsumption
            ? "Monthly"
            : "Daily"}{" "}
          Calorie Consumption :{" "}
          <DetailsCalConsumptionKcal>
            {Math.round(totalCalories)} kcal
          </DetailsCalConsumptionKcal>
        </DetailsCalConsumptionText>

        <DetailsFaintLine />
        <DetailsBarAndValueContainer>
          <DetailsProgressBarContainer>
            <Progress.Bar
              progress={carbPercentage / 100}
              width={172}
              height={12}
              color={"#E0F0B5"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <DetailsProgressBarPer>
              {carbPercentage.toFixed(2)}% / 100
            </DetailsProgressBarPer>
            <Progress.Bar
              progress={proteinPercentage / 100}
              width={172}
              height={12}
              color={"#FFEC99"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <DetailsProgressBarPer>
              {proteinPercentage.toFixed(2)}% / 100
            </DetailsProgressBarPer>
            <Progress.Bar
              progress={fatPercentage / 100}
              width={172}
              height={12}
              color={"#FFD6D1"}
              backgroundColor={"rgba(0, 0, 0, 0.2)"}
              borderWidth={0}
            />
            <DetailsProgressBarPer>
              {fatPercentage.toFixed(2)}% / 100
            </DetailsProgressBarPer>
          </DetailsProgressBarContainer>
          <DetailsNutritionGramContainer>
            <DetailsNutrionImgContainer>
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
            </DetailsNutrionImgContainer>
            <DetailsGramContainer>
              <DetailsGramText>Carb</DetailsGramText>
              <DetailsGramValue>{totalCarbohydrate} g</DetailsGramValue>
              <DetailsGramText>Protein</DetailsGramText>
              <DetailsGramValue>{totalProtein} g</DetailsGramValue>
              <DetailsGramText>Fat</DetailsGramText>
              <DetailsGramValue>{totalFat} g</DetailsGramValue>
            </DetailsGramContainer>
          </DetailsNutritionGramContainer>
        </DetailsBarAndValueContainer>
        <DetailsProgressBarBottomContainer>
          <View>
            <Image
              source={require("../../assets/calorieFire.png")}
              style={{
                height: 32,
                width: 32,
                marginRight: 18,
              }}
            />
          </View>
          <View>
            <DetailsActivityCalorieText>
              Daily Activity Level : Active
            </DetailsActivityCalorieText>
            <DetailsActivityCalorieText>
              Calorie Needs Per Day : 2,400 kcal
            </DetailsActivityCalorieText>
          </View>
        </DetailsProgressBarBottomContainer>
      </DetailsNutritionInfo>
      <DetailsResetButtonContainer>
        <DetailsResetGoalButton>
          <DetailsResetButtonText>Reset your goal</DetailsResetButtonText>
        </DetailsResetGoalButton>
      </DetailsResetButtonContainer>

      <View style={styles.DetailsWeightChart}>
        <View style={styles.testtt}>
          <WeightCalendarButton>
            <WeightCalendarButtonText>Daily</WeightCalendarButtonText>
          </WeightCalendarButton>
          <WeightCalendarButton>
            <WeightCalendarButtonText>Weekly</WeightCalendarButtonText>
          </WeightCalendarButton>
          <WeightCalendarButton>
            <WeightCalendarButtonText>Monthly</WeightCalendarButtonText>
          </WeightCalendarButton>
        </View>
        <View style={styles.LineChartContainer}>
          <LineChart
            initialSpacing={19.8}
            maxValue={130}
            data={lineData}
            spacing={48.6}
            textColor1="#e17319"
            textShiftY={-13.8}
            textShiftX={-16.2}
            textFontSize={17.5}
            thickness={5.2}
            hideAxesAndRules
            hideVerticalLines
            yAxisColor="rgba(228, 108, 10, 0.85)"
            xAxisColor="rgba(228, 108, 10, 0.85)"
            color="rgba(228, 108, 10, 0.65)"
            height={152}
          />
        </View>
        <View style={styles.BarChartContainer}>
          <BarChart
            data={barDataWithLabels}
            barWidth={20.8}
            maxValue={90}
            initialSpacing={18}
            spacing={28.4}
            barBorderRadius={4}
            hideAxesAndRules
            noOfSections={3}
            yAxisThickness={0}
            xAxisThickness={0}
            height={168}
            width={Dimensions.get("window").width - 16}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  DetailsWeightChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "92%",
    height: 460,
    borderRadius: 16,
    marginTop: 22,
    marginHorizontal: 18,
    backgroundColor: "#FFF4EC",
  },
  LineChartContainer: {
    width: "100%",
    top: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  BarChartContainer: {
    bottom: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  testtt: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 26,
  },
});
