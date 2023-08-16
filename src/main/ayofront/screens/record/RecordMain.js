import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const RecordMain = ({ navigation }) => {
  const backgroundImage = require('../../images/background-img.png');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> August 16, 2023 </Text>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.cardImageContainer} >
              <TouchableOpacity>
                <AntDesign name="closecircle" style={styles.photoDeleteButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate("ImagePickerExample") }}>
                <Feather name="plus-circle" style={styles.plusIcon} />
              </TouchableOpacity>
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
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row' }}>
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

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
export default RecordMain;

const styles = StyleSheet.create({
  safeArea: {
    // 이미지를 백그라운드 색이랑 합친걸로 교체해야 SafeArea 부분 색을 쉽게 변경 가능
    backgroundColor: '#E46C0A',
  },
  container: {
    backgroundColor: '#FFE9D8',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  //해더
  headerContainer: {
    alignSelf: 'center',
    top: 20,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  //사진 등록 창
  cardContainer: {
    alignSelf: 'center',
    width: 290,
    height: 240,
    marginVertical: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 280,
    height: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 40,
    color: 'rgba(0, 0, 0, 0.10)',
  },
  photoDeleteButton: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    left: 130,
    bottom: 80,
  },
  //추가, 확인 버튼
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recordButton: {
    height: 40,
    width: 170,
    borderRadius: 20,
    backgroundColor: '#FFB172',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  //식단 기록 컨테이너
  recordScroll: {
    alignItems: 'center',
  },
  foodRecordContainer: {
    width: 350,
    height: 175,
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recordMidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 5
  },
  recordTime1: {
    color: '#E46C0A',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-end',
  },
  recordTime2: {
    color: '#E46C0A',
    fontWeight: 'bold',
    fontSize: 40,
  },
  foodInfo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 2,
  },
  foodNutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodNutrientBox: {
    width: 100,
    height: 50,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  foodNutrient: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 2,
  },
  //하트, 삭제 버튼
  recordIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeButton: {
    fontSize: 23,
    color: '#E46C0A',
  },
  recordDeleteButton: {
    fontSize: 23,
    color: 'rgba(0, 0, 0, 0.3)',
  }

  //버튼 영역

});
