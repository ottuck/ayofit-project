import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const MealCard1 = ({
  mealType,
  imgUri,
  carb,
  protein,
  fat,
  checkCardPress,
  cardStyle,
}) => {
  // console.log(imgUri);
  return (
    // <View style={styles.cardContainer}>
    <View style={[styles.cardContainer, ...cardStyle]}>
      <View style={styles.cardImageContainer}>
        {imgUri ? (
          <Pressable onPress={checkCardPress} style={styles.mealImage}>
            <Image source={{ uri: imgUri }} style={styles.mealImage} />
          </Pressable>
        ) : (
          <TouchableOpacity onPress={checkCardPress}>
            <Feather name="plus-circle" style={styles.plusIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: "90%" }}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.mealType}>{mealType}</Text>
            <Text style={styles.nutrientText}>Carb :</Text>
            <Text style={styles.nutrientText}>Protein :</Text>
            <Text style={styles.nutrientText}>Fat :</Text>
            <Text style={styles.carloriesText}>Calories :</Text>
          </View>
          <View>
            <Text style={styles.mealTime}> </Text>
            <Text style={styles.nutrientValue}>
              {carb === null || carb === undefined ? 0 : Math.floor(carb)} g
            </Text>
            <Text style={styles.nutrientValue}>
              {protein === null || protein === undefined
                ? 0
                : Math.floor(protein)}{" "}
              g
            </Text>
            <Text style={styles.nutrientValue}>
              {fat === null || fat === undefined ? 0 : Math.floor(fat)} g
            </Text>
            <Text style={styles.carloriesValue}>
              {carb === null ||
              protein === null ||
              fat === null ||
              carb === undefined ||
              protein === undefined ||
              fat === undefined
                ? "0 kcal"
                : Math.floor(carb * 4 + protein * 4 + fat * 9) + " kcal"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    height: 410,
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImageContainer: {
    width: 260,
    height: 260,
    backgroundColor: "rgba(0, 0, 0, 0.10)",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mealImage: { width: "100%", height: "100%" },
  plusIcon: {
    fontSize: 60,
    color: "rgba(0, 0, 0, 0.10)",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  mealType: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 20,
  },
  mealTime: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right",
  },
  nutrientText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  nutrientValue: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "right",
  },
  carloriesText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  carloriesValue: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default MealCard1;
