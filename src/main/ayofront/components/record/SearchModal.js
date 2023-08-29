import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
//axios
import axios from "axios";
import Constants from "expo-constants";

const SearchModal = ({ modalVisible, closeModal }) => {
  const navigation = useNavigation();

  //Server 통신을 위한 URI 수정
  const uri = "http://213.35.96.167/";

  //Debounce를 적용한 SearchAPI 호출
  const [keyword, setKeyword] = useState(""); //검색 키워드
  const [list, setList] = useState([]); //검색어가 포함된 데이터 리스트

  useEffect(() => {
    if (keyword === "") {
      return; // 초기값일 때는 요청을 보내지 않음
    }

    const getList = () => {
      const query = keyword.trim();
      axios
        .get(`${uri}/api/food/search/${query}`)
        .then((response) => {
          setList(response.data);
        })
        .catch(() => {});
    };

    const debounce = setTimeout(() => {
      getList();
    }, 200); //keyword가 입력되고 0.x초 후 실행되게 지연시킴

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  //최종 검색어 제출, Validation : keyword와 list의 값이 일치하지 않으면 제출못하게 막고 error 표시
  const [error, setError] = useState("");
  const submitSearchResult = () => {
    const foundItem = list.find(
      (item) => item.nFoodName.trim() === keyword.trim()
    );
    if (!foundItem || "") {
      setError("리스트에서 음식을 고른 후 제출해주세요🥹");
      return;
    }
    navigation.push("RecordMain", { foodInfo: list });
    closeModal();
  };

  //검색어 하이라이트 색상 적용
  const highlightKeyword = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi")); //JS의 RegExp은 정규표현식 사용 'gi'는 옵션
    return (
      <Text style={{ fontSize: 18 }}>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <Text key={i} style={{ color: "red", fontWeight: "bold" }}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <BlurView style={{ flex: 1 }}>
        <View style={styles.modalScreen}>
          <TouchableOpacity onPress={closeModal}>
            <AntDesign name="close" style={styles.modalCloseButton} />
          </TouchableOpacity>
          <View style={styles.modalSearchContainer}>
            <TouchableOpacity onPress={submitSearchResult}>
              <FontAwesome5 name="search" style={styles.modalSearchButton} />
            </TouchableOpacity>
            <View style={styles.modalTextInputBox}>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Search your meal"
                returnKeyType="search"
                autoFocus={true}
                onChangeText={setKeyword}
                value={keyword}
                onSubmitEditing={submitSearchResult}
                onFocus={() => setError("")}
              />
              <Text style={{ color: "red", fontWeight: "bold" }}>{error}</Text>
            </View>
            <TouchableOpacity onPress={() => setKeyword("")}>
              <AntDesign name="closecircleo" style={styles.clearButton} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            style={styles.searchScrollView}
            keyExtractor={(item, index) => item.nNo || String(index)}
            //FlatList Rendering
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginVertical: "3%", fontSize: 18 }}
                onPress={() => {
                  setKeyword(item.nFoodName);
                }}
              >
                {highlightKeyword(item.nFoodName, keyword)}
              </TouchableOpacity>
            )}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    flex: 1,
    marginTop: "11%",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 30,
    padding: 15,
  },
  modalCloseButton: {
    margin: 10,
    left: "90%",
    fontSize: 25,
    color: "rgba(0, 0, 0, 0.1)",
  },
  modalSearchContainer: {
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  modalTextInputBox: {
    width: "80%",
    height: 45,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 50,
  },
  modalTextInput: {
    width: "80%",
    height: 45,
    fontSize: 16,
  },
  modalSearchButton: {
    fontSize: 20,
    color: "orange",
    position: "absolute",
    right: "30%",
    top: 13,
    zIndex: 1,
  },
  clearButton: {
    fontSize: 20,
    color: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
    left: "32%",
    bottom: 12,
  },
  //FlatList
  searchScrollView: {
    height: "80%",
    marginTop: "5%",
    marginLeft: "10%",
  },
});

export default SearchModal;
