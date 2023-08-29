import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MealCard1 from '../../components/record/MealCard1';
import SearchModal from '../../components/record/SearchModal';
import { useMealContext } from '../../store/MealContext';


function RecordScreen({ route }) {

  //Search Modal
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const openSearchModal = () => {
    setSearchModalVisible(true);
  };
  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

  // recordMain.js 에서 보내는 openSearchModal 요청 받기
  // useEffect(() => {
  //   if (route.params?.shouldOpenModal) {
  //     openSearchModal();
  //     route.params.shouldOpenModal = false;
  //   }
  // }, [route.params?.shouldOpenModal]);

  //Rending page
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/background-img.png')} style={styles.backgroundImage}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> 2023.08.29 </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            <MealCard1 mealType="Breakfast" mealTime="10:00" carb="55" protein="16.4" fat="21.5" totalCalories="487" openSearchModal={openSearchModal} />
            <MealCard1 mealType="Lunch" mealTime="10:00" carb="60" protein="18" fat="20" totalCalories="500" openSearchModal={openSearchModal} />
            <MealCard1 mealType="Dinner" mealTime="10:00" carb="65" protein="19" fat="23" totalCalories="550" openSearchModal={openSearchModal} />
            <MealCard1 mealType="Snack" mealTime="10:00" carb="65" protein="19" fat="23" totalCalories="550" openSearchModal={openSearchModal} />
          </ScrollView>

          <SearchModal
            fromPage="RecordScreen"
            searchModalVisible={searchModalVisible}
            closeSearchModal={closeSearchModal}
          />

        </ImageBackground>
      </View >
    </SafeAreaView >
  );
}
export default RecordScreen;

const styles = StyleSheet.create({
  safeArea: {
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    marginVertical: 80,
    marginHorizontal: 35,
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 25,
    color: 'white',
  },
  headerDate: {
    color: '#CECECE',
    fontSize: 17,
  },
  //카드 디자인
  cardContainer: {
    width: 300,
    height: 430,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 270,
    height: 270,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 60,
    color: 'rgba(0, 0, 0, 0.10)',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  mealTime: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nutrientText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  nutrientValue: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  TotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});