import Constants from "expo-constants";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { GlobalStyles } from "../../UI/styles";

const StatusBarHeight = Constants.statusBarHeight;
const { width, height } = Dimensions.get("window");

const {
  primary50,
  primary100,
  primary200,
  primary500,
  splashOrange,
  gradientYellow,
  gradientGreen,
  donutChartRed,
  donutChartYellow,
  donutChartGreen,
  whiteOpacity50,
  blackOpacity10,
  blackOpacity50,
} = GlobalStyles.colors;

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const LoginContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 35}px;
  height: ${height}px;
  background-color: ${primary500};

  ${(props) =>
    props.sign === true &&
    `
    background-color: ${splashOrange};
    `}
`;

export const HeaderContainer = styled.View`
  flex: 0.15;
  padding: 0 50px;
`;

export const BodyContainer = styled.View`
  flex: 0.85;
  padding: 50px 30px;
  border-radius: 25px 25px 0 0;
  background-color: ${splashOrange};
  align-items: center;

  ${(props) =>
    props.sign === true &&
    `
    padding: 0 30px;
    `}
`;

export const PageTitle = styled.Text`
  font-size: 34px;
  font-weight: bold;
  color: white;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  color: white;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${primary200};
  padding: 15px 55px;
  border: 2px solid white;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin: 5px 0;
  margin-bottom: 20px;
  color: ${primary};
`;

export const StyledInputLabel = styled.Text`
  color: white;
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 39px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 39px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${primary50};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 60px;

  ${(props) =>
    props.google === true &&
    `
    background-color: transparent;
    border: 1px solid white;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary500};
  font-size: 23px;
  font-weight: bold;

  ${(props) =>
    props.google === true &&
    `
    color: ${primary};
    padding: 0 25px;
    `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type === "SUCCESS" ? green : red)};
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${donutChartYellow};
  font-size: 15px;
`;
