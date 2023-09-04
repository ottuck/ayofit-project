import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import React, { useContext, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import CameraPicker from "../../components/record/CameraPicker";
import ImagePicker from "../../components/record/ImagePicker";
import MealCard2 from "../../components/record/MealCard2";
import SearchModal from "../../components/record/SearchModal";
import { LoginContext } from "../../store/LoginContext";
import { useMealContext } from "../../store/MealContext";
import { usePhotoContext } from "../../store/image_context";

const RecordMain = ({ navigation }) => {
  const { formattedYYMMDD, mealType, mealList, favoriteMeals } = useMealContext();
  // console.log("밀컨택스트 => 레코드메인 :", mealList);

  const { userInfo, setUserInfo } = useContext(LoginContext);

  //Server 통신을 위한 URI 수정
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  //const uri = "http://213.35.96.167";

  //서버로 보내기전 데이터 포멧팅
  const updatedMealList = mealList.map((meal) => {
    // nNO와 nSize를 제거
    const { nNO, nSize, ...rest } = meal;
    //'n'을 'r'로 바꾼 새로운 객체 생성
    const rKeysObject = Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [
        key.replace(/^n/, "r"),
        value,
      ])
    );
    //필요한 값 추가
    return {
      ...rKeysObject,
      rMealDate: formattedYYMMDD,
      rMealType: mealType,
    };
  });

  //식단 기록 post 요청
  const submitMealListToServer = () => {
    // console.log("Save버튼 누른후 Server에 제출한값 :", updatedMealList);
    axios
      .post(`${uri}/api/meal`, updatedMealList, {
        params: { userId: userInfo.id },
      })
      .then((response) => {
        console.log("MealData submitted successfully");
      })
      .catch(() => {
        console.log("MealData Error", "Failed to submit");
      });
  };

  //mealList가 없을 경우 Save버튼을 누르면 서버에 Delete 요청을 보냄
  const deleteMealListOnServer = () => {
    axios
      .delete(`${uri}/api/meal`, {
        params: {
          mealDate: formattedYYMMDD,
          mealType: mealType,
        },
      })
      .then((response) => {
        console.log("MealData deleted successfully");
      })
      .catch(() => {
        console.log("Error", "Failed to delete");
      });
  };

  //ImgModal
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const toggleImgModal = () => {
    setImgModalVisible(!imgModalVisible);
  };
  const { photoUri, setPhotoUri, photoId } = usePhotoContext();

  // 사진 파일 삭제 로직
  // console.log(photoUri);
  // console.log(photoId);
  const deleteFile = () => {
    axios
      .delete(`${uri}/api/file/delete`, {
        params: {
          fNo: photoId,
          fUrl: photoUri,
        },
      })
      .then((response) => {
        console.log("PhotoFile deleted successfully");
        setPhotoUri(null);
      })
      .catch(() => {
        console.log("Failed to delete");
      });
  };

  //Search Modal
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const openSearchModal = () => {
    setSearchModalVisible(true);
  };
  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

  //DatePicker Modal
  const [DatePickerModalVisible, setDatePickerModalVisible] = useState(false);
  const openDatePickerModal = () => {
    setDatePickerModalVisible(true);
  };
  const closeDatePickerModal = () => {
    setDatePickerModalVisible(false);
  };

  // 사진 등록 POST 요청
  const uploadImage = async (imageUri, userId, mealType) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    formData.append("userId", userId);
    formData.append("mealType", mealType);

    try {
      const response = await fetch(uri + "/api/file/files", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response;
      // console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(favoriteMeals);

  const { dbFavorites, setFavoriteMeals } = useMealContext();
  // 즐겨찾기 식단 db에 등록
  const regFavMeals = () => {
    axios
      .post(`${uri}/api/favorites`, favoriteMeals, {
        params: { userId: userInfo.id },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //DateTimePicker
  const [mode, setMode] = useState("time");
  const [pickerDate, setPickerDate] = useState("");
  const [pickerTime, setPickerTime] = useState("");

  const useDatepicker = () => {
    setMode("calendar");
    openDatePickerModal();
  };
  const useTimepicker = () => {
    setMode("time");
    openDatePickerModal();
  };
  const savePickerDate = (selectedDate) => {
    setPickerDate(selectedDate);
    closeDatePickerModal();
  };
  const savePickerTime = (selectedTime) => {
    setPickerTime(selectedTime);
    closeDatePickerModal();
  };

  //Current Date
  const currentDate = getFormatedDate(new Date(), "YYYY/MM/DD");
  const currentTime = getFormatedDate(new Date(), "h:m");

  //change date format
  const transformDate = (inputDate) => {
    if (!inputDate) {
      return null;
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, month, day] = inputDate.split("/");
    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${day}, ${year}`;
  };
  const formattedPickerDate = transformDate(pickerDate);
  const formattedCurrentDate = transformDate(currentDate);

  //change time format
  const transformDateTime = (inputTime) => {
    if (!inputTime) {
      return { ampm: null, formattedTime: null };
    }
    const [hour, minute] = inputTime.split(":");
    const numericHour = parseInt(hour, 10);
    let ampm = "AM";
    let formattedHour = numericHour;
    if (numericHour >= 12) {
      ampm = "PM";
      if (numericHour > 12) {
        formattedHour = numericHour - 12;
      }
    }
    return {
      ampm: ampm,
      formattedTime: `${String(formattedHour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`,
    };
  };
  const { ampm: ampm2, formattedTime: formattedPickerTime } =
    transformDateTime(pickerTime);
  const { ampm: ampm1, formattedTime: formattedCurrentTime } =
    transformDateTime(currentTime);


  //Rendering page
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={useDatepicker}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                {formattedPickerDate === null
                  ? formattedCurrentDate
                  : formattedPickerDate}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cardContainer}>
            {/* imagePiker 사진 입력 부분 작업중 */}
            <View style={styles.cardImageContainer}>
              {photoUri ? (
                <TouchableOpacity onPress={deleteFile} style={{ zIndex: 10 }}>
                  <AntDesign
                    name="closecircle"
                    style={styles.photoDeleteButton}
                  />
                </TouchableOpacity>
              ) : null}
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: 280, height: 230, borderRadius: 10 }}
                />
              ) : (
                <TouchableOpacity onPress={toggleImgModal}>
                  <Feather name="plus-circle" style={styles.plusIcon} />
                </TouchableOpacity>
              )}

              {/* imgModal창 작업중 */}
              <Modal
                animationType="fade"
                visible={imgModalVisible}
                transparent={true}
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={toggleImgModal} // 모달 바깥을 클릭하면 모달 닫힘
                >
                  <View style={styles.modalContainer}>
                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableOpacity onPress={toggleImgModal}>
                        <AntDesign
                          name="close"
                          style={styles.imgModalCloseButton}
                        />
                      </TouchableOpacity>
                    </View>
                    <CameraPicker onClose={toggleImgModal}>
                      <View style={styles.cameraPickerBox}>
                        <Feather name="camera" style={styles.cameraImg} />
                        <Text style={{ fontWeight: "bold" }}>Take a photo</Text>
                      </View>
                    </CameraPicker>
                    <ImagePicker onClose={toggleImgModal}>
                      <View style={styles.PhotoPickerBox}>
                        <Feather name="image" style={styles.galleryImg} />
                        <Text style={{ fontWeight: "bold" }}>
                          Photo Gallery
                        </Text>
                      </View>
                    </ImagePicker>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={openSearchModal}>
              <View style={styles.buttonBox1}>
                <Text style={styles.buttonText}> Add More </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (mealList.length === 0) {
                  deleteMealListOnServer();
                  navigation.navigate("RecordScreen");
                } else {
                  submitMealListToServer();
                  regFavMeals();
                  uploadImage(photoUri, userInfo.id, mealType);
                  navigation.navigate("RecordScreen");
                }
              }}
            >
              <View style={styles.buttonBox2}>
                <Text style={styles.buttonText}>
                  {mealList.length === 0 ? "Delete" : "Save"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.recordScroll}
          >
            {mealList.map((mealInfo, index) => (
              <MealCard2
                key={index} //index 문제일수도?
                mealInfo={mealInfo}
                useTimepicker={useTimepicker}
                formattedCurrentTime={formattedCurrentTime}
                formattedPickerTime={formattedPickerTime}
                ampm1={ampm1}
                ampm2={ampm2}
              />
            ))}
          </ScrollView>

          {/* DateTimePicker */}
          <Modal
            animationType="slide"
            visible={DatePickerModalVisible}
            transparent={true}
          >
            <View style={{ marginTop: "50%" }}>
              <TouchableOpacity onPress={closeDatePickerModal}>
                <AntDesign name="close" style={styles.modalCloseButton} />
              </TouchableOpacity>
              <DatePicker
                style={styles.datePicker}
                mode={mode}
                minuteInterval={10}
                selected={getToday()}
                selectorStartingYear={2023}
                onDateChange={savePickerDate}
                onTimeChange={savePickerTime}
              />
            </View>
          </Modal>

          {/* SearchModal */}
          <SearchModal
            fromPage="RecordMain"
            searchModalVisible={searchModalVisible}
            closeSearchModal={closeSearchModal}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default RecordMain;

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
  //해더
  headerContainer: {
    alignSelf: "center",
    top: 20,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
  },
  //사진 등록 창
  cardContainer: {
    alignSelf: "center",
    width: 290,
    height: 240,
    marginVertical: 30,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageContainer: {
    width: 280,
    height: 230,
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    fontSize: 40,
    color: "rgba(0, 0, 0, 0.10)",
  },
  photoDeleteButton: {
    fontSize: 30,
    color: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    left: 120,
    bottom: -15,
  },
  //ImagePicker
  modalContainer: {
    top: "21%",
    left: "29%",
    backgroundColor: "rgba(255, 233, 216, 1)",
    padding: 15,
    borderRadius: 10,
    width: 180,
    height: 120,
  },
  modalBtn: {
    flexDirection: "row",
  },
  imgModalCloseButton: {
    fontSize: 20,
    color: "rgb(228,108,10)",
  },
  cameraImg: {
    marginHorizontal: "5%",
    fontSize: 24,
  },
  cameraPickerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  galleryImg: {
    marginHorizontal: 5,
    fontSize: 26,
  },
  PhotoPickerBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  //추가, 확인 버튼
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonBox1: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: "#FFB172",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonBox2: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: "rgb(250, 71, 71)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  recordScroll: {
    alignItems: "center",
  },
  //TimePicker
  blurViewBox: {
    overflow: "hidden",
    borderRadius: 20,
    marginVertical: 20,
  },
  foodRecordContainer: {
    alignSelf: "center",
    width: 350,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.6)",
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
    marginTop: 15,
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
    justifyContent: "space-between",
  },
  likeButton: {
    fontSize: 23,
    color: "#E46C0A",
  },
  recordDeleteButton: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.3)",
  },
  //TimePicker
  datePicker: {
    borderRadius: 30,
  },
  modalCloseButton: {
    left: "90%",
    fontSize: 25,
    color: "rgba(0, 0, 0, 0.3)",
  },
});
