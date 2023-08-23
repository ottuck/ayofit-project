import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import IconButton from "../../components/account/UI/IconButton";
import { Fontisto } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function MyPage({ navigation }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [goals, setGoals] = useState({});

  const getAccountGoals = () => {
    axios
      .get(`${uri}/api/account/user1/goal`)
      .then((response) => {
        console.log(response.data);
        setGoals(response.data);
      })
      .catch(() => {
        Alert.alert("Error", "Failed.");
      });
  };

  useEffect(() => {
    getAccountGoals();
  }, []);

  const goToAccountInfo = () => {
    navigation.navigate("AccUpdateInfo");
  };

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.bgImg}
          source={require("../../images/mypage-bgimg.png")}
        />
      </View>
      <View style={styles.settings}>
        <Pressable onPress={goToSettings}>
          <IconButton icon="player-settings" size={30} color="white" />
        </Pressable>
      </View>
      <View style={styles.userIdContainer}>
        <Text style={styles.userId}>Ayo</Text>
        <Text style={styles.profile}>'s Profile</Text>
      </View>
      <View style={styles.profileImgContainer}>
        <Image style={styles.profileImg} />
      </View>
      <View style={styles.myGoalsContainer}>
        <View style={styles.myGoals}>
          <Pressable onPress={goToAccountInfo}>
            <View>
              <Text
                style={{
                  color: GlobalStyles.colors.primary500,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                My Goals
              </Text>
            </View>
          </Pressable>
          <View>
            <Fontisto
              name="angle-right"
              size={14}
              color={GlobalStyles.colors.primary500}
            />
          </View>
        </View>
        <View style={styles.myGoalsItem}>
          <Text style={styles.text}>Weight</Text>
          <Text style={styles.text}>{goals.tarWeight} kg</Text>
        </View>
        <View style={styles.myGoalsItem}>
          <Text style={styles.text}>Calorie</Text>
          <Text style={styles.text}>{goals.calorie} kcal</Text>
        </View>
        <View style={styles.myGoalsItem}>
          <Text style={styles.text}>Nutrients</Text>
          <Text style={styles.text}>
            {goals.carb} : {goals.protein} : {goals.fat}
          </Text>
        </View>
      </View>
      <View style={styles.favoritesContainer}>
        <View style={styles.favoritesTitle}>
          <Fontisto
            name="heart"
            size={20}
            color={GlobalStyles.colors.primary500}
          />
          <View>
            <Text
              style={{
                paddingLeft: "2%",
                color: GlobalStyles.colors.primary500,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Favorites
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  bgImg: { width: SCREEN_WIDTH, height: 200 },
  settings: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "-45%",
  },
  userIdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "-5%",
  },
  userId: {
    fontSize: 20,
    color: "rgb(255,255,255)",
  },
  profile: { fontSize: 20, color: "rgba(255, 255, 255, 0.5)" },
  profileImgContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  profileImg: {
    marginTop: "2%",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 8,
  },
  myGoalsContainer: {
    flex: 2,
    marginVertical: "5%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  myGoals: {
    width: "80%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  text: { color: "rgb(255,255,255)", fontSize: 18, fontWeight: "600" },
  myGoalsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "25%",
    backgroundColor: "background: rgba(228, 108, 10, 0.5)",
    borderRadius: 28,
    paddingHorizontal: "5%",
  },
  favoritesContainer: { flex: 2, alignItems: "center" },
  favoritesTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
});