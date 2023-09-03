import { Ionicons, Octicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  BodyContainer,
  ButtonText,
  Colors,
  ExtraText,
  ExtraView,
  HeaderContainer,
  LeftIcon,
  LoginContainer,
  MsgBox,
  PageTitle,
  RightIcon,
  StyledButton,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
  TextLink,
  TextLinkContent,
} from "../../components/account/UI/loginStyles";
import axios from "axios";
import Constants from "expo-constants";
import KeyboardAvoidWrapper from "../../components/keyboardAvoidingWrapper";
import { GlobalStyles } from "../../components/UI/styles";

const { brand, darkLight, primary } = Colors;

const { whiteOpacity50, primary500, splashOrange, primary200 } =
  GlobalStyles.colors;

const Signup = ({ navigation }) => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  // const uri = "http://213.35.96.167";

  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage("");
    axios
      .post(`${uri}/api/signup`, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        handleMessage(message, status);
        if (status === "SUCCESS") {
          navigation.navigate("AccountInfo", { ...data });
        }
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Check your network and try again");
      })
      .finally(setSubmitting(false));
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessageType(type);
    setMessage(message);
  };

  return (
    <KeyboardAvoidWrapper>
      <LoginContainer sign={true}>
        <HeaderContainer sign={true}>
          <PageTitle>Sign up</PageTitle>
          <SubTitle>Start your adventure with us!</SubTitle>
        </HeaderContainer>
        <BodyContainer sign={true}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.name === "" ||
                values.email === "" ||
                values.password === "" ||
                values.confirmPassword === ""
              ) {
                handleMessage("Please fill all the fields");
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match");
              } else {
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Name"
                  icon="person"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Password"
                  icon="lock"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Sign up</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary500} />
                  </StyledButton>
                )}
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent> Log in!</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </BodyContainer>
      </LoginContainer>
    </KeyboardAvoidWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <LeftIcon>
        <Octicons name={icon} size={25} color={whiteOpacity50} />
      </LeftIcon>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={25}
            color={whiteOpacity50}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
