import styled from "styled-components/native";
import * as Progress from "react-native-progress";

export const HomeSafeAreaView = styled.SafeAreaView`
  height: 1920px;
  background-color: #ffe9d8;
`;

export const HomeUserContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #ffe9d8;
  width: 100%;
  height: 10.3%;
`;

export const HomeHelloText = styled.Text`
  color: #191919;
  font-weight: 600;
  font-size: 23px;
  margin-left: -14.2px;
`;

export const HomeAyoText = styled.Text`
  color: #e46c0a;
  font-weight: 600;
  font-size: 22.2px;
`;

export const HomeDateText = styled.Text`
  font-size: 21px;
  font-weight: 400;
  margin-left: -13px;
`;

export const StepProgressContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -24.6px;
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
  height: 200px;
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

export const WeightFaintLine = styled.View`
  height: 4.5px;
  width: 82%;
  border-radius: 36px;
  background-color: "rgba(228, 108, 10, 0.75)";
  margin-horizontal: 4.2px;
`;

export const LittleFaintLine = styled.View`
  height: 3.8px;
  width: 9%;
  background-color: "rgba(228, 108, 10, 0.75)";
  border-radius: 36px;
`;

export const FaintLineContainer = styled.View`
  width: 100%;
  height: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 28px;
  margin-bottom: -9px;
`;

export const MyRecordsTodaysWeightContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 300px;
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

export const WeightChartText = styled.Text`
  color: #000000;
  font-size: 17.8px;
  font-weight: 500;
  margin-left: 21.2px;
`;

export const TodaysWeightKg = styled.Text`
  color: #fb9129;
  font-size: 18.5px;
  font-weight: 600;
`;

export const DateContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
`;

export const DateButtonContainer = styled.View`
  flex-direction: row;
  width: 320px;
  height: 36.2px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 16px;
`;

export const DateButton = styled.TouchableOpacity`
  width: 105px;
  height: 31.6px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.6)" : "transparent"};
  border-radius: 16px;
  shadow-color: ${(props) =>
    props.isActive ? "rgba(0, 0, 0, 1)" : "transparent"};
  shadow-offset: ${(props) => (props.isActive ? "0px 8px" : "0px 0px")};
  shadow-opacity: 1;
  shadow-radius: 8px;
  elevation: ${(props) => (props.isActive ? "16" : "0")};
`;

export const DateButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-align: center;
  color: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0.45)"};
`;

export const DetailsNutritionInfo = styled.View`
  width: 92%;
  height: 25.8%;
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  margin-top: 20px;
  margin-horizontal: 16px;
  padding-top: 18px;
  align-items: center;
`;

export const DetailsCalConsumptionText = styled.Text`
  color: #000000;
  font-weight: 500;
  font-size: 18.6px;
`;

export const DetailsCalConsumptionKcal = styled.Text`
  color: #fb9129;
  font-weight: 600;
  font-size: 19px;
`;

export const DetailsFaintLine = styled.Text`
  height: 1.2px;
  width: 92%;
  background-color: rgba(0, 0, 0, 0.25);
  margin-vertical: 12.6px;
`;

export const DetailsBarAndValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.65);
  width: 92%;
  height: 60%;
  border-radius: 16px;
  margin-top: 3px;
  padding-top: 2.2px;
  padding-bottom: 6.3px;
`;

export const DetailsProgressBarContainer = styled.View`
  height: 100%;
  justify-content: space-around;
  margin-top: 11.3px;
  margin-left: 22px;
`;

export const DetailsProgressBarPer = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: grey;
`;

export const DetailsNutrionImgContainer = styled.View`
  justify-content: space-around;
  height: 100%;
  margin-top: -1.8px;
  margin-left: 22px;
`;

export const DetailsNutritionGramContainer = styled.View`
  flex-direction: row;
`;

export const DetailsGramContainer = styled.View`
  justify-content: space-around;
  height: 100%;
  margin-top: 6.8px;
  margin-left: 18px;
`;

export const DetailsGramText = styled.Text`
  margin-top: 16px;
  font-size: 17.6px;
  font-weight: 600;
