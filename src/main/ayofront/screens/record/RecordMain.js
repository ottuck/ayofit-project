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

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import CameraPicker from "../../components/record/CameraPicker";
import ImagePicker from "../../components/record/ImagePicker";
import { usePhotoContext } from "../../store/image_context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RecordMain = ({ navigation }) => {
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
  const deletePhoto = () => {
    console.log(photoUri);
    setPhotoUri(null);
  };

  //DateTime Picker
  const [mode, setMode] = useState("time");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const showDatepicker = () => {
    openModal();
    setMode("calendar");
  };
  const showTimepicker = () => {
    openModal();
    setMode("time");
  };

  //랜더링 화면
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../images/background-img.png")}
          style={styles.backgroundImage}
        >
          <TouchableOpacity onPress={showDatepicker}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}> August 16, 2023 </Text>
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
                  source={{ uri: { photoUri } }}
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
            <TouchableOpacity>
              <View style={styles.recordButton}>
                <Text style={styles.buttonText}> Add </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.recordButton}>
                <Text style={styles.buttonText}> Confirm </Text>
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
                <TouchableOpacity>
                  <AntDesign name="close" style={styles.recordDeleteButton} />
                </TouchableOpacity>
              </View>

              <View style={styles.recordMidContainer}>
                <View>
                  <Text style={styles.foodInfo}>Food: Carrot</Text>
                  <Text style={styles.foodInfo}>Calories: 41.3 Kcal</Text>
                </View>
                <TouchableOpacity onPress={showTimepicker}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.recordTime1}>AM</Text>
                    <Text style={styles.recordTime2}>12:15</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.foodNutrientContainer}>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Carb</Text>
                  <Text style={styles.foodNutrient}>19.06g</Text>
                </View>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Protein</Text>
                  <Text style={styles.foodNutrient}>0.36g</Text>
                </View>
                <View style={styles.foodNutrientBox}>
                  <Text style={styles.foodNutrient}>Fat</Text>
                  <Text style={styles.foodNutrient}>0.23g</Text>
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
                onTimeChange={(selectedTime) => {
                  setTime(selectedTime);
                }}
                selectorStartingYear={2023}
                onMonthYearChange={(selectedDate) => setDate(selectedDate)}
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
    // 이미지를 백그라운드 색이랑 합친걸로 교체해야 SafeArea 부분 색을 쉽게 변경 가능
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
    elevation: 5,
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
    elevation: 5,
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
  recordButton: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: "#FFB172",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    elevation: 5,
  },
  recordMidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  recordTime1: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "flex-end",
  },
  recordTime2: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 40,
  },
  foodInfo: {
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

  //타임 피커 디자인
  datePicker: {
    borderRadius: 30,
  },
  modalCloseButton: {
    left: "90%",
    fontSize: 25,
    color: "rgba(0, 0, 0, 0.3)",
  },
});
