import styled from "styled-components/native";
import * as Progress from "react-native-progress";

export const HomeSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #ffe9d8;
`;

export const HomeUserContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffe9d8;
  width: 100%;
  height: 12%;
`;

export const HomeHelloText = styled.Text`
  color: #191919;
  font-weight: 600;
  font-size: 22px;
  margin-left: -13px;
`;

export const HomeAyoText = styled.Text`
  color: #e46c0a;
  font-weight: 600;
  font-size: 20px;
`;

export const HomeDateText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  margin-left: -13px;
`;

export const StepProgressContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

export const StepProgressBar = styled(Progress.Bar).attrs({
  color: "#E46C0A",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  borderWidth: 0,
})``;

export const StepProgressText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 83.6%;
  padding-top: 8px;
`;

export const StepKcalText = styled.Text`
  color: #000000;
  font-weight: 400;
  font-size: 15px;
`;

export const StepsHighlightText = styled.Text`
  color: #e46c0a;
  font-weight: 500;
  font-size: 15px;
`;

export const StepsText = styled.Text`
  color: #000000;
  font-weight: 400;
  font-size: 15px;
`;

export const HomeNavButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #e46c0a;
  border-radius: 22px;
  width: 312px;
  height: 46px;
  padding-left: 20px;
  padding-right: 20px;
  top: 22px;
  left: 42px;
  right: 42px;
`;

export const HomeNavButton = styled.TouchableOpacity`
  width: 153px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "#FFE1C8" : "transparent")};
  border-radius: ${(props) => (props.active ? "20px" : "0px")};

  ${(props) =>
    props.active &&
    `
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.0625;
    shadow-radius: 4px;
    elevation: 6; 
  `}
`;

export const HomeNavButtonText = styled.Text`
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-align: center;
  color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.65)" : "rgba(255, 255, 255, 0.55)"};
`;

export const MyRecordsDailyNutritionContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  width: 92%;
  height: 202px;
  margin-vertical: 48px;
  margin-horizontal: 16px;
  border-radius: 20px;
`;

export const CircularProgressContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 3.2px;
  padding-horizontal: 8.8px;
`;

export const CircularProgressTextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const CircularProgressCarbText = styled.Text`
  font-size: 17.5px;
  margin-left: -0.6px;
  font-weight: 600;
  color: "rgba(0, 0, 0, 0.7)";
`;

export const CircularProgressPercentage = styled.Text`
  font-size: 17.5px;
  margin-left: 5.2px;
  font-weight: 800;
  color: "rgba(0, 0, 0, 0.7)";
`;

export const DailyConsumptionContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-top: 16px;
`;

export const DailyConsumptionText = styled.Text`
  color: #000000;
  font-size: 18.5px;
  font-weight: 500;
`;

export const DailyConsumptionKcal = styled.Text`
  color: #fb9129;
  font-size: 18.5px;
  font-weight: 600;
`;

export const FaintLine = styled.View`
  height: 1px;
  width: 92%;
  background-color: "rgba(0, 0, 0, 0.25)";
  margin-horizontal: 12px;
  margin-vertical: 10px;
`;

export const MyRecordsTodaysWeightContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 280px;
  margin-vertical: 48px;
  border-radius: 20px;
`;

export const TodaysWeightTextContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-top: 16px;
  margin-left: 20px;
`;

export const TodaysWeightText = styled.Text`
  color: #000000;
  font-size: 18.5px;
  font-weight: 500;
`;

export const TodaysWeightKg = styled.Text`
  color: #fb9129;
  font-size: 18.5px;
  font-weight: 600;
`;
