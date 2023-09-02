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
  const { updateMealType, formattedYYMMDD} = useMealContext();

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

  const getMealListByMealType = () => {
    axios
      .get(`${uri}/api/meal/type`,
        {
          params: {
            userID: "user1",
            date: formattedYYMMDD,
          }
        })
      .then((response) => {
        setBreakfastMeals(response.data[0]);
        setLunchMeals(response.data[1]);
        setDinnerMeals(response.data[2]);
        setSnackMeals(response.data[3]);
        // console.log('Sever=>RecordScreen.js:', response.data);
      })
      .catch(() => {
        console.log("getMealByDate error..");
      });
  };

  useEffect(() => {
    getMealListByMealType();
    getImg();
  }, []);

  const handleCardPress = (cardData) => {
    if (cardData.meals) {
      navigation.push("RecordMain"); // 음식 데이터가 있으면 RecordMain 화면으로 이동
    } else {
      openSearchModal(); // 없으면 openSearchModal 실행
      setMealType(cardData.mealType.toLowerCase());
      setPhotoUri(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fImg);
      setPhotoId(img.find((item) => item.fType === cardData.mealType.toLowerCase())?.fNo);
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
  //조건부 스타일
  firstCardStyle: {
    marginLeft: 54,
  },
  lastCardStyle: {
    marginRight: 54,
  },
});
