import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../components/UI/styles";
import IconButton from "../../components/account/UI/IconButton";

import { Fontisto, AntDesign, Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { LoginContext } from "../../store/LoginContext";
import { useMealContext } from "../../store/MealContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function MyPage({ navigation }) {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const uri = "http://213.35.96.167";

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

  const { favoriteMeals } = useMealContext();
  console.log(favoriteMeals);

  const getFavorites = () => {
    axios
      .get(`${uri}/api/favorites`, {
        params: { userId: "user1", nNos: favoriteMeals },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        Alert.alert("favorites", "failed.");
      });
  };

  useEffect(() => {
    getAccountGoals();
    getFavorites();
  }, []);

  const goToAccountInfo = () => {
    navigation.navigate("AccUpdateInfo");
  };

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  const deleteFavorites = () => {};

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
        <Image style={styles.profileImg} source={{ uri: userInfo.l_picture }} />
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
          <View style={styles.foodRecordContainer}>
            <View style={styles.recordIconContainer}>
              {/* 삭제 버튼 */}
              <TouchableOpacity onPress={deleteFavorites}>
                <AntDesign name="close" style={styles.recordDeleteButton} />
              </TouchableOpacity>
            </View>

            <View style={styles.recordMidContainer}>
              <View style={styles.textWrapper}>
                <Text
                  style={styles.foodName}
                  numberOfLines={1}
                  ellipsizeMode="clip"
                >
                  칼국수
                </Text>
                <Text style={styles.foodKcal}> 293.8 Kcal</Text>
              </View>
            </View>
            <View style={styles.foodNutrientContainer}>
              <View style={styles.foodNutrientBox}>
                <Text style={styles.foodNutrient}>Carb</Text>
                <Text style={styles.foodNutrient}>52.2 g</Text>
              </View>
              <View style={styles.foodNutrientBox}>
                <Text style={styles.foodNutrient}>Protein</Text>
                <Text style={styles.foodNutrient}>10 g</Text>
              </View>
              <View style={styles.foodNutrientBox}>
                <Text style={styles.foodNutrient}>Fat</Text>
                <Text style={styles.foodNutrient}>5 g</Text>
              </View>
            </View>
          </View>
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
    flex: 0.8,
    marginVertical: "5%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  myGoals: {
    width: "80%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
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
  foodRecordContainer: {
    width: 350,
    height: 175,
    marginVertical: 20,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
  },
  recordMidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  recordTimeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  recordTime1: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 4,
  },
  recordTime2: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 34,
  },
  textWrapper: {
    width: "55%",
    overflow: "hidden",
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodKcal: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodNutrientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodNutrientBox: {
    width: 100,
    height: 50,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  foodNutrient: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 2,
  },
  //하트, 삭제 버튼
  recordIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  recordDeleteButton: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.3)",
  },
});
