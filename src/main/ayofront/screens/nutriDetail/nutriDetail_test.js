import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MyRecordsComponent from "../../components/nutriDetail/MyRecordsComponent";
import DetailsComponent from "../../components/nutriDetail/DetailsComponent";
import {
  HomeSafeAreaView,
  HomeUserContainer,
  HomeHelloText,
  HomeDateText,
  HomeAyoText,
  StepProgressContainer,
  StepProgressBar,
  StepProgressText,
  StepKcalText,
  StepsText,
  StepsHighlightText,
  HomeNavButtonContainer,
  HomeNavButton,
  HomeNavButtonText,
} from "../../components/nutriDetail/StyledComponents";
import { GlobalStyles } from "../../components/UI/styles";
import HomePedometerProgressBar from "../../components/pedometer/HomePedometerProgressBar";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { PedometerContext, daysOfWeek } from "../../store/PedometerContext";
import ProgressBarArea from "../../components/pedometer/HomePedometerArea";
import HomePedometerArea from "../../components/pedometer/HomePedometerArea";
import { useIsFocused } from "@react-navigation/native";

function NutriDetailScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollViewRef = React.createRef();
  useEffect(() => {
    // 화면이 다시 나타날 때 스크롤을 맨 위로 이동
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  }, [isFocused]);

  const [selectedHomeNavButton, setSelectedHomeNavButton] = useState(0);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${dayOfWeek}, ${month} ${day}`;
  };

  // 유저에게 오늘 날짜 안내 예시
  const today = new Date();
  today.setHours(today.getHours() + 9);
  const formattedToday = formatDate(today); // ex)) "Mon, August 21" 형식

  return (
    <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
      <HomeSafeAreaView>
        <StatusBar barStyle="dark-content" />
        <HomeUserContainer>
          <View>
            <HomeHelloText>
              Hello, <HomeAyoText> Ayo!</HomeAyoText>
            </HomeHelloText>
            <HomeDateText>{formattedToday}</HomeDateText>
          </View>
          <View>
            <Image
              source={require("../../assets/femaleAvatar.png")}
              style={{
                height: 56,
                width: 56,
                right: -20,
              }}
            />
            {/* <Image
              source={require("../../assets/femaleUser.png")}
              style={{
                height: 56,
                width: 56,
                right: -20,
              }}
            /> */}
          </View>
        </HomeUserContainer>

        {/* Pedometer Progress Bar Area */}
        <HomePedometerArea />

        <HomeNavButtonContainer>
          {["My Records", "Details"].map((buttonText, index) => (
            <HomeNavButton
              key={buttonText}
              active={selectedHomeNavButton === index}
              onPress={() => setSelectedHomeNavButton(index)}
            >
              <HomeNavButtonText active={selectedHomeNavButton === index}>
                {buttonText}
              </HomeNavButtonText>
            </HomeNavButton>
          ))}
        </HomeNavButtonContainer>

        {selectedHomeNavButton === 0 && <MyRecordsComponent />}
        {selectedHomeNavButton === 1 && <DetailsComponent />}
      </HomeSafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blurBox: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // 박스의 배경 색상 및 투명도 설정
    borderRadius: 50,
    padding: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  blurText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default NutriDetailScreen;
