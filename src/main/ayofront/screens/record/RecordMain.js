import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import axios from "axios";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CameraPicker from "../../components/record/CameraPicker";
import ImagePicker from "../../components/record/ImagePicker";
import { usePhotoContext } from "../../store/image_context";

//Server 통신을 위한 URI 수정
const { debuggerHost } = Constants.manifest2.extra.expoGo;
const uri = `http://${debuggerHost.split(":").shift()}:8080`;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RecordMain = ({ route, navigation }) => {
  const { food } = route.params;

  //식단 기록 post 요청
  const submitFoodToServer = () => {
    axios
      .post(`${uri}/api/meal`, food)
      .then((response) => {
        console.log("foodData submitted successfully:", response.data);
      })
      .catch(() => {
        console.log("Error", "Failed to submit");
      });
  };

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  //ImgModal
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const toggleImgModal = () => {
    setImgModalVisible(!imgModalVisible);
  };
  const { photoUri, setPhotoUri } = usePhotoContext();
  console.log(photoUri);
  const deletePhoto = () => {
    console.log(photoUri);
    setPhotoUri(null);
  };

  // 사진 등록 POST 요청
  const uploadImage = async (imageUri, userId) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    formData.append("userId", userId);

    try {
      const response = await fetch(uri + "/api/file/upload-image", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  //DateTimePicker
  const [mode, setMode] = useState("time");
  const [pickerDate, setPickerDate] = useState("");
  const [pickerTime, setPickerTime] = useState("");

  const savePickerDate = (selectedDate) => {
    setPickerDate(selectedDate);
    closeModal();
  };
  const savePickerTime = (selectedTime) => {
    setPickerTime(selectedTime);
    closeModal();
  };
  const showDatepicker = () => {
    openModal();
    setMode("calendar");
  };
  const showTimepicker = () => {
    openModal();
    setMode("time");
  };

  //pickerDate formatting
  const transformPickerDate = (inputDate) => {
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
  const formattedPickerDate = transformPickerDate(pickerDate);

  //pickerTime formatting
  const transformPickerDateTime = (inputTime) => {
    if (!inputTime) {
      return { ampm2: null, formattedPickerTime: null };
    }
    const [hour, minute] = inputTime.split(":");
    const numericHour = parseInt(hour, 10);
    let ampm2 = "am";
    let formattedHour = numericHour;

    if (numericHour >= 12) {
      ampm2 = "pm";
      if (numericHour > 12) {
        formattedHour = numericHour - 12;
      }
    }

    return {
      ampm2: ampm2.toUpperCase(),
      formattedPickerTime: `${formattedHour}:${minute}`,
    };
  };
  const { ampm2, formattedPickerTime } = transformPickerDateTime(pickerTime);

  //current date & time
  const today = new Date();
  const [todayDateUTC, _todayTimeUTC] = today.toISOString().split("T");
  const [hour, minute] = _todayTimeUTC.split(":");
  const todayTimeUTC = `${hour}:${minute}`;
  //current date formatting
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  //current time formatting
  const koreanTimeInAMPM = today.toLocaleTimeString("en-US", {
    timeZone: "Asia/Seoul",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const [currentTime, ampm1] = koreanTimeInAMPM.split(" ");

  //delete recorded meal (작업 중)
  const deleteMeal = () => {};

  //Rendering page
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={showDatepicker}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                {formattedPickerDate === null
                  ? formattedDate
                  : formattedPickerDate}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cardContainer}>
            {/* imagePiker 사진 입력 부분 작업중 */}
            <View style={styles.cardImageContainer}>
              {photoUri ? (
                <TouchableOpacity onPress={deletePhoto} style={{ zIndex: 10 }}>
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
                <View style={styles.modalContainer}>
                  <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={toggleImgModal}>
                      <AntDesign
                        name="close"
                        size={30}
                        color="rgb(228,108,10)"
                      />
                    </TouchableOpacity>
                  </View>
                  <CameraPicker onClose={toggleImgModal}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "5%",
                      }}
                    >
                      <Feather
                        style={{ marginHorizontal: "5%" }}
                        name="camera"
                        size={30}
                        color="black"
                      />
                      <Text>Take a photo</Text>
                    </View>
                  </CameraPicker>
                  <ImagePicker onClose={toggleImgModal}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "5%",
                      }}
                    >
                      <Feather
                        style={{ marginHorizontal: "5%" }}
                        name="image"
                        size={30}
                        color="black"
                      />
                      <Text>Photo Gallery</Text>
                    </View>
                  </ImagePicker>
                </View>
              </Modal>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecordScreen", { shouldOpenModal: true })
              }
            >
              <View style={styles.buttonBox1}>
                <Text style={styles.buttonText}> Add More </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // submitFoodToServer();
                uploadImage(photoUri, "user1");
              }}
            >
              <View style={styles.buttonBox2}>
                <Text style={styles.buttonText}> Save </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.recordScroll}
          >
            <View style={styles.foodRecordContainer}>
              <View style={styles.recordIconContainer}>
                {/* true일 때 Ionicons name="heart-sharp"로 분기처리 필요 */}
                <TouchableOpacity>
                  <Ionicons name="heart-outline" style={styles.likeButton} />
                </TouchableOpacity>
                {/* 삭제 버튼 */}
                <TouchableOpacity onPress={deleteMeal}>
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
                    {food[0].nFoodName}
                  </Text>
                  <Text style={styles.foodKcal}>{food[0].nKcal} Kcal</Text>
                </View>
                <TouchableOpacity onPress={showTimepicker}>
                  <View style={styles.recordTimeContainer}>
                    <Text style={styles.recordTime1}>
                      {ampm2 === null ? ampm1 : ampm2}
                    </Text>
                    <Text style={styles.recordTime2}>
                      {formattedPickerTime === null
                        ? currentTime
                        : formattedPickerTime}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.foodNutrientContainer}>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Carb</Text>
                  <Text style={styles.foodNutrient}>
                    {food[0].nCarbohydrate === null
                      ? "-"
                      : food[0].nCarbohydrate}
                  </Text>
                </View>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Protein</Text>
                  <Text style={styles.foodNutrient}>
                    {food[0].nProtein === null ? "-" : food[0].nProtein}
                  </Text>
                </View>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Fat</Text>
                  <Text style={styles.foodNutrient}>
                    {food[0].nFat === null ? "-" : food[0].nFat}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
          >
            <View style={{ marginTop: "50%" }}>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" style={styles.modalCloseButton} />
              </TouchableOpacity>

              <DatePicker
                style={styles.datePicker}
                mode={mode}
                minuteInterval={10}
                onTimeChange={savePickerTime}
                selectorStartingYear={2023}
                onDateChange={savePickerDate}
                selected={todayDateUTC}
              />
            </View>
          </Modal>
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
  modalContainer: {
    marginTop: SCREEN_HEIGHT * 0.2,
    marginLeft: SCREEN_WIDTH * 0.25,
    backgroundColor: "rgba(255, 233, 216, 0.8)",
    padding: "5%",
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.5,
    height: "15%",
    justifyContent: "space-evenly",
  },
  modalBtn: {
    flexDirection: "row",
  },
  //추가, 확인 버튼
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    backgroundColor: "red",
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
  //ImagePicker
});
