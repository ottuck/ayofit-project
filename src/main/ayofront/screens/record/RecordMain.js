import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const RecordMain = ({ navigation }) => {
  const backgroundImage = require('../../images/background-img.png');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

          <View style={styles.cardContainer}>
            <View style={styles.cardImageContainer} >
              <TouchableOpacity>
                <AntDesign name="closecircle" style={styles.photoDeleteButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Feather name="plus-circle" style={styles.plusIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.recordScroll}
          >



            <View style={styles.foodRecordContainer}>
              <TouchableOpacity>
                <AntDesign name="close" style={styles.recordDeleteButton} />
              </TouchableOpacity>
              <View>
                <Text style={styles.foodInfo}>Food: Carrot</Text>
                <Text style={styles.foodInfo}>Calories: 41.3 Kcal</Text>
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

            <View style={styles.foodRecordContainer}>
              <TouchableOpacity>
                <AntDesign name="close" style={styles.recordDeleteButton} />
                </TouchableOpacity>
              <View>
                <Text style={styles.foodInfo}>Food: Carrot</Text>
                <Text style={styles.foodInfo}>Calories: 41.3 Kcal</Text>
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

            <View style={styles.foodRecordContainer}>
              <TouchableOpacity>
                <AntDesign name="close" style={styles.recordDeleteButton} />
              </TouchableOpacity>
              <View>
                <Text style={styles.foodInfo}>Food: Carrot</Text>
                <Text style={styles.foodInfo}>Calories: 41.3 Kcal</Text>
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
  //사진 등록 창
  cardContainer: {
    alignSelf: 'center',
    width: 300,
    height: 250,
    marginVertical: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 285,
    height: 235,
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
    fontSize: 35,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    left: 130,
    bottom: 80,
  },
  //식단 기록 스크롤
  recordScroll: {
    alignItems: 'center',
  },
  foodRecordContainer: {
    width: 350,
    height: 150,
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 20,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
  },
  foodInfo: {
    fontWeight: 'bold',
    fontSize: 17,
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
    borderWidth: 0.2,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  foodNutrient: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 2,
  },
  recordDeleteButton: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    left: '95%',
  }

  //버튼 영역

});
