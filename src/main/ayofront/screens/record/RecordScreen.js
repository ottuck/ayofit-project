import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import styled from "styled-components/native";


const backgroundImage = require('../../images/background-img.png');

// const Nutrient = styled.Text`
// background-color : white;
// `;

function RecordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}> Diet Record</Text>
          <Text style={styles.headerDate}> 2023-08-06</Text>
        </View>

        <ScrollView horizontal={true} contentContainerStyle={styles.cardScroll}>
          <View style={styles.cardContainer}>
            <Image source={require('../../images/food-mock-img.png')} style={styles.cardImage} /
            >
            <View style={{width:'90%'}}>
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.mealTime}>BreakFast : </Text>
                  <Text style={styles.nutrientText}>Carb : </Text>
                  <Text style={styles.nutrientText}>Protein :  </Text>
                  <Text style={styles.nutrientText}>Fat : </Text>
                  <Text style={styles.TotalValue}>Total calories : </Text>
                </View>
                <View>
                  <Text style={styles.mealTime}>AM 09:44</Text>
                  <Text style={styles.nutrientValue}>55g</Text>
                  <Text style={styles.nutrientValue}>16.4g</Text>
                  <Text style={styles.nutrientValue}>21.5g</Text>
                  <Text style={styles.TotalValue}>487kcal</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
}
export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE9D8',
    // 이미지를 백그라운드 색이랑 합친걸로 교체해야 SafeArea 부분 색을 쉽게 변경 가능
    // backgroundColor: '#E46C0A',
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
    width: '80%',
    marginTop: 80,
    marginLeft: 35,   //가운대로 정렬하는 올바른 방법으로 수정 필요함
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
  cardScroll: {
    flex: 1,
    flexDirection: 'row', // 가로 방향 스크롤을 위해 필요한 스타일
    justifyContent: 'center'
  },
  cardContainer: {
    alignSelf: 'center',  //상하 정렬 방법 수정 필요
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android에서 그림자를 보이게 하려면 elevation 설정
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 270,
    width: 270,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTime: {
    color: 'orange', 
    fontWeight: 'bold', 
    fontSize: 20,
  },
  nutrientText: {
    fontSize : 17,
    fontWeight: 'bold',
  },
  nutrientValue: {
    fontSize : 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  TotalValue: {
    fontSize : 20,
    fontWeight: 'bold',
    textAlign: 'right',
  }
});
