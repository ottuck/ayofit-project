import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { RecordSupplementContainer } from "../../components/nutriDetail/StyledComponents";

const Supplement = () => {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [supplements, setSupplements] = useState([
    "Astaxanthin",
    "Collagen",
    "DHA",
    "EPA",
    "Glucosamine",
    "Lutein",
    "Multivitamins",
    "Probiotics",
    "Royal Jelly",
    "Vitamin C",
    "Vitamin D",
    "Vitamin E",
    "B-Complex Vitamins",
    "Coenzyme Q10",
    "Iron",
    "Calcium",
    "Magnesium",
    "Zinc",
    "Selenium",
    "Folic Acid",
    "Gaba",
    "Chlorella",
    "Turmeric",
    "Amino Acids",
    "Lactic Acid Bacteria",
    "Black Vinegar",
    "Blueberry Extract",
    "Green Tea Extract",
    "Propolis",
    "Agaricus",
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filterSupplements = (term) => {
    return supplements.filter((s) =>
      s.toLowerCase().startsWith(term.toLowerCase())
    );
  };

  const isSelected = (supplement) => selectedSupplements.includes(supplement);

  const toggleSelection = (supplement) => {
    if (selectedSupplements.includes(supplement)) {
      setSelectedSupplements(
        selectedSupplements.filter((s) => s !== supplement)
      );
    } else {
      setSelectedSupplements([...selectedSupplements, supplement]);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <RecordSupplementContainer>
      <View style={styles.selectedList}>
        {selectedSupplements.slice(0, 5).map((supplement, index) => (
          <Text style={styles.selectedListText} key={index}>
            {supplement}
          </Text>
        ))}
        {selectedSupplements.length > 5 && (
          <Text style={styles.selectedListText}>
            ... 외 {selectedSupplements.length - 5}개
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.recordButton}>
        <Text style={styles.recordButtonText}>Record Supplement</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
          setSearchTerm(""); // 모달을 닫을 때 검색어 초기화
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search for supplements"
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filterSupplements(searchTerm)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleSelection(item)}
                style={isSelected(item) ? styles.selectedItem : null}
              >
                <Text style={styles.supplementItem}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />

          <TouchableOpacity
            onPress={toggleModal}
            style={styles.modalRecordButton}
          >
            <Text style={styles.recordButtonText}>Record Finish</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </RecordSupplementContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: " rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e46c0a",
    width: 250,
    height: 50,
    borderRadius: 22,
  },
  recordButtonText: {
    fontSize: 21,
    fontWeight: "500",
    color: " rgba(255, 255, 255, 0.85)",
  },
  searchInput: {
    width: "80%",
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  supplementItem: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  modalRecordButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 50,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e46c0a",
    borderRadius: 10,
  },
  selectedList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    width: "90%",
    backgroundColor: "rgba(228, 108, 10, 0.45)",
    height: 130,
    borderRadius: 22,
    marginBottom: 16,
  },
  selectedListText: {
    fontSize: 19,
    fontWeight: "500",
    color: " rgba(0, 0, 0, 0.85)",
    paddingLeft: 16,
    marginTop: 12,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedItem: {
    backgroundColor: "rgba(228, 108, 10, 0.45)",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e46c0a",
    width: 46,
    height: 46,
    top: -10,
    borderRadius: 12,
    marginLeft: 8,
  },
  closeButtonText: {
    fontSize: 22,
    fontWeight: "400",
    color: " rgba(255, 255, 255, 0.85)",
  },
});

export default Supplement;
