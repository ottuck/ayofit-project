import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const MealCard2 = ({ foodInfo, useTimepicker, formattedPickerTime, ampm2, ampm1, currentTime }) => {
  return (
    <View style={styles.blurViewBox}>
      <BlurView>
        <View style={styles.foodRecordContainer}>
          <View style={styles.recordIconContainer}>
            <TouchableOpacity>
              <Ionicons name="heart-outline" style={styles.likeButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={{}}>
              <AntDesign name="close" style={styles.recordDeleteButton} />
            </TouchableOpacity>
          </View>

          <View style={styles.recordMidContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="clip">
                {foodInfo[0].nFoodName}
              </Text>
              <Text style={styles.foodKcal}>
                {foodInfo[0].nKcal} Kcal
              </Text>
            </View>
            <TouchableOpacity onPress={useTimepicker}>
              <View style={styles.recordTimeContainer}>
                <Text style={styles.recordTime1}>
                  {ampm2 === null ? ampm1 : ampm2}
                </Text>
                <Text style={styles.recordTime2}>
                  {formattedPickerTime === null ? currentTime : formattedPickerTime}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.foodNutrientContainer}>
            <View style={styles.foodNutrientBox}>
              <Text style={styles.foodNutrient}>Carb</Text>
              <Text style={styles.foodNutrient}>
                {foodInfo[0].nCarbohydrate === null ? "-" : foodInfo[0].nCarbohydrate}
              </Text>
            </View>
            <View style={styles.foodNutrientBox}>
              <Text style={styles.foodNutrient}>Protein</Text>
              <Text style={styles.foodNutrient}>
                {foodInfo[0].nProtein === null ? "-" : foodInfo[0].nProtein}
              </Text>
            </View>
            <View style={styles.foodNutrientBox}>
              <Text style={styles.foodNutrient}>Fat</Text>
              <Text style={styles.foodNutrient}>
                {foodInfo[0].nFat === null ? "-" : foodInfo[0].nFat}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  //식단 기록 컨테이너
  blurViewBox: {
    overflow: 'hidden',
    borderRadius: 20,
    marginVertical: 20,
  },
  foodRecordContainer: {
    alignSelf: 'center',
    width: 350,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.6)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
  },
  recordMidContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  recordTimeContainer: {
    flexDirection: "row", alignItems: "baseline"
  },
  recordTime1: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 4,
  },
  recordTime2: {
    color: "#E46C0A",
    fontWeight: "bold",
    fontSize: 34,
  },
  textWrapper: {
    width: '55%',
    overflow: 'hidden',
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodKcal: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 2,
  },
  foodNutrientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodNutrientBox: {
    width: 100,
    height: 50,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  foodNutrient: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 2,
  },
  //하트, 삭제 버튼
  recordIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
    fontSize: 23,
    color: "#E46C0A",
  },
  recordDeleteButton: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.3)",
  },

});


export default MealCard2;
