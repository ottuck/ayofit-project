import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import IconButton from "../../components/account/UI/IconButton";

import { Fontisto, AntDesign, Ionicons } from "@expo/vector-icons";

import axios from "axios";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";

import { LoginContext } from "../../store/LoginContext";
import { useMealContext } from "../../store/MealContext";
import FavMeal from "../../components/record/FavMeal";
import { useAccountsContext } from "../../store/accounts_context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function MyPage({ navigation }) {
  const { userInfo, setUserInfo } = useContext(LoginContext);

  // const { debuggerHost } = Constants.manifest2.extra.expoGo;
  // const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  const uri = "http://213.35.96.167";

  const [goals, setGoals] = useState({});
  const { accountResult } = useAccountsContext();

  const getAccountGoals = () => {
    axios
      .get(`${uri}/api/account/${userInfo.id}/goal`)
      .then((response) => {
        // console.log(response.data);
        setGoals(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { favoriteMeals, dbFavorites, setDbFavorites, favResults } =
    useMealContext();

  const getFavorites = () => {
    axios
      .get(`${uri}/api/favorites`, {
        params: { userId: userInfo.id },
      })
      .then((response) => {
        // console.log(dbFavorites);
        setDbFavorites(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAccountGoals();
  }, [accountResult]);

  useEffect(() => {
    getFavorites();
  }, [favResults]);

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
        <IconButton
          onPress={goToSettings}
          icon="player-settings"
          size={30}
          color="white"
        />
      </View>
      <View style={styles.userIdContainer}>
        <Text style={styles.userId}>Ayo</Text>
        <Text style={styles.profile}>'s Profile</Text>
      </View>
      <View style={styles.profileImgContainer}>
        {userInfo.picture === null ? (
          <Image
            style={styles.profileImg}
            source={require("../../assets/femaleAvatar.png")}
          />
        ) : (
          <Image style={styles.profileImg} source={{ uri: userInfo.picture }} />
        )}
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
              size={13}
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

        {/*  즐겨찾기 컨테이너 */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recordScroll}
        >
          {/* FavMeal 컴포넌트를 사용 */}
          {dbFavorites.map((meal) => (
            <FavMeal key={meal.favNo} mealInfo={meal} />
          ))}
        </ScrollView>
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
    marginTop: "-38%",
    marginRight: "5%",
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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 8,
  },
  myGoalsContainer: {
    flex: 1,
    marginVertical: "5%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  myGoals: {
    width: "80%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: { color: "rgb(255,255,255)", fontSize: 18, fontWeight: "600" },
  myGoalsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "18%",
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

  //식단 기록 컨테이너
  recordScroll: {
    alignItems: "center",
  },
});
