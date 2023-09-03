import React, { useEffect, useState } from "react";
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

function RecordScreen({ navigation }) {
  const { mealType, addItemToMealList, updateMealType, formattedYYMMDD, cleanMealList} = useMealContext();

  // 카드를 클릭할때 mealType 받아서 mealContext에 저장
  const setMealType = (mealType) => {
    updateMealType(mealType);
  };

  //Search Modal
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const openSearchModal = () => {
    setSearchModalVisible(true);
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

  const getTotalNutritionForDay = () => {
    axios
      .get(`${uri}/api/meal/type/total`,
        {
          params: {
            userID: "user1",
            date: formattedYYMMDD,
          }
        })
      .then((response) => {
        const modifiedData = response.data.map(item => item === null ? 0 : item);
        setBreakfastMeals(modifiedData[0]);
        setLunchMeals(modifiedData[1]);
        setDinnerMeals(modifiedData[2]);
        setSnackMeals(modifiedData[3]);
        // console.log('Sever => RecordScreen.js:', modifiedData);
      })
      .catch(() => {
        console.log("getMealByDate error..");
      });
  };

  useEffect(() => {
    getTotalNutritionForDay();
    getImg();
  }, []);

  //SearchModal을 거치지 않고 mealMain페이지로 진입시 Sever에서 해당 날자 식단을 가져와서 MealContext에 저장
  const getMealByTypeAndDate = () => {
    axios
      .get(`${uri}/api/meal/type`,
        {
          params: {
            mealType: mealType,
            date: formattedYYMMDD,
          }
        })
      .then((response) => {
        console.log('GET서버 => RecordMain.js:', response.data);
        addItemToMealList(response.data);
      })
      .catch(() => {
        console.log("getMealDataByTypeAndDate error..");
      });
  };

  const handleCardPress = (cardData) => {
    setMealType(cardData.mealType.toLowerCase());
    setPhotoUri(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fImg);
    setPhotoId(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fNo);
    
    if (cardData.meals) {
      cleanMealList();
      getMealByTypeAndDate();
      navigation.push("RecordMain"); // 음식 데이터가 있으면 RecordMain 화면으로 이동
    } else {
      cleanMealList();
      openSearchModal(); // 음식 데이터가 없으면 openSearchModal 실행
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> {formattedYYMMDD} </Text>
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
            ].map((cardData, index) => {
              const imgData = img.find(item => item.fType === cardData.mealType.toLowerCase());
              const imgUri = imgData ? imgData.fImg : null;
              //카드를 식별하여 left,right margin을 주기 위한 코드
              const isFirstCard = index === 0;
              const isLastCard = index === 3;
              const cardStyle = [
                styles.cardContainer,
                isFirstCard && styles.firstCardStyle,
                isLastCard && styles.lastCardStyle,
              ];
              // 클로저를 사용하여 cardData를 전달
              const handlePress = () => handleCardPress(cardData);

              return (
                <MealCard1
                  key={index}
                  imgUri={imgUri}
                  mealType={cardData.mealType}
                  carb={cardData.meals.totalCarbohydrate}
                  protein={cardData.meals.totalProtein}
                  fat={cardData.meals.totalFat}
                  checkCardPress={handlePress} // 클로저를 사용한 함수 전달
                  cardStyle={cardStyle}
                />
              );
            })}
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
export default RecordScreen

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
  //조건부 스타일
  firstCardStyle: {
    marginLeft: 54,
  },
  lastCardStyle: {
    marginRight: 54,
  },
});
