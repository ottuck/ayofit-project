import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
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
  FaintLineContainer,
  WeightFaintLine,
  LittleFaintLine,
  LatestWeightView,
  LatestWeightText,
  LatestWeightKg,
  WeightChartTop,
  WeightChartTopText,
  GoalNutriRatioContainer,
  GoalNutriRatioView,
  GoalNutriRatioViewText,
} from "../../components/nutriDetail/StyledComponents";
import DateCalendar from "./DateCalendar";
import WeightCalendar from "./WeightCalendar";
import { LoginContext } from "../../store/LoginContext";
import { useNavigation } from "@react-navigation/native";

const DetailsComponent = () => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  //const uri = "http://213.35.96.167";

  const { userInfo, setUserInfo } = useContext(LoginContext);
  const navigation = useNavigation();

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
  const [calendarMode, setCalendarMode] = useState("Daily");
  const [resetWeightDate, setResetWeightDate] = useState(false);
  const [chartData, setChartData] = useState({
    lineData: [],
    barDataWithLabels: [],
  });
  const [dailyWeightData, setDailyWeightData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  let todayInTokyo = new Date();
  todayInTokyo.setHours(todayInTokyo.getHours() + 9); // 도쿄 시간대에 맞게 시간을 조정.
  let formattedToday = todayInTokyo.toISOString().split("T")[0]; // ISO 형식을 사용하여 날짜만 가져오기.
  let formattedMonth = formattedToday.substring(0, 7) + "-01"; // 월의 시작 날짜를 설정.
  let weekStartDate = new Date();
  weekStartDate.setDate(todayInTokyo.getDate() - 6);
  weekStartDate = weekStartDate.toISOString().split("T")[0];
  // formattedMonth += "01"; 위에서 "-01"을 붙이지 않을 경우 두줄로 이렇게도 작성할수있음.
  // console.log(formattedMonth); 2023-08-01

  const fetchDailyWeightsByUserId = (rId, formattedToday) => {
    axios
      .get(`${uri}/api/weights/daily/${rId}/${formattedToday}`)
      .then((response) => {
        // console.log(response.data);
        setDailyWeightData(response.data.reverse());
      })
      .catch((error) => {
        console.log("Error: ", error);
        if (error.response) {
          console.log("Response Data: ", error.response.data);
          console.log("Response Status: ", error.response.status);
        }
      });
  };

  const fetchWeeklyAveragesByUserId = (rId, formattedToday) => {
    axios
      .get(`${uri}/api/weights/weekly-averages/${rId}/${formattedToday}`)
      .then((response) => {
        // console.log(response.data);
        setWeeklyData(response.data.reverse());
      })
      .catch((error) => {
        console.log("Error: ", error);
        if (error.response) {
          console.log("Response Data: ", error.response.data);
          console.log("Response Status: ", error.response.status);
        }
      });
  };

  const fetchMonthlyAveragesByUserId = (rId, formattedToday) => {
    axios
      .get(`${uri}/api/weights/monthly-averages/${rId}/${formattedToday}`)
      .then((response) => {
        // console.log(response.data);
        setMonthlyData(response.data.reverse());
      })
      .catch((error) => {
        console.log("Error: ", error);
        if (error.response) {
          console.log("Response Data: ", error.response.data);
          console.log("Response Status: ", error.response.status);
        }
      });
  };

  const createChartData = () => {
    if (dailyWeightData.length === 0)
      return { lineData: [], barDataWithLabels: [] };

    let lineData = [];
    let barDataWithLabels = [];

    // 데이터의 길이에 따라서 반복 횟수를 결정
    const loopCount = Math.min(7, dailyWeightData.length);
    for (let i = 0; i < loopCount; i++) {
      const data = dailyWeightData[i];

      const adjustedValue = data.weight === 0 ? data.weight + 10 : data.weight; // 'rWeight'를 'weight'로 변경
      const dataPointTextString =
        data.weight === 0
          ? "   " + data.weight.toString() // 'rWeight'를 'weight'로 변경
          : data.weight.toString(); // 'rWeight'를 'weight'로 변경

      lineData.push({
        value: adjustedValue,
        dataPointText: dataPointTextString,
      });

      const labelDate =
        i === 6 ? "Today" : data.date.substring(5).replace("-", "/"); // 'rWeightDate'를 'date'로 변경

      barDataWithLabels.push({
        value: data.weight, // 'rWeight'를 'weight'로 변경
        topLabelComponent: () => (
          <Text
            style={{
              color: "#d88b4b",
              fontSize: 16.5,
              fontWeight: 600,
              width: 42,
              height: 23,
              textAlign: "center",
            }}
          >
            {data.weight}
          </Text>
        ),
        label: labelDate,
        labelWidth: 24,
        frontColor: "#f5d0b1",
      });
    }

    return { lineData, barDataWithLabels };
  };

  const createWeeklyChartData = () => {
    let lineData = [];
    let barDataWithLabels = [];

    if (!weeklyData || !weeklyData.length)
      return { lineData, barDataWithLabels };

    let endDate = new Date(weeklyData[weeklyData.length - 1].dateRange.end);
    endDate.setHours(endDate.getHours() + 9);

    for (let i = 0; i < 4; i++) {
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 6);

      const searchRange = {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      };

      let data = weeklyData.find(
        (d) =>
          d.dateRange.start === searchRange.start &&
          d.dateRange.end === searchRange.end
      );

      if (!data) continue; // data가 없는 경우를 처리
      const adjustedValue = data.average;
      lineData.push({
        value: adjustedValue + 10,
        dataPointText: adjustedValue.toString(),
      });

      const labelDateParts = data.dateRange.start
        .split("-")
        .concat(data.dateRange.end.split("-"));
      const formattedStartDate = `${labelDateParts[1]}/${labelDateParts[2]} ~`;
      const formattedEndDate = `${labelDateParts[4]}/${labelDateParts[5]}`;
      const labelDate = `${formattedStartDate}\n${formattedEndDate}`;

      // const labelDate = `${data.dateRange.start} ~ ${data.dateRange.end}`;
      barDataWithLabels.push({
        value: adjustedValue,
        topLabelComponent: () => (
          <Text
            style={{
              color: "#d88b4b",
              fontSize: 16.5,
              fontWeight: 600,
              width: 42,
              height: 23.8,
              textAlign: "center",
            }}
          >
            {adjustedValue}
          </Text>
        ),
        label: labelDate.replace(/-/g, "/"),
        labelWidth: 26.6,
        frontColor: "#f5d0b1",
      });

      endDate.setDate(endDate.getDate() - 7);
    }

    lineData = lineData.reverse();
    barDataWithLabels = barDataWithLabels.reverse();

    return { lineData, barDataWithLabels };
  };

  const createMonthlyChartData = () => {
    let lineData = [];
    let barDataWithLabels = [];

    if (!monthlyData || !monthlyData.length)
      return { lineData, barDataWithLabels };

    for (let data of monthlyData) {
      const adjustedValue = data.average;
      lineData.push({
        value: adjustedValue + 10,
        dataPointText: adjustedValue.toString(),
      });

      const labelDateParts = data.month ? data.month.split("-") : [];
      const labelDate =
        labelDateParts.length > 1
          ? `${labelDateParts[0]}/${labelDateParts[1]}`
          : "";

      barDataWithLabels.push({
        value: adjustedValue,
        topLabelComponent: () => (
          <Text
            style={{
              color: "#d88b4b",
              fontSize: 16.5,
              fontWeight: "600",
              width: 42,
              height: 23.8,
              textAlign: "center",
            }}
          >
            {adjustedValue}
          </Text>
        ),
        label: labelDate,
        labelWidth: 21.5,
        frontColor: "#f5d0b1",
      });
    }

    return { lineData, barDataWithLabels };
  };

  useEffect(() => {
    if (calendarMode === "Daily") {
      const { lineData, barDataWithLabels } = createChartData();
      setChartData({ lineData, barDataWithLabels });
    }
  }, [dailyWeightData]);

  useEffect(() => {
    if (calendarMode === "Weekly") {
      const { lineData, barDataWithLabels } = createWeeklyChartData();
      setChartData({ lineData, barDataWithLabels });
    }
  }, [weeklyData]);

  useEffect(() => {
    if (calendarMode === "Monthly") {
      const { lineData, barDataWithLabels } = createMonthlyChartData();
      setChartData({ lineData, barDataWithLabels });
    }
  }, [monthlyData]);

  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i <= 6; i++) {
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
      .get(`${uri}/api/nutrition/daily/${userInfo.id}/${specificDate}`)
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
      .get(`${uri}/api/nutrition/weekly/${userInfo.id}/${startDate}/${endDate}`)
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
      .get(
        `${uri}/api/nutrition/monthly/${userInfo.id}/${startDate}/${endDate}`
      )
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
    fetchWeightByDateAndId(userInfo.id, formattedToday);
    fetchAllWeightsByUserId(userInfo.id);
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
        endpoint = `${uri}/api/nutrition/daily/${userInfo.id}/${formattedToday}`;
        console.log(endpoint);
        break;
      case "weekly":
        endpoint = `${uri}/api/nutrition/weekly/${userInfo.id}/${weekStartDate}/${formattedToday}`;
        console.log(endpoint);
        break;
      case "monthly":
        endpoint = `${uri}/api/nutrition/monthly/${userInfo.id}/${formattedMonth}/${formattedToday}`;
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
    getAccountGoals();
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

  const [goals, setGoals] = useState({});

  const getAccountGoals = () => {
    axios
      .get(`${uri}/api/account/${userInfo.id}/goal`)
      .then((response) => {
        // console.log(response.data);
        setGoals(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MY PAGE");
            }}
          >
            <DetailsResetButtonText>Reset your goal</DetailsResetButtonText>
          </TouchableOpacity>
        </DetailsResetGoalButton>
      </DetailsResetButtonContainer>

      <FaintLineContainer>
        <LittleFaintLine />
        <WeightFaintLine />
        <LittleFaintLine />
      </FaintLineContainer>

      <DateContainer>
        <DateButtonContainer>
          <DateButton
            onPress={() => {
              if (calendarMode !== "Daily") {
                setCalendarMode("Daily");
                // 필요한 다른 로직 추가
              }
              setResetWeightDate((prev) => !prev); // 날짜 초기화 로직을 if문 밖으로 뺐습니다.
            }}
            isActive={calendarMode === "Daily"}
          >
            <DateButtonText isActive={calendarMode === "Daily"}>
              Daily
            </DateButtonText>
          </DateButton>

          <DateButton
            onPress={() => {
              if (calendarMode !== "Weekly") {
                setCalendarMode("Weekly");
                fetchWeeklyAveragesByUserId(userInfo.id, formattedToday);
                createWeeklyChartData();
              }
              setResetWeightDate((prev) => !prev); // 날짜 초기화
            }}
            isActive={calendarMode === "Weekly"}
          >
            <DateButtonText isActive={calendarMode === "Weekly"}>
              Weekly
            </DateButtonText>
          </DateButton>

          <DateButton
            onPress={() => {
              if (calendarMode !== "Monthly") {
                setCalendarMode("Monthly");
                const formattedMonthly = new Date().toISOString().split("T")[0];
                fetchMonthlyAveragesByUserId(userInfo.id, formattedMonthly);
              }
              setResetWeightDate((prev) => !prev); // 날짜 초기화
            }}
            isActive={calendarMode === "Monthly"}
          >
            <DateButtonText isActive={calendarMode === "Monthly"}>
              Monthly
            </DateButtonText>
          </DateButton>
        </DateButtonContainer>
      </DateContainer>

      <WeightCalendar
        calendarMode={calendarMode}
        onResetDate={resetWeightDate}
        onDateChange={(newDate) => {
          // 새로운 날짜가 선택될 때마다 이 callback이 호출됨.
          if (calendarMode === "Daily") {
            const formattedDaily = newDate.toISOString().split("T")[0];
            fetchDailyWeightsByUserId(userInfo.id, formattedDaily);
          } else if (calendarMode === "Weekly") {
            const formattedWeekly = newDate.toISOString().split("T")[0];
            fetchWeeklyAveragesByUserId(userInfo.id, formattedWeekly);
          } else if (calendarMode === "Monthly") {
            const formattedMonthly = newDate.toISOString().split("T")[0];
            fetchMonthlyAveragesByUserId(userInfo.id, formattedMonthly);
          }
        }}
      />

      <LatestWeightView>
        <LatestWeightText>The latest recorded Weight : </LatestWeightText>
        <LatestWeightKg>
          {recordedWeight ? parseFloat(recordedWeight).toFixed(1) : "00.0"} Kg
        </LatestWeightKg>
      </LatestWeightView>

      <View style={styles.detailsWeightChart}>
        <WeightChartTop>
          <Image
            source={require("../../assets/avatar.png")}
            style={{
              width: 72,
              height: 72,
            }}
          />
          <WeightChartTopText>My weight changes</WeightChartTopText>
          <Image
            source={require("../../assets/combinedChart.png")}
            style={{
              width: 46,
              height: 50,
              top: 12,
            }}
          />
        </WeightChartTop>
        <View style={styles.LineChartContainer}>
          <LineChart
            initialSpacing={
              calendarMode === "Monthly"
                ? 28.6
                : calendarMode === "Weekly"
                ? 19.8
                : 20
            }
            maxValue={200}
            data={chartData.lineData}
            spacing={
              calendarMode === "Monthly"
                ? 137.2
                : calendarMode === "Weekly"
                ? 92
                : 47.8
            }
            textColor1="#e17319"
            textShiftY={-14.2}
            textShiftX={calendarMode === "Weekly" ? -10 : -16.2}
            textFontSize={17.5}
            thickness={5.2}
            hideAxesAndRules
            hideVerticalLines
            yAxisColor="rgba(228, 108, 10, 0.85)"
            xAxisColor="rgba(228, 108, 10, 0.85)"
            color="rgba(228, 108, 10, 0.65)"
            height={100}
          />
        </View>

        <View style={styles.BarChartContainer}>
          <BarChart
            data={chartData.barDataWithLabels}
            barWidth={
              calendarMode === "Monthly"
                ? 48
                : calendarMode === "Weekly"
                ? 22.8
                : 20
            }
            maxValue={200}
            initialSpacing={
              calendarMode === "Monthly"
                ? 23.8
                : calendarMode === "Weekly"
                ? 18.2
                : 17.5
            }
            spacing={
              calendarMode === "Monthly"
                ? 80
                : calendarMode === "Weekly"
                ? 68
                : 28
            }
            barBorderRadius={4}
            hideAxesAndRules
            noOfSections={3}
            yAxisThickness={0}
            xAxisThickness={0}
            height={400}
            width={Dimensions.get("window").width - 16}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 32,
          marginBottom: -9,
          left: -3,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MY PAGE");
          }}
        >
          <GoalNutriRatioViewText>My Goals</GoalNutriRatioViewText>
        </TouchableOpacity>
        <Image
          source={require("../../assets/dateRight.png")}
          style={{
            width: 17,
            height: 21,
            left: -19.6,
            top: 2,
            tintColor: "orange", // 이미지의 색상을 오렌지로 변경
          }}
        />
      </View>

      <GoalNutriRatioContainer>
        <GoalNutriRatioView>
          <GoalNutriRatioViewText>Weight</GoalNutriRatioViewText>
          <GoalNutriRatioViewText>{goals.tarWeight}kg</GoalNutriRatioViewText>
        </GoalNutriRatioView>
        <GoalNutriRatioView>
          <GoalNutriRatioViewText>Calorie</GoalNutriRatioViewText>
          <GoalNutriRatioViewText>{goals.calorie} kcal</GoalNutriRatioViewText>
        </GoalNutriRatioView>
        <GoalNutriRatioView>
          <GoalNutriRatioViewText>MacroRatio</GoalNutriRatioViewText>
          <GoalNutriRatioViewText>
            {goals.carb} : {goals.protein} : {goals.fat}
          </GoalNutriRatioViewText>
        </GoalNutriRatioView>
      </GoalNutriRatioContainer>
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
  detailsWeightChart: {
    alignItems: "center",
    justifyContent: "center",
    width: "92%",
    height: 480,
    borderRadius: 16,
    marginTop: 28,
    marginHorizontal: 18,
    backgroundColor: "#FFF4EC",
  },
  LineChartContainer: {
    width: "100%",
    top: -72,
    left: -0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  BarChartContainer: {
    bottom: 150,
    left: -0.8,
    width: "100%",
    height: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
});