`;

export const DetailsGramValue = styled.Text`
  font-size: 16.2px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

export const DetailsProgressBarBottomContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 27.6%;
  align-items: center;
  justify-content: center;
  top: -1.5px;
`;

export const DetailsActivityCalorieText = styled.Text`
  font-size: 16.2px;
  margin-vertical: 4px;
  color: rgba(0, 0, 0, 0.72);
`;

export const DetailsResetButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const DetailsResetGoalButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 72%;
  height: 46px;
  background-color: #e46c0a;
  border-radius: 18px;
  margin-vertical: 8px;
`;

export const DetailsResetButtonText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
`;

export const DetailsCircleContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.45);
  width: 100%;
  height: 226px;
  border-radius: 20px;
  margin-top: 20px;
  margin-left: 1px;
  top: 22px;
`;

export const DetailsCircleRow = styled.View`
  flex-direction: row;
  margin-top: -8px;
  margin-left: -10px;
`;

export const RecordsWeightContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 346px;
  margin-vertical: 30px;
  border-radius: 20px;
`;

export const RecordsWeightButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

export const RecordsMyWeightImgContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-vertical: 22px;
`;

export const RecordsMyWeightText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export const RecordsKgText = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: #e46c0a;
  text-align: center;
  margin-vertical: 3px;
`;

export const RecordsGoalWeightContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: -6px;
`;

export const RecordsGoalWeightText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

export const RecordsWeightButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  background-color: #e46c0a;
  border-radius: 22px;
  margin-top: 3px;
`;

export const RecordsWeightButtonText = styled.Text`
  font-size: 21px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
`;

export const RecordsWeightModalView = styled.View`
  height: 232px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff4ec;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 18.6px;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const RecordsWeightModalInput = styled.TextInput`
  height: 46px;
  width: 60%;
  border-radius: 12px;
  margin-vertical: 28px;
  background-color: #ffdfc7;
  text-align: center;
  font-size: 19px;
  font-weight: 800;
`;

export const RecordsModalWeightCloseContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RecordsModalWeightInfoText = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: "rgba(0, 0, 0, 0.83)";
`;

export const RecordsModalWeightCloseButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 15px;
`;

export const RecordsModalWeightCloseButtonText = styled.Text`
  font-size: 25px;
  font-weight: 500;
  color: "rgba(0, 0, 0, 0.85)";
  margin-right: -22px;
`;

export const RecordsModalWeightButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 76%;
  height: 46px;
  background-color: #e46c0a;
  border-radius: 22px;
`;

export const RecordsModalWeightButtonText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: "rgba(0, 0, 0, 0.85)";
`;

export const RecordsModalButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

export const RecordsModalFixAndDeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 46px;
  background-color: #e46c0a;
  border-radius: 22px;
`;

export const RecordsModalFixAndDeleteButtonText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: "rgba(0, 0, 0, 0.85)";
`;

export const LatestWeightView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 88.2%;
  height: 38px;
  padding-horizontal: 8.6px;
  margin-left: 18.5px;
  margin-vertical: -12px;
  border-width: 2px;
  border-radius: 20px;
  border-color: #e46c0a;
`;

export const LatestWeightText = styled.Text`
  color: #000000;
  font-size: 19.6px;
  font-weight: 500;
`;

export const LatestWeightKg = styled.Text`
  color: #fb9129;
  font-size: 18.6px;
  font-weight: 600;
`;

export const WeightChartTop = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  top: -108.2px;
  padding-horizontal: 5.2px;
`;

export const WeightChartTopText = styled.Text`
  color: #fb9129;
  font-size: 20.5px;
  font-weight: 600;
`;

export const GoalNutriRatioContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 91.6%;
  height: 152px;
  background-color: #f3ba8d;
  border-radius: 20px;
  margin-top: 21.2px;
  margin-left: 19px;
`;

export const GoalNutriRatioView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 33.2%;
`;

export const GoalNutriRatioViewText = styled.Text`
  color: #372d23;
  font-size: 22px;
  font-weight: 600;
  margin-horizontal: 26px;
`;
