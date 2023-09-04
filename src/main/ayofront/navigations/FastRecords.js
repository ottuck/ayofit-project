import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  FastRecordView,
  RecordOneView,
  RecordUseTime,
  RecordSTime,
  RecordETime,
  RecordScrollView,
  RecordUnderC,
  RecordUpC,
  RecordRTime,
} from "../components/fast/FastingStyled";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import axios from "axios";
import FastHeaderCom from "../components/fast/FastHeaderCom";
import { ImageBackground, StyleSheet, Image } from "react-native";

const FastRecord = ({ navigation }) => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  //const uri = "http://213.35.96.167";

  const [fastData, setFastData] = useState([]);
  useEffect(() => {
    // Axios GET 요청 설정
    axios
      .get(`${uri}/api/fast`)
      .then((response) => {
        setFastData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // const remainf = fastData[0].elapsedTime;
  // console.log(remainf);
  // const remainTimeF = (fastData[0].elapsedTime);
  // console.log('이거 봐',remainTimeF)

  // const formattedTime = formatTimeFromSeconds(remainTimeF);
  // console.log('예상 출력?',formattedTime);  // 예상 출력: "00:03:00"

  const formattedFastData = fastData.map((item) => ({
    formattedTime: formatTimeFromSeconds(item.elapsedTime),
  }));

  console.log(fastData);

  function formatTimeFromSeconds(remainTimeF) {
    const hours = Math.floor(remainTimeF / 3600);
    const minutes = Math.floor((remainTimeF % 3600) / 60);
    const remainingSeconds = remainTimeF % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    return formattedTime;
  }

  return (
    <ImageBackground
      source={require("../images/FastImage/FastBackground.png")}
      resizeMode="cover"
      style={styles.backgroundMain}
    >
      <FastHeaderCom navigation={navigation} />
      <RecordScrollView>
        <FastRecordView>
          <RecordUpC>
            <Image
              source={require("../images/FastImage/FastCheckRecord2.png")}
              resizeMode="cover"
              style={styles.ImageText}
            />
          </RecordUpC>
          <RecordUnderC>
            {fastData.map((data, index) => (
              <RecordOneView key={index}>
                <RecordUseTime
                  style={{ fontFamily: "OpenSans_600SemiBold_Italic" }}
                >
                  Using Time : {formatTimeFromSeconds(data.elapsedTime)}
                </RecordUseTime>
                <RecordSTime> Start : {data.confirmStartTime}</RecordSTime>
                <RecordETime> End : {data.confirmEndTime}</RecordETime>
              </RecordOneView>
            ))}
          </RecordUnderC>
        </FastRecordView>
      </RecordScrollView>
    </ImageBackground>
  );
};

const RecordStack = createNativeStackNavigator();

const FastRecordPage = () => (
  <RecordStack.Navigator
    screenOptions={{
      headerShown: false,
      headerTintColor: "black",
      headerBackTitleVisible: false,
    }}
  >
    <RecordStack.Screen name="FastRecordMain" component={FastRecord} />
  </RecordStack.Navigator>
);
const styles = StyleSheet.create({
  backgroundMain: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ImageText: {
    width: 350,
    height: 80,
  },
});

export default FastRecordPage;
