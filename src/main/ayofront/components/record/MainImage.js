import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../store/LoginContext";
import { usePhotoContext } from "../../store/image_context";

function MainImage({ navigate }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;
  // const uri = "http://213.35.96.167";

  const { userInfo, setUserInfo } = useContext(LoginContext);
  const { imgResults } = usePhotoContext();

  const [img, setImgs] = useState([]);
  const getImg = async () => {
    await axios
      .get(`${uri}/api/file/get-image/${userInfo.id}`)
      .then((response) => {
        // console.log(response.data);
        const newImgs = response.data.map((item) => ({
          fNo: item.fNo,
          fImg: item.fImg,
          fType: item.fType,
        }));
        setImgs(newImgs);
        console.log(newImgs);
      })
      .catch(() => {
        console.log("get error..");
      });
  };

  useEffect(() => {
    getImg();
  }, [imgResults]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.title} onPress={navigate}>
        <Text style={styles.titleText}>Diet Record</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color="rgba(0, 0, 0, 0.5)"
        />
      </TouchableOpacity>
      <View
        style={{
          width: "90%",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          alignSelf: "center",
        }}
      ></View>
      <View style={styles.imgItems}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text style={styles.text}>Breakfast</Text>
            <TouchableOpacity onPress={navigate}>
              <View style={styles.imgCard}>
                {img.find((item) => item.fType === "breakfast") ? (
                  <Image
                    source={{
                      uri:
                        img.find((item) => item.fType === "breakfast")?.fImg ||
                        null,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Image
                    source={require("../../assets/default-recordimg.png")}
                    style={styles.defaultImg}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.text}>Lunch</Text>
            <TouchableOpacity onPress={navigate}>
              <View style={styles.imgCard}>
                {img.find((item) => item.fType === "lunch") ? (
                  <Image
                    source={{
                      uri:
                        img.find((item) => item.fType === "lunch")?.fImg ||
                        null,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Image
                    source={require("../../assets/default-recordimg.png")}
                    style={styles.defaultImg}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Text style={styles.text}>Dinner</Text>
            <TouchableOpacity onPress={navigate}>
              <View style={styles.imgCard}>
                {img.find((item) => item.fType === "dinner") ? (
                  <Image
                    source={{
                      uri:
                        img.find((item) => item.fType === "dinner")?.fImg ||
                        null,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Image
                    source={require("../../assets/default-recordimg.png")}
                    style={styles.defaultImg}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.text}>Snack</Text>
            <TouchableOpacity onPress={navigate}>
              <View style={styles.imgCard}>
                {img.find((item) => item.fType === "snack") ? (
                  <Image
                    source={{
                      uri:
                        img.find((item) => item.fType === "snack")?.fImg ||
                        null,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Image
                    source={require("../../assets/default-recordimg.png")}
                    style={styles.defaultImg}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MainImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
    width: "100%",
    height: "90%",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: { fontSize: 18, fontWeight: "700", paddingLeft: "5%" },
  imgItems: { flex: 7, justifyContent: "space-around" },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: "2%",
  },
  imgCard: {
    width: 180,
    height: 100,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255, 255, 255, 1)",
    backgroundColor: "rgba(255, 233, 216, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultImg: { width: 40, height: 40 },
  img: { borderRadius: 16, width: 180, height: 100, resizeMode: "cover" },
});
