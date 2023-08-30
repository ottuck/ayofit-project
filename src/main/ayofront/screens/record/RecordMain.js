import React, { useEffect, useState } from "react";
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
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import DatePicker, { getToday, getFormatedDate } from "react-native-modern-datepicker";
import CameraPicker from "../../components/record/CameraPicker";
import ImagePicker from "../../components/record/ImagePicker";
import { usePhotoContext } from "../../store/image_context";
import { useMealContext } from '../../store/MealContext';
import SearchModal from "../../components/record/SearchModal";
import MealCard2 from "../../components/record/MealCard2";


const RecordMain = (route) => {
  const { mealList } = useMealContext();
  // console.log("컨택스트API => 레코드메인 ", mealList);


  // 콘솔 로그일때 컨텍스트 ㅁPIdp wkfTKdkslkfor문 돌려보기

  //Server 통신을 위한 URI 수정
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  //식단 기록 post 요청
  const submitMealToServer = () => {
    axios
      .post(`${uri}/api/meal`, foodInfo)
      .then((response) => {
        console.log("MealData submitted successfully:", response.data);
      })
      .catch(() => {
        console.log("Error", "Failed to submit");
      });
  };

  //ImgModal
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const toggleImgModal = () => {
    setImgModalVisible(!imgModalVisible);
  };
  const { photoUri, setPhotoUri } = usePhotoContext();
  const deletePhoto = () => {
    setPhotoUri(null);
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
  }
  const savePickerTime = (selectedTime) => {
    setPickerTime(selectedTime);
    closeDatePickerModal();
  }

  //Current Date
  const currentDate = getFormatedDate(new Date(), "YYYY/MM/DD");
  const currentTime = getFormatedDate(new Date(), "h:m");

  //change date format
  const transformDate = (inputDate) => {
    if (!inputDate) {
      return null;
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [year, month, day] = inputDate.split('/');
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
      formattedTime: `${String(formattedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    };
  };
  const { ampm: ampm2, formattedTime: formattedPickerTime } = transformDateTime(pickerTime);
  const { ampm: ampm1, formattedTime: formattedCurrentTime } = transformDateTime(currentTime);



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
                {formattedPickerDate === null ? formattedCurrentDate : formattedPickerDate}
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
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={toggleImgModal} // 모달 바깥을 클릭하면 모달 닫힘
                >
                  <View style={styles.modalContainer}>
                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableOpacity onPress={toggleImgModal}>
                        <AntDesign name="close" style={styles.imgModalCloseButton} />
                      </TouchableOpacity>
                    </View>
                    <CameraPicker onClose={toggleImgModal}>
                      <View style={styles.cameraPickerBox}>
                        <Feather name="camera" style={styles.cameraImg} />
                        <Text style={{ fontWeight: 'bold' }}>Take a photo</Text>
                      </View>
                    </CameraPicker>
                    <ImagePicker onClose={toggleImgModal}>
                      <View style={styles.PhotoPickerBox} >
                        <Feather name="image" style={styles.galleryImg} />
                        <Text style={{ fontWeight: 'bold' }}>Photo Gallery</Text>
                      </View>
                    </ImagePicker>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={openSearchModal}
            >
              <View style={styles.buttonBox1}>
                <Text style={styles.buttonText}> Add More </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitMealToServer}>
              <View style={styles.buttonBox2}>
                <Text style={styles.buttonText}> Save </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.recordScroll}
          >
            {/* <Text>{mealList[0].nFoodName}</Text> */}
            {
              mealList.map((mealInfo, index) => (
                <MealCard2
                  key={index}
                  mealInfo={mealInfo} 
                  useTimepicker={useTimepicker}
                  formattedCurrentTime={formattedCurrentTime}
                  formattedPickerTime={formattedPickerTime}
                  ampm1={ampm1}
                  ampm2={ampm2}
                />
              ))
            }

            {/* <MealCard2
              mealList={mealList}
              useTimepicker={useTimepicker}
              formattedCurrentTime={formattedCurrentTime}
              formattedPickerTime={formattedPickerTime}
              ampm1={ampm1}
              ampm2={ampm2}
            /> */}
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
      </View >
    </SafeAreaView >
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
    top: '21%',
    left: '29%',
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
    backgroundColor: 'rgb(250, 71, 71)',
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
  datePicker: {
    borderRadius: 30,
  },
  modalCloseButton: {
    left: "90%",
    fontSize: 25,
    color: "rgba(0, 0, 0, 0.3)",
  },

});