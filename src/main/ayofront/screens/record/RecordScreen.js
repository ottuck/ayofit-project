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
import { useMealContext } from "../../store/MealContext";
import { usePhotoContext } from "../../store/image_context";

function RecordScreen({ route }) {
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

  // // 로컬에 있는 사진 파일 GET요청
  // const [imgUri, setImgUri] = useState([]);
  // const { photoUri, setPhotoUri } = usePhotoContext();

  // const getImg = async () => {
  //   await axios
  //     .get(`${uri}/api/file/get-image/user2`)
  //     .then((response) => {
  //       const newImgUris = response.data.map((item) => item.fImg);
  //       setImgUri((prevImgUris) => [...prevImgUris, ...newImgUris]);
  //     })
  //     .catch(() => {
  //       console.log("get error..", error);
  //     });
  // };

  // useEffect(() => {
  //   getImg();
  // }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> 2023.08.29 </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            <MealCard1
              mealType="Breakfast"
              mealTime="10:00"
              carb="55"
              protein="16.4"
              fat="21.5"
              totalCalories="487"
              openSearchModal={() => {
                openSearchModal();
                setMealType("breakfast");
              }}
            />
            <MealCard1
              mealType="Lunch"
              mealTime="10:00"
              carb="60"
              protein="18"
              fat="20"
              totalCalories="500"
              openSearchModal={() => {
                openSearchModal();
                setMealType("lunch");
              }}
            />
            <MealCard1
              mealType="Dinner"
              mealTime="10:00"
              carb="65"
              protein="19"
              fat="23"
              totalCalories="550"
              openSearchModal={() => {
                openSearchModal();
                setMealType("dinner");
              }}
            />
            <MealCard1
              mealType="Snack"
              mealTime="10:00"
              carb="65"
              protein="19"
              fat="23"
              totalCalories="550"
              openSearchModal={() => {
                openSearchModal();
                setMealType("snack");
              }}
            />
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
    marginVertical: 80,
    marginHorizontal: 35,
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 25,
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
