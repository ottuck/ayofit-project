import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import { useEffect, useState, useContext } from "react";
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
import KeyboardAvoidWrapper from "../../components/keyboardAvoidingWrapper";
import { LoginContext } from "../../store/LoginContext";
import Constants from "expo-constants";
import { GlobalStyles } from "../../components/UI/styles";

WebBrowser.maybeCompleteAuthSession();

const { brand, darkLight, primary } = Colors;

const { whiteOpacity50, primary500, splashOrange, primary200 } =
  GlobalStyles.colors;

const Login = ({ navigation }) => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  // const uri = "http://213.35.96.167";

  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [googleReq, googleRes, googleTrigger] = Google.useAuthRequest({
    iosClientId:
      "436732029831-scqenm2je0u6sbv43hui329dbv3uso3b.apps.googleusercontent.com",
    androidClientId:
      "436732029831-bck3sh69u9rgp7ivh6dgkipa9kkigmrd.apps.googleusercontent.com",
  });

  const { userInfo, setUserInfo } = useContext(LoginContext);

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage("");

    axios
      .post(`${uri}/api/login`, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        if (status === "SETINFO") {
          navigation.navigate("AccountInfo", { ...data });
        } else if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("Check your network and try again");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessageType(type);
    setMessage(message);
  };

  const handleGoogleSignIn = async () => {
    if (googleRes?.type === "success") {
      await getGoogleUserInfo(googleRes.authentication.accessToken);
    } else if (
      googleRes?.type === "cancel" ||
      googleRes?.type === "error" ||
      googleRes?.type === "dismiss"
    ) {
      handleMessage("Google Log in Canceled");
    } else {
      handleMessage("");
    }
    setGoogleSubmitting(false);
  };

  const getGoogleUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      axios
        .post(`${uri}/api/google`, user)
        .then((response) => {
          const result = response.data;
          const { message, status, data } = result;
          if (status === "SETINFO") {
            navigation.navigate("AccountInfo", { ...data });
          } else if (status !== "SUCCESS") {
            handleMessage(message, status);
          } else {
            persistLogin({ ...data }, message, status);
          }
        })
        .catch((error) => {
          console.log(error);
          handleMessage("Check your network and try again");
        })
        .finally(setGoogleSubmitting(false));
    } catch (error) {
      console.log(error);
      handleMessage("Check your network and try again");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const persistLogin = async (credentials, message, status) => {
    await AsyncStorage.setItem("@user", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setUserInfo(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Persisiting login failed");
      });
  };

  useEffect(() => {
    handleGoogleSignIn();
  }, [googleRes]);

  return (
    <KeyboardAvoidWrapper>
      <LoginContainer>
        <HeaderContainer>
          <PageTitle>Ready to dive in?</PageTitle>
          <SubTitle>Login now and explore!</SubTitle>
        </HeaderContainer>
        <BodyContainer>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email === "" || values.password === "") {
                handleMessage("Please fill all the fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
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
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="small" color={primary500} />
                  </StyledButton>
                )}

                {!googleSubmitting && (
                  <StyledButton
                    google={true}
                    onPress={() => {
                      setGoogleSubmitting(true);
                      googleTrigger();
                    }}
                  >
                    <Fontisto name="google" color={primary} size={25} />
                    <ButtonText google={true}>Sign in with Google</ButtonText>
                  </StyledButton>
                )}

                {googleSubmitting && (
                  <StyledButton google={true} disabled={true}>
                    <ActivityIndicator size="small" color={primary} />
                  </StyledButton>
                )}
                <ExtraView>
                  <ExtraText>Don't have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent> Sign up!</TextLinkContent>
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

export default Login;
