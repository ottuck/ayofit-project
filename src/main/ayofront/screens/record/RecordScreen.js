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
  const getImg = async () => {
    await axios
      .get(`${uri}/api/file/get-image/user1`)
      .then((response) => {
        const newImgs = response.data.map((item) => ({
          fNo: item.fNo,
          fImg: item.fImg,
          fType: item.fType,
        }));
        console.log(newImgs);
        setImgs((prevImgs) => [...prevImgs, ...newImgs]);
      })
      .catch(() => {
        console.log("getImg error..");
      });
  };

  //식단 GET 요청 : 오늘 날짜로 조회하기 때문에 data가 없을 수 있음
  const [mealListByDate, setMealListByDate] = useState([]);
  const getMealByDate = async () => {
    await axios
      .get(`${uri}/api/meal/${formattedToDayDate}`)
      .then((response) => {
        setMealListByDate(response.data);
        console.log('레코드스크린 : ',response.data);
      })
      .catch(() => {
        console.log("getMealByDate error..");
      });
  };

  //서버에서 받은 data를 mealType별로 객체에 담기
  

  useEffect(() => {
    // getImg();
    getMealByDate();
  }, []);

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
            <MealCard1
              mealType="Breakfast"
              mealListByDate={mealListByDate}
              imgUri={img.find((item) => item.fType === "breakfast")?.fImg || null}
              openSearchModal={() => {
                openSearchModal();
                setMealType("breakfast");
                setPhotoUri(
                  img.find((item) => item.fType === "breakfast")?.fImg
                );
                setPhotoId(img.find((item) => item.fType === "breakfast")?.fNo);
              }}
            />
            <MealCard1
              mealType="Lunch"
              mealListByDate={mealListByDate}
              imgUri={img.find((item) => item.fType === "lunch")?.fImg || null}
              openSearchModal={() => {
                openSearchModal();
                setMealType("lunch");
                setPhotoUri(img.find((item) => item.fType === "lunch")?.fImg);
                setPhotoId(img.find((item) => item.fType === "lunch")?.fNo);
              }}
            />
            <MealCard1
              mealType="Dinner"
              mealListByDate={mealListByDate}
              imgUri={img.find((item) => item.fType === "dinner")?.fImg || null}
              openSearchModal={() => {
                openSearchModal();
                setMealType("dinner");
                setPhotoUri(img.find((item) => item.fType === "dinner")?.fImg);
                setPhotoId(img.find((item) => item.fType === "dinner")?.fNo);
              }}
            />
            <MealCard1
              mealType="Snack"
              mealListByDate={mealListByDate}
              imgUri={img.find((item) => item.fType === "snack")?.fImg || null}
              openSearchModal={() => {
                openSearchModal();
                setMealType("snack");
                setPhotoUri(img.find((item) => item.fType === "snack")?.fImg);
                setPhotoId(img.find((item) => item.fType === "snack")?.fNo);
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
