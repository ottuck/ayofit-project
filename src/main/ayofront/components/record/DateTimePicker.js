import { AntDesign } from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import DatePicker from "react-native-modern-datepicker";

const DateTimePicker = ({ modalVisible, closeModal, savePickerDate, savePickerTime }) => {
    const [pickerDate, setPickerDate] = useState("");
    const [pickerTime, setPickerTime] = useState("");

    //pickerDate formatting
    const transformPickerDate = (inputDate) => {
        if (!inputDate) {
            return null;
        }
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const [year, month, day] = inputDate.split('/');
        const monthName = months[parseInt(month, 10) - 1];
        return `${monthName} ${day}, ${year}`;
    };
    const formattedPickerDate = transformPickerDate(pickerDate);

    //pickerTime formatting
    const transformPickerDateTime = (inputTime) => {
        if (!inputTime) {
            return { ampm2: null, formattedPickerTime: null };
        }
        const [hour, minute] = inputTime.split(":");
        const numericHour = parseInt(hour, 10);
        let ampm2 = "am";
        let formattedHour = numericHour;
        if (numericHour >= 12) {
            ampm2 = "pm";
            if (numericHour > 12) {
                formattedHour = numericHour - 12;
            }
        }
        return {
            ampm2: ampm2.toUpperCase(),
            formattedPickerTime: `${formattedHour}:${minute}`,
        };
    };
    const { ampm2, formattedPickerTime } = transformPickerDateTime(pickerTime);

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
        >
            <View style={{ marginTop: "50%" }}>
                <TouchableOpacity onPress={closeModal}>
                    <AntDesign name="close" style={styles.modalCloseButton} />
                </TouchableOpacity>
                <DatePicker
                    style={styles.datePicker}
                    mode={mode}
                    minuteInterval={10}
                    onTimeChange={savePickerTime}
                    selectorStartingYear={2023}
                    onDateChange={savePickerDate}
                    selected={todayDateUTC}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    //TimePicker 
    datePicker: {
        borderRadius: 30,
    },
    modalCloseButton: {
        left: "90%",
        fontSize: 25,
        color: "rgba(0, 0, 0, 0.3)",
    },
});

export default DateTimePicker;
