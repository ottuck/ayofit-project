import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MealCard1 from "../../components/record/MealCard1";
import SearchModal from "../../components/record/SearchModal";
import axios from "axios";
import Constants from "expo-constants";
import { useMealContext } from "../../store/MealContext";
import { usePhotoContext } from "../../store/image_context";

const { debuggerHost } = Constants.manifest2.extra.expoGo;
const uri = `http://${debuggerHost.split(":").shift()}:8080`;

function RecordScreen() {
  //Search Modal
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const openSearchModal = () => {
    setSearchModalVisible(true);
  };

  // mealType 카드별로 받아서 set
  const { updateMealType } = useMealContext();
  const setMealType = (mealType) => {
    updateMealType(mealType);
  };

  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

  // 로컬에 있는 사진 파일 GET요청
  const [img, setImgs] = useState([]);
  const { setPhotoUri, setPhotoId } = usePhotoContext();
  const getImg = () => {
    axios
      .get(`${uri}/api/file/get-image/user1`)
      .then((response) => {
        const newImgs = response.data.map((item) => ({
          fNo: item.fNo,
          fImg: item.fImg,
          fType: item.fType,
        }));
        // console.log(newImgs);
        setImgs((prevImgs) => [...prevImgs, ...newImgs]);
      })
      .catch(() => {
        console.log("getImg error..");
      });
  };

  const [breakfastMeals, setBreakfastMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [snackMeals, setSnackMeals] = useState([]);

  const getMealListByMealType = () => {
    axios
      .get(`${uri}/api/meal/type`,
        {
          params: {
            userID: "user1",
            date: formattedToDayDate,
          }
        })
      .then((response) => {
        setBreakfastMeals(response.data[0]);
        setLunchMeals(response.data[1]);
        setDinnerMeals(response.data[2]);
        setSnackMeals(response.data[3]);
      })
      .catch(() => {
        console.log("getMealByDate error..");
      });
  };

  useEffect(() => {
    getMealListByMealType();
    getImg();
  }, []);

  console.log("스크린 페이지 : ");
  console.log(breakfastMeals);
  console.log(lunchMeals);
  console.log(dinnerMeals);
  console.log(snackMeals);


  //서버에 넘길 임시 Date
  const mealDate = new Date();
  const formattedToDayDate = mealDate.toISOString().split('T')[0];
  // console.log(formattedDate); // "2023-08-31"

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> {formattedToDayDate} </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            {[
              { mealType: "Breakfast", meals: breakfastMeals },
              { mealType: "Lunch", meals: lunchMeals },
              { mealType: "Dinner", meals: dinnerMeals },
              { mealType: "Snack", meals: snackMeals },
            ].map((cardData, index) => (
              <MealCard1
                key={index}
                imgUri={img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fImg || null}
                mealType={cardData.mealType}
                mealTime="10:00" //임시값
                carb={cardData.meals.totalCarbohydrate} 
                protein={cardData.meals.totalProtein} 
                fat={cardData.meals.totalFat} 
                totalCalories={cardData.meals.totalCalories} 
                openSearchModal={() => {
                  openSearchModal();
                  setMealType(cardData.mealType.toLowerCase());
                  setPhotoUri(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fImg);
                  setPhotoId(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fNo);
                }}
              />
            ))}
          </ScrollView>

          <SearchModal
            fromPage="RecordScreen"
            searchModalVisible={searchModalVisible}
            closeSearchModal={closeSearchModal}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
export default RecordScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#E46C0A",
  },
  container: {
    backgroundColor: "#FFE9D8",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    marginVertical: 50,
    alignSelf: "center",
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 26,
    color: "white",
  },
  headerDate: {
    color: "#CECECE",
    fontSize: 17,
  },
  //카드 디자인
  cardContainer: {
    width: 300,
    height: 430,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageContainer: {
    width: 270,
    height: 270,
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 60,
    color: "rgba(0, 0, 0, 0.10)",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  mealTime: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 20,
  },
  nutrientText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  nutrientValue: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "right",
  },
  TotalValue: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
});
