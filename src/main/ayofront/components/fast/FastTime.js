import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';
import {FastTimeContainer,CustomTimePicker,StartTime,ModalContent2} from './FastingStyled';

const FastTime = ({ onTimeChange }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const toggleTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };

  const handleTimePickerPress = () => {
    toggleTimePicker();
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
    onTimeChange(newTime);
    toggleTimePicker();
  }
//----------------------현재 시간---------------//
  let nowTime = new Date();

  function TimeNumber(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }
  let nowHours = TimeNumber(nowTime.getHours());

  function MinuteNumber(minute) {
    return minute < 10 ? `0${minute}` : `${minute}`;
  }
  let nowminutes = MinuteNumber(nowTime.getMinutes());

  const HourMinutes = `${nowHours}:${nowminutes}`
  const HourMinutesString = `"${nowHours}:${nowminutes}"`;

  return (
    <FastTimeContainer>
      <CustomTimePicker onPress={handleTimePickerPress}>
        <StartTime>
        {selectedTime || HourMinutes}
        </StartTime>
      </CustomTimePicker>
      <Modal isVisible={isTimePickerVisible} onBackdropPress={toggleTimePicker}>
        <ModalContent2>
          <DatePicker
            options={{
              backgroundColor: 'white',
              textHeaderColor: '#2f3542',
              textDefaultColor: '#2f3542',
              selectedTextColor: '#fff',
              mainColor: '#F4722B',
              textSecondaryColor: '#2c3e50',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            current={HourMinutesString}
            selected={HourMinutesString}
            onTimeChange={handleTimeChange}
            mode="time"
            minuteInterval={1}
            style={styles.timePicker}
            is24Hour={true}
          />
        </ModalContent2>
      </Modal>
    </FastTimeContainer>
  );
};

const styles = StyleSheet.create({
  timePicker: {
    borderRadius: 10,

  },
});

export default FastTime;
