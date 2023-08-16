import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const DateCalendar = ({ mode, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  today.setDate(today.getDate()); // 도쿄,서울 날짜와 맞추기위해 + 1
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    setSelectedDate(today); // mode가 변경될 때마다 선택된 날짜를 현재 날짜로 초기화
  }, [mode]);

  const isFutureDate = selectedDate.setHours(0, 0, 0, 0) >= today;

  const formatDate = () => {
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    if (mode === "Day") {
      return (
        `${month}.${day} ` +
        `(${
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            selectedDate.getDay()
          ]
        })`
      );
    } else if (mode === "Week") {
      let startOfWeek = new Date(selectedDate);
      let endOfWeek = new Date(selectedDate);

      // 선택된 날짜의 6일 전을 주의 시작일로 설정
      startOfWeek.setDate(selectedDate.getDate() - 6);

      const startMonth = String(startOfWeek.getMonth() + 1).padStart(2, "0");
      const startDay = String(startOfWeek.getDate()).padStart(2, "0");
      const endMonth = String(endOfWeek.getMonth() + 1).padStart(2, "0");
      const endDay = String(endOfWeek.getDate()).padStart(2, "0");

      return `${startMonth}.${startDay} ~ ${endMonth}.${endDay}`; // 주의 시작일과 끝일을 반환
    } else {
      // "Month" 부분
      return `${selectedDate.getFullYear()}.${month}`;
    }
  };

  const changeDate = (offset) => {
    let newDate = new Date(selectedDate);
    if (mode === "Day") {
      newDate.setDate(selectedDate.getDate() + offset);
      console.log(11);
    } else if (mode === "Week") {
      newDate.setDate(selectedDate.getDate() + offset * 7);
    } else {
      // "Month" 부분
      newDate.setMonth(selectedDate.getMonth() + offset);
    }

    if (newDate.setHours(0, 0, 0, 0) <= today) {
      setSelectedDate(newDate); // 새로운 날짜로 설정
      onDateChange(newDate);
    }
  };

  return (
    <View style={styles.calendarContainer}>
      <TouchableOpacity onPress={() => changeDate(-1)}>
        <Image
          source={require("../../assets/dateLeft.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.dateText}>
        {formatDate()} {/* 날짜 형식에 따른 출력 */}
      </Text>
      <TouchableOpacity disabled={isFutureDate} onPress={() => changeDate(1)}>
        <Image
          source={require("../../assets/dateRight.png")}
          style={[styles.icon, isFutureDate ? styles.disabledIcon : {}]} // 미래의 날짜일 경우 비활성화 효과 적용
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "400",
    marginHorizontal: 10,
  },
  icon: {
    tintColor: "#E46C0A",
    height: 20,
    width: 16,
    marginLeft: -4.2,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default DateCalendar;
