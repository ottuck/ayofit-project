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
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  FaintLine,
  MyRecordsTodaysWeightContainer,
  TodaysWeightTextContainer,
  TodaysWeightText,
  TodaysWeightKg,
} from "../../components/nutriDetail/StyledComponents";

const DetailsComponent = () => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <MyRecordsTodaysWeightContainer>
        <TodaysWeightTextContainer>
          <TodaysWeightText>Today's Weight : </TodaysWeightText>
          <TodaysWeightKg>58.3 Kg</TodaysWeightKg>
        </TodaysWeightTextContainer>
        <FaintLine></FaintLine>
        <LineChart
          data={{
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
              {
                data: [58.2, 58.2, 58, 58.5, 58.2, 58.5, 58.3], // 여기에 몸무게 데이터
                color: () => "#E46C0A", // 라인 색상 지정
                strokeWidth: 3,
              },
            ],
          }}
          width={Dimensions.get("window").width - 58} // 차트 넓이 조절
          height={182} // 차트 높이 조절
          yAxisSuffix="kg"
          yAxisInterval={7}
          chartConfig={{
            backgroundGradientFrom: "rgba(255, 255, 255, 0.5)",
            backgroundGradientTo: "rgba(255, 255, 255, 0.5)",
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
    </View>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({});
