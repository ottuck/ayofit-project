import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//axios
import axios from "axios";
import Constants from "expo-constants";

function RecordScreen({ navigation }) {
  //Server 통신을 위한 URI 수정
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  //Debounce를 적용한 SearchAPI 호출
  const [keyword, setKeyword] = useState('');   //검색 키워드
  const [list, setList] = useState([]);   //검색어가 포함된 데이터 리스트


  useEffect(() => {
    const getList = () => {
      const query = keyword.trim();
      // console.log("URL:", `${uri}/api/food/search/${query}`);

      axios
        .get(`${uri}/api/food/search/${query}`)
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => console.log(error));
    };

    const debounce = setTimeout(() => {
      getList();
    }, 200);  //keyword가 입력되고 0.x초 후 실행되게 지연시킴

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  //최종 검색어 제출
  // console.log(list);
  const submitSearchResult = () => {
    navigation.push('RecordMain', { food: list });  //list객체를 'food'로 넘김
    closeModal();
  };

  //Validation
  const [error, setError] = useState('');
  const validateInput = () => {
    if (keyword.trim() === '') {
      setError('음식 이름을 입력해주세요. ex) 닭');
      return false;
    } else {
      setError('');
      return true;
    }
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
                  <View style={styles.modalTextInputBox}>
                    <TextInput
                      style={styles.modalTextInput}
                      placeholder="Search your meal"
                      onChangeText={setKeyword}
                      value={keyword}
                      onSubmitEditing={submitSearchResult}
                      returnKeyType="search" onBlur={validateInput}
                    />
                  </View>
                  <TouchableOpacity onPress={() => setKeyword('')}>
                    <AntDesign name="closecircleo" style={styles.clearButton} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={list}
                  showsVerticalScrollIndicator={false}
                  style={styles.searchScrollView}
                  keyExtractor={(item, index) => item.nNo || String(index)}
                  //FlatList Rendering
                  renderItem={({ item }) =>
                    <TouchableOpacity
                      style={{ marginVertical: '3%', fontSize: 18  }}
                      onPress={() => { setKeyword(item.nFoodName) }}
                    >
                      <Text style={{ fontSize: 18 }}>
                        {item.nFoodName}
                      </Text>
                    </TouchableOpacity>
                  }
                />
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
  modalTextInputBox: {
    width: '80%',
    height: 45,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 50,
  },
  modalTextInput: {
    width: '80%',
    height: 45,
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
  //FlatList
  searchScrollView: {
    height: '80%', marginTop: '5%', marginLeft: '10%'
  },
});
