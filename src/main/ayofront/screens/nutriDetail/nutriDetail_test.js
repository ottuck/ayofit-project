import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
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

function NutriDetailScreen() {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [selectedHomeNavButton, setSelectedHomeNavButton] = useState(0);

  return (
    <HomeSafeAreaView>
      <StatusBar barStyle="dark-content" />
      <HomeUserContainer>
        <View>
          <HomeHelloText>
            Hello, <HomeAyoText> Ayo!</HomeAyoText>
          </HomeHelloText>
          <HomeDateText>Friday, August 6</HomeDateText>
        </View>
        <View>
          <Image
            source={require("../../assets/femaleUser.png")}
            style={{
              height: 56,
              width: 56,
              right: -20,
            }}
          />
        </View>
      </HomeUserContainer>
      <StepProgressContainer>
        <Image
          source={require("../../assets/personOnBar.png")}
          style={{
            height: 38,
            width: 38,
            right: -38,
          }}
        />
        <StepProgressBar progress={65 / 100} width={326} height={6.2} />
        <StepProgressText>
          <StepKcalText>215 kcal</StepKcalText>
          <Text>
            <StepsHighlightText>5,600</StepsHighlightText>
            <StepsText> / 8000 Steps</StepsText>
          </Text>
        </StepProgressText>
      </StepProgressContainer>
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
  );
}

export default NutriDetailScreen;
