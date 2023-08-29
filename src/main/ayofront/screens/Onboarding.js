import React from "react";
import {
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { GlobalStyles } from "../components/UI/styles";

const OnboardingScreen = ({ onComplete }) => {
  const { width, height } = Dimensions.get("window");
  const desiredImageAspectRatio = 9 / 16;

  const imageWidth = width;
  const imageHeight = imageWidth / desiredImageAspectRatio;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: GlobalStyles.colors.primary500 }}
    >
      <StatusBar barStyle="default" />
      <Onboarding
        pages={[
          {
            backgroundColor: GlobalStyles.colors.primary500,
            image: (
              <Image
                source={require("../assets/onboarding-1.png")}
                resizeMode="contain"
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginTop: Platform.OS !== "ios" ? "30%" : 0,
                }}
              />
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: GlobalStyles.colors.primary500,
            image: (
              <Image
                source={require("../assets/onboarding-2.png")}
                resizeMode="contain"
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginTop: Platform.OS !== "ios" ? "30%" : 0,
                }}
              />
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: GlobalStyles.colors.primary500,
            image: (
              <Image
                source={require("../assets/onboarding-3.png")}
                resizeMode="contain"
                style={{
                  height: imageHeight,
                  width: imageWidth,
                  marginTop: Platform.OS !== "ios" ? "30%" : 0,
                }}
              />
            ),
            title: "",
            subtitle: "",
          },
        ]}
        showSkip={true}
        onSkip={onComplete}
        onDone={onComplete}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
