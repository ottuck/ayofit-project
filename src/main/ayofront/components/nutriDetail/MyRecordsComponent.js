import { StyleSheet, Text, View, Image, Modal, Animated } from "react-native";
import { ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Constants from "expo-constants";
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
  RecordsWeightContainer,
  RecordsMyWeightImgContainer,
  RecordsMyWeightText,
  RecordsKgText,
  RecordsGoalWeightContainer,
  RecordsGoalWeightText,
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
  WeightChartText,
  DetailsCircleContainer,
  DetailsCircleRow,
} from "../../components/nutriDetail/StyledComponents";
import MainImage from "../record/MainImage";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../store/LoginContext";
import { useAccountsContext } from "../../store/accounts_context";

const MyRecordsComponent = () => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  //const uri = "http://213.35.96.167";

  const { userInfo, setUserInfo } = useContext(LoginContext);
  const { accountInfos, setAccountInfos } = useAccountsContext();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateMeals, setSelectedDateMeals] = useState([]);
  const [dailyNutrition, setDailyNutrition] = useState([]);
  const [weight, setWeight] = useState(0); // 기록된 체중 없을때 체중 기록 저장
  const [modalVisible, setModalVisible] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false); // 체중 기록 유무 확인
  const [recordedWeight, setRecordedWeight] = useState(0); // 기록된 체중
  const [weightData, setWeightData] = useState([]); // 차트에 몸무게 여러개담는 데이터

  let totalCarbohydrate = 0;
  let totalProtein = 0;
  let totalFat = 0;

  if (selectedDateMeals.length > 0 && selectedDateMeals[0]) {
    totalCarbohydrate = selectedDateMeals[0].totalCarbohydrate;
    totalProtein = selectedDateMeals[0].totalProtein;
    totalFat = selectedDateMeals[0].totalFat;
  }

  let totalCalories = totalCarbohydrate * 4 + totalProtein * 4 + totalFat * 9;

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

  const todayInTokyo = new Date();
  todayInTokyo.setHours(todayInTokyo.getHours() + 9); // 도쿄 시간대에 맞게 시간을 조정.
  const formattedToday = todayInTokyo.toISOString().split("T")[0]; // ISO 형식을 사용하여 날짜만 가져오기.

  const getNutritionData = (date) => {
    axios
      .get(`${uri}/api/nutrition/daily/${userInfo.id}/${date}`)
      .then((response) => {
        // console.log(response.data);
        setDailyNutrition(response.data);
        setSelectedDate(date);
        setSelectedDateMeals(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setHours(d.getHours() + 9);
      d.setDate(d.getDate() - i);
      const formatted = `${String(d.getFullYear()).substr(2)}-${String(
        d.getMonth() + 1
      ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      dates.unshift(formatted);
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
      rId: userInfo.id,
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
          fetchAllWeightsByUserId(userInfo.id);
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
        fetchAllWeightsByUserId(userInfo.id);
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
      rId: userInfo.id,
      rWeight: parseFloat(weight),
      rWeightDate: formattedRecordToday,
    };

    axios
      .put(`${uri}/api/weights/update`, record)
      .then((response) => {
        console.log(response.data);
        setHasRecorded(true);
        setRecordedWeight(weight);
        fetchAllWeightsByUserId(userInfo.id);
      })
      .catch((error) => console.log(error));
  };

  const chartData = {
    labels:
      weightData.length > 0
        ? weightData.map((item) =>
            item.rWeightDate.substring(3).replace("-", "/")
          )
        : ["-"],
    datasets: [
      {
        data:
          weightData.length > 0 ? weightData.map((item) => item.rWeight) : [0],
      },
    ],
  };

  useEffect(() => {
    getNutritionData(formattedToday);
    fetchWeightByDateAndId(userInfo.id, formattedToday);
    fetchAllWeightsByUserId(userInfo.id);
    getAccountTarWeight();
  }, []);

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

  const navigation = useNavigation();
  const goToRecordScreen = () => {
    navigation.navigate("DIET RECORD");
  };

  const getAccountTarWeight = () => {
    axios
      .get(`${uri}/api/account/${userInfo.id}/weight`)
      .then((response) => {
        console.log(response.data);
        setAccountInfos({
          ...accountInfos,
          tarWeight: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.mainImg}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: "2%" }}>
          Daily Report
        </Text>
        <MainImage navigate={goToRecordScreen} />
      </View>
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
        <DetailsCircleContainer>
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
          <DetailsCircleRow>
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
          </DetailsCircleRow>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              top: 12,
            }}
          >
            <View>
              <Image
                source={require("../../assets/rectangleCarb.png")}
                style={{
                  height: 23,
                  width: 30,
                }}
              />
              <Text
                style={{ fontSize: 19, fontWeight: "400", color: "#84a220" }}
              >
                Carb
              </Text>
            </View>
            <View>
              <Image
                source={require("../../assets/rectangleProtein.png")}
                style={{
                  height: 23,
                  width: 30,
                }}
              />
              <Text
                style={{ fontSize: 19, fontWeight: "400", color: "#dfc552" }}
              >
                Protein
              </Text>
            </View>
            <View>
              <Image
                source={require("../../assets/rectangleFat.png")}
                style={{
                  height: 23,
                  width: 30,
                }}
              />
              <Text
                style={{ fontSize: 19, fontWeight: "400", color: "#e88174" }}
              >
                Fat
              </Text>
            </View>
          </View>
        </DetailsCircleContainer>
        <MyRecordsTodaysWeightContainer>
          <TodaysWeightTextContainer>
            <TodaysWeightText>Today's Recorded Weight : </TodaysWeightText>
            <TodaysWeightKg>
              {recordedWeight ? parseFloat(recordedWeight).toFixed(1) : "00.0"}{" "}
              Kg
            </TodaysWeightKg>
          </TodaysWeightTextContainer>
          <FaintLine></FaintLine>
          <WeightChartText>Recorded Weight for the last 7 days</WeightChartText>
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
              propsForBackgroundLines: {
                strokeWidth: 0.6,
              },
            }}
            bezier
            style={{
              marginVertical: 12,
              marginLeft: 2, // 왼쪽 마진
              marginRight: 12, // 오른쪽 마진
            }}
          />
          <RecordsWeightContainer>
            <RecordsMyWeightImgContainer>
              <RecordsMyWeightText>Today's My Weight?</RecordsMyWeightText>
              <RecordsKgText>
                {recordedWeight
                  ? parseFloat(recordedWeight).toFixed(1)
                  : "00.0"}{" "}
                kg
              </RecordsKgText>
              <Image
                source={require("../../assets/avatar.png")}
                style={{
                  height: 132,
                  width: 132,
                }}
              />
              <RecordsGoalWeightContainer>
                <Image
                  source={require("../../assets/goalFlag.png")}
                  style={{
                    height: 28,
                    width: 22,
                    left: -6,
                    top: 1.6,
                  }}
                />
                <RecordsGoalWeightText>
                  Goal {accountInfos.tarWeight}kg
                </RecordsGoalWeightText>
              </RecordsGoalWeightContainer>
            </RecordsMyWeightImgContainer>
            <RecordsWeightButtonContainer>
              <RecordsWeightButton onPress={() => setModalVisible(true)}>
                <RecordsWeightButtonText>
                  {hasRecorded ? "Modifying Weight" : "Recording Weight"}
                </RecordsWeightButtonText>
              </RecordsWeightButton>
            </RecordsWeightButtonContainer>
          </RecordsWeightContainer>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
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
                        deleteWeight(userInfo.id, formattedToday);
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
    </View>
  );
};

export default MyRecordsComponent;

const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  mainImg: {
    marginTop: "10%",
    marginBottom: "-6%",
    paddingHorizontal: "4%",
    width: "100%",
    height: "35%",
  },
});
