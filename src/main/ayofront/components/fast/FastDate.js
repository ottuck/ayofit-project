import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';
import {FastDateContainer, CustomDatePicker, StartDate, ModalContent} from './FastingStyled'

const FastDate = ({ onDateChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleDatePickerPress = () => {
    toggleDatePicker();
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
    toggleDatePicker();
  }

  let nowDate = new Date();
  let currentYear = nowDate.getFullYear();
  function MonthNumber(month) {
    return month < 10 ? `0${month}` : `${month}`;
  }
  let currentMonth = MonthNumber(nowDate.getMonth() + 1);

  function DateNumber(Date) {
    return Date < 10 ? `0${Date}` : `${Date}`;
  }
  let currentDay = DateNumber(nowDate.getDate());
  let currentDate = `${currentYear}/${currentMonth}/${currentDay}`;
  let currentDateString = `"${currentYear}-${currentMonth}-${currentDay}"`;
 
  return (
    <FastDateContainer>
      <CustomDatePicker onPress={handleDatePickerPress}>
        <StartDate>
          {selectedDate || currentDate}
        </StartDate>
      </CustomDatePicker>
      <Modal isVisible={isDatePickerVisible} onBackdropPress={toggleDatePicker}>
        <ModalContent>
          <DatePicker
            options={{
              backgroundColor: 'white',
              textHeaderColor: '#2c3e50',
              textDefaultColor: '#e67e22',
              selectedTextColor: '#2c3e50',
              mainColor: '#f19066',
              textSecondaryColor: '#2c3e50',
              borderColor: '#f19066',
            }}
            onDateChange={handleDateChange}
            current={currentDateString}
            selected={currentDateString}
            mode="calendar"
            minuteInterval={30}
            style={styles.datePicker}
          />
        </ModalContent>
      </Modal>
    </FastDateContainer>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    borderRadius: 10,
  },
});

export default FastDate;
