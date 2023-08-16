import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function RecordScreen({ navigation }) {
  //모달 관련 
  const [modalVisible, setModalVisible] = useState(false);
  const openSearchModal = () => {
    setModalVisible(true);
  };
  const closeSearchModal = () => {
    setModalVisible(false);
  };

  const [searchText, setSearchText] = useState("");
  const searchSubmit = () => {
    // 여기서 검색어를 처리하거나 필요한 작업을 수행합니다.
    // 예: 검색 결과를 가져오거나 화면 전환 등

    // RecordMain.js로 네비게이션을 수행합니다.
    navigation.navigate("RecordMain");
    closeSearchModal();
  };

  const backgroundImage = require('../../images/background-img.png');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> 2023-08-06</Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            <View style={styles.cardContainer}>
              <View style={styles.cardImageContainer}>
                <TouchableOpacity onPress={openSearchModal}>
                  <Feather name="plus-circle" style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '90%' }}>
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

          <Modal animationType="slide" visible={modalVisible} transparent={true} >
            {/* <BlurView style={styles.modalScreen}> */}
            <BlurView style={{ flex: 1 }}>
              <View style={styles.modalScreen}>
                <TouchableOpacity onPress={closeSearchModal} >
                  <AntDesign name="close" style={styles.modalCloseButton} />
                </TouchableOpacity>
                <View style={styles.modalSearchContainer}>
                  <TouchableOpacity>
                    <FontAwesome5 name="search" style={styles.modalSearchButton} />
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Search your food"
                    style={styles.modalTextInput}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    onSubmitEditing={searchSubmit}
                  />
                  <TouchableOpacity>
                    <AntDesign name="closecircleo" style={styles.clearButton} />
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Modal>

        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
export default RecordScreen;

const styles = StyleSheet.create({
  safeArea: {
    // 이미지를 백그라운드 색이랑 합친걸로 교체하면 태그  SafeArea 부분 색을 쉽게 변경 가능
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
  cardScroll: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
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
    elevation: 5, // Android에서 그림자를 보이게 하려면 elevation 설정
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
  //모달 디자인
  modalScreen: {
    flex: 1,
    marginTop: '11%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 30,
    padding: 15,
  },
  modalCloseButton: {
    margin: 10,
    left: '90%',
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.1)',
  },
  modalSearchContainer: {
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  modalTextInput: {
    width: '80%',
    height: 45,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 50,
    fontSize: 16,
  },
  modalSearchButton: {
    fontSize: 20,
    color: 'orange',
    position: 'absolute',
    right: '30%',
    top: 13,
    zIndex: 1
  },
  clearButton: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    left: '32%',
    bottom: 12,
  }
});
