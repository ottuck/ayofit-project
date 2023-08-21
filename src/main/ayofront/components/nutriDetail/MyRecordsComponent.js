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
    const weightNumber = parseFloat(weight);
    if (isNaN(weightNumber)) {
      return false;
    }
    return weightNumber >= 0.1 && weightNumber <= 200;
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
      alert("0.1에서 200 사이의 숫자를 입력해주세요.");
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

  const deleteWeight = () => {
    axios
      .delete(`${uri}/api/weights/delete/user3`)
      .then((response) => {
        console.log(response.data);
        setHasRecorded(false);
        setRecordedWeight(0);
      })
      .catch((error) => console.log(error));
  };

  const updateWeight = () => {
    if (!isValidWeight(weight)) {
      alert("0.1에서 200 사이의 숫자를 입력해주세요.");
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

  useEffect(() => {
    getNutritionData(formattedToday);
    fetchWeightByDateAndId("user3", formattedToday);
  }, []);

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
        <RecordsWeightButtonContainer>
          <RecordsWeightButton onPress={() => setModalVisible(true)}>
            <RecordsWeightButtonText>
              {hasRecorded ? "체중 수정하기" : "체중 기록하기"}
            </RecordsWeightButtonText>
          </RecordsWeightButton>
        </RecordsWeightButtonContainer>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <RecordsWeightModalView>
            <RecordsModalWeightCloseContainer>
              <RecordsModalWeightInfoText>
                {hasRecorded ? "체중 수정" : "체중 입력"}
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
                  <RecordsModalFixAndDeleteButton onPress={updateWeight}>
                    <RecordsModalFixAndDeleteButtonText>
                      수정하기
                    </RecordsModalFixAndDeleteButtonText>
                  </RecordsModalFixAndDeleteButton>
                  <RecordsModalFixAndDeleteButton onPress={deleteWeight}>
                    <RecordsModalFixAndDeleteButtonText>
                      삭제하기
                    </RecordsModalFixAndDeleteButtonText>
                  </RecordsModalFixAndDeleteButton>
                </RecordsModalButtonsContainer>
              </>
            ) : (
              <RecordsModalWeightButton
                onPress={() => {
                  addWeight();
                  setModalVisible(false);
                }}
              >
                <RecordsModalWeightButtonText>
                  기록완료
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
