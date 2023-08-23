import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
  TextInput,
  Button,
  Modal,
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
  RecordsWeightButtonContainer,
  RecordsWeightButton,
  RecordsWeightButtonText,
  RecordsModalWeightButton,
  RecordsModalWeightButtonText,
  RecordsModalWeightCloseButton,
  RecordsModalWeightCloseButtonText,
  RecordsModalWeightCloseContainer,
  RecordsModalWeightInfoText,
  RecordsWeightModalView,
  RecordsWeightModalInput,
  RecordsModalButtonsContainer,
  RecordsModalFixAndDeleteButton,
  RecordsModalFixAndDeleteButtonText,
} from "../../components/nutriDetail/StyledComponents";

const MyRecordsComponent = () => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateMeals, setSelectedDateMeals] = useState([]);
  const [dailyNutrition, setDailyNutrition] = useState([]);
  const [monthlyNutrition, setMonthlyNutrition] = useState([]);
  const [weight, setWeight] = useState(0); // 기록된 체중 없을때 체중 기록 저장
  const [modalVisible, setModalVisible] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false); // 체중 기록 유무 확인
  const [recordedWeight, setRecordedWeight] = useState(0); // 기록된 체중
  const [weightData, setWeightData] = useState([]); // 차트에 몸무게 여러개담는 데이터

  // console.log(weightData);

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

  const isValidWeight = (weight) => {
    if (!weight || weight.trim() === "") {
      return false;
    }

    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber)) {
      return false;
    }

    // 소수점 두 번째 자리 이후의 값이 있는지 체크
    if (Math.floor(weightNumber * 10) !== weightNumber * 10) {
      return false;
    }

    return weightNumber >= 0.1 && weightNumber <= 200;
  };

  const fetchAllWeightsByUserId = (rId) => {
    axios
      .get(`${uri}/api/weights/user/${rId}`)
      .then((response) => {
        // console.log(response.data);
        const sortedData = response.data.sort(
          (a, b) => new Date(a.rWeightDate) - new Date(b.rWeightDate) // 날짜를 오름차순으로 정렬
        );
        const recentData = sortedData.slice(0, 7); // 최근 7일의 데이터만 가져오기
        setWeightData(recentData);
      })
      .catch((error) => console.log(error));
  };

  const fetchWeightByDateAndId = (rId, rWeightDate) => {
    axios
      .get(`${uri}/api/weights/${rId}/${rWeightDate}`)
      .then((response) => {
        console.log(response.data);
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

  const addOrModifyWeight = () => {
    if (!isValidWeight(weight)) {
      alert("Please enter a number from 0.1 to 200.");
      return;
    }
    let rToday = new Date();
    rToday.setHours(rToday.getHours() + 9);
    let formattedRecordToday = rToday.toISOString().split("T")[0];
    const record = {
      rId: "user3",
      rWeight: parseFloat(weight),
      rWeightDate: formattedRecordToday,
    };

    if (hasRecorded) {
      // 이미 체중이 기록되어 있으면 수정
      updateWeight();
    } else {
      // 체중 기록이 없으면 추가
      axios
        .post(`${uri}/api/weights`, record)
        .then((response) => {
          console.log(response.data);
          setHasRecorded(true);
          setRecordedWeight(weight);
        })
        .catch((error) => console.log(error));
    }
  };

  const deleteWeight = (rId, rWeightDate) => {
    axios
      .delete(`${uri}/api/weights/${rId}/${rWeightDate}`)
      .then((response) => {
        console.log(response.data);
        setHasRecorded(false);
        setRecordedWeight(0);
      })
      .catch((error) => console.log(error));
  };

  const updateWeight = () => {
    if (!isValidWeight(weight)) {
      alert("Please enter a number from 0.1 to 200.");
      return;
    }
    let rToday = new Date();
    rToday.setHours(rToday.getHours() + 9);
    let formattedRecordToday = rToday.toISOString().split("T")[0];
    const record = {
      rId: "user3",
      rWeight: parseFloat(weight),
      rWeightDate: formattedRecordToday,
    };

    axios
      .put(`${uri}/api/weights/update`, record)
      .then((response) => {
        console.log(response.data);
        setHasRecorded(true);
        setRecordedWeight(weight);
      })
      .catch((error) => console.log(error));
  };

  const chartData = {
    labels:
      weightData.length > 0
        ? weightData.map((item) =>
            item.rWeightDate.substring(3).replace("-", "/")
          )
        : ["데이터 없음"],
    datasets: [
      {
        data:
          weightData.length > 0 ? weightData.map((item) => item.rWeight) : [0],
      },
    ],
  };

  useEffect(() => {
    getNutritionData(formattedToday);
    fetchWeightByDateAndId("user3", formattedToday);
    fetchAllWeightsByUserId("user3");
  }, []);

  console.log(weightData);

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
          <TodaysWeightKg>
            {recordedWeight ? parseFloat(recordedWeight).toFixed(1) : "00.0"} Kg
          </TodaysWeightKg>
        </TodaysWeightTextContainer>
        <FaintLine></FaintLine>
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 56}
          height={186}
          yAxisSuffix="kg"
          yAxisInterval={7}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#FFF4EC",
            backgroundGradientFrom: "#FFF4EC",
            backgroundGradientTo: "#FFF4EC",
            decimalPlaces: 1,
            color: (opacity = 1) => "#E46C0A",
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          style={{
            marginVertical: 12,
            marginLeft: 2, // 왼쪽 마진
            marginRight: 12, // 오른쪽 마진
          }}
        />
        <RecordsWeightButtonContainer>
          <RecordsWeightButton onPress={() => setModalVisible(true)}>
            <RecordsWeightButtonText>
              {hasRecorded ? "Modifying Weight" : "Recording Weight"}
            </RecordsWeightButtonText>
          </RecordsWeightButton>
        </RecordsWeightButtonContainer>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <RecordsWeightModalView>
            <RecordsModalWeightCloseContainer>
              <RecordsModalWeightInfoText>
                {hasRecorded ? "Modifying Weight" : "Recording Weight"}
              </RecordsModalWeightInfoText>
              <RecordsModalWeightCloseButton
                onPress={() => setModalVisible(false)}
              >
                <RecordsModalWeightCloseButtonText>
                  X
                </RecordsModalWeightCloseButtonText>
              </RecordsModalWeightCloseButton>
            </RecordsModalWeightCloseContainer>

            <RecordsWeightModalInput
              placeholder={hasRecorded ? `${recordedWeight} kg` : "00.0 kg"}
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
              defaultValue={recordedWeight ? recordedWeight.toString() : ""}
            />
            {hasRecorded ? (
              <>
                <RecordsModalButtonsContainer>
                  <RecordsModalFixAndDeleteButton
                    onPress={() => {
                      updateWeight();
                      setModalVisible(false);
                    }}
                  >
                    <RecordsModalFixAndDeleteButtonText>
                      Modify
                    </RecordsModalFixAndDeleteButtonText>
                  </RecordsModalFixAndDeleteButton>
                  <RecordsModalFixAndDeleteButton
                    onPress={() => {
                      deleteWeight("user3", formattedToday);
                      setModalVisible(false);
                    }}
                  >
                    <RecordsModalFixAndDeleteButtonText>
                      Delete
                    </RecordsModalFixAndDeleteButtonText>
                  </RecordsModalFixAndDeleteButton>
                </RecordsModalButtonsContainer>
              </>
            ) : (
              <RecordsModalWeightButton
                onPress={() => {
                  addOrModifyWeight();
                  setModalVisible(false);
                }}
              >
                <RecordsModalWeightButtonText>
                  Finish Record
                </RecordsModalWeightButtonText>
              </RecordsModalWeightButton>
            )}
          </RecordsWeightModalView>
        </Modal>
      </MyRecordsTodaysWeightContainer>
    </MyRecordsDailyNutritionContainer>
  );
};

export default MyRecordsComponent;

const styles = StyleSheet.create({});
