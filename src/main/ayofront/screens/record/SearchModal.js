import { View, StyleSheet, TouchableOpacity, TextInput, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const SearchModal = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const searchSubmit = () => {
        // 여기서 검색어를 처리하거나 필요한 작업을 수행합니다.
        // 예: 검색 결과를 가져오거나 화면 전환 등

        // RecordMain.js로 네비게이션을 수행합니다.
        navigation.navigate("RecordMain");
    };

    return (
        <View style={styles.searchModalScreen}>
            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
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
            </View>
        </View>
    )
}

export default SearchModal

const styles = StyleSheet.create({
    searchModalScreen: {
        flex: 1,
        borderRadius: 10,
    },
    modalCloseButton: {
        margin: 10,
        left: '90%',
        fontSize: 25,
        color: '#cecece',
    },
    modalSearchContainer: {
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    modalTextInput: {
        width: '80%',
        height: 45,
        borderColor: '#cecece',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 50,
        color: 'orange',
        fontSize: 16
    },
    modalSearchButton: {
        fontSize: 20,
        color: 'orange',
        position: 'absolute',
        right: '30%',
        top: 13,
        zIndex: 1
    },
})