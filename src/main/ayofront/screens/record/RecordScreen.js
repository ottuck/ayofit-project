import { View, Text, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//axios
import axios from "axios";
import Constants from "expo-constants";

function RecordScreen({ navigation }) {
  //uri 수정
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  //Validation
  const [error, setError] = useState('');
  const validateInput = () => {
    if (searchQuery.trim() === '') {
      setError('음식 이름을 입력해주세요. ex) 닭');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  //검색어 입력할때마다 axios 요청(검색어 지원 기능)
  const getRealTimeFoodSearch = () => {
    const query = searchQuery.trim(); // 앞뒤 공백 제거
    console.log("Searching for:", query);
    console.log("URL:", `${uri}/api/food/search/${query}`);

    axios
      .get(`${uri}/api/food/search/${query}`)
      .then((response) => {
        console.log(response.data[0]);
        setSearchResult(response.data);

        if (validateInput()) {
          submitSearchResult();
        }
      })
      .catch((error) => console.log(error));
  }

  //제출 검색어로 axios 요청
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchFood = () => {
    const query = searchQuery.trim(); // 앞뒤 공백 제거
    console.log("Searching for:", query);
    console.log("URL:", `${uri}/api/food/search/${query}`);

    axios
      .get(`${uri}/api/food/search/${query}`)
      .then((response) => {
        // console.log(response.data);
        setSearchResult(response.data);

        if (validateInput()) {
          submitSearchResult();
        }
      })
      .catch((error) => console.log(error));
  };

  //검색어 제출
  const submitSearchResult = (navigation) => {
    console.log('검색어 제출', { searchResult });
    navigation.navigate("RecordMain", { searchResult });  //naviation.push 로 변경
    closeModal();
  };

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  //toISOString은 "2023-08-20T14:30:00.000Z"와 같은 형식이라 "T" 나눠서 0번째 index의 날짜만 가져온다
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/background-img.png')} style={styles.backgroundImage}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> {formattedToday} </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            <View style={styles.cardContainer}>
              <View style={styles.cardImageContainer}>
                <TouchableOpacity onPress={openModal}>
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
            <BlurView style={{ flex: 1 }}>
              <View style={styles.modalScreen}>
                <TouchableOpacity onPress={closeModal} >
                  <AntDesign name="close" style={styles.modalCloseButton} />
                </TouchableOpacity>
                <View style={styles.modalSearchContainer}>
                  <TouchableOpacity>
                    <FontAwesome5 name="search" style={styles.modalSearchButton} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.modalTextInput}
                    placeholder="Search your meal"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onChange={getRealTimeFoodSearch}
                    onBlur={validateInput}
                    onSubmitEditing={searchFood}
                  />
                  <TouchableOpacity>
                    <AntDesign name="closecircleo" style={styles.clearButton} />
                  </TouchableOpacity>
                </View>
                {/* 검색어 리스트 */}
                <FlatList
                  data={searchResult}
                  renderItem={({ item }) =>
                    <Text style={styles.searchScrollViewText}>
                      {item.nFoodName}
                    </Text>
                  }
                  keyExtractor={item => item.nId}
                  showsVerticalScrollIndicator={false}
                  style={styles.searchScrollView}
                />
                {/* <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.searchScrollView}
                >
                  {error ? <Text style={{ color: 'red' }}> {error} </Text> : null}

                  {searchResult.map((food, index) => (
                    <Text key={index} style={styles.searchScrollViewText}>
                      {food.nFoodName}
                    </Text>
                  ))}
                </ScrollView> */}
              </View>
            </BlurView>
          </Modal>

        </ImageBackground>
      </View >
    </SafeAreaView >
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
  },
  //검색창
  searchScrollView: {
    height: '80%', marginTop: '10%', marginLeft: '10%'
  },
  searchScrollViewText: {
    fontSize: 18,
  },
});
