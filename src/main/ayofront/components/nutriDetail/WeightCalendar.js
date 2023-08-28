import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const WeightCalendar = ({ calendarMode, onDateChange, onResetDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  today.setHours(today.getHours() + 9); // 도쿄,서울 날짜와 맞추기위해
  today.setDate(today.getDate());
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (onResetDate) {
      setSelectedDate(today);
    }
  }, [onResetDate]);

  useEffect(() => {
    setSelectedDate(today);
  }, [calendarMode]);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  }, [selectedDate]);

  const isFutureDate = selectedDate.setHours(0, 0, 0, 0) >= today;

  const changeWeightDate = (dateNum) => {
    let newDate = new Date(selectedDate);
    newDate.setHours(newDate.getHours() + 9);
    switch (calendarMode) {
      case "Daily":
        newDate.setDate(newDate.getDate() + dateNum * 7);
        formattedDaily = newDate.toISOString().split("T")[0];
        console.log(formattedDaily);
        break;
      case "Weekly":
        newDate.setDate(newDate.getDate() + dateNum * 28);
        formattedWeekly = newDate.toISOString().split("T")[0];
        console.log(formattedWeekly);
        break;
      case "Monthly":
        newDate.setMonth(newDate.getMonth() + dateNum * 3);
        formattedMonthly = newDate.toISOString().split("T")[0];
        console.log(formattedMonthly);
        break;
    }
    setSelectedDate(newDate);
  };

  const getDisplayDate = () => {
    let startDate = new Date(selectedDate); // selectedDate를 기준으로 시작
    let endDate = new Date(selectedDate); // selectedDate를 기준으로 끝
    startDate.setHours(startDate.getHours() + 9);
    endDate.setHours(endDate.getHours() + 9);

    switch (calendarMode) {
      case "Daily":
        startDate.setDate(startDate.getDate() - 6);
        break;
      case "Weekly":
        startDate.setDate(startDate.getDate() - 27);
        break;
      case "Monthly":
        let initialStartYear = startDate.getFullYear(); // 연도를 가져오기
        let initialStartMonth = startDate.getMonth();

        if (initialStartMonth - 2 < 0) {
          initialStartYear -= 1;
          initialStartMonth = initialStartMonth - 2 + 12;
        } else {
          initialStartMonth -= 2;
        }

        startDate.setFullYear(initialStartYear, initialStartMonth);
        let startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
        let endYear = endDate.getFullYear();
        let endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);

        if (initialStartYear === endYear) {
          return `${initialStartYear}.${startMonth}~${endYear}.${endMonth}`;
        } else {
          return `${initialStartYear}.${startMonth}~${endYear}.${endMonth}`;
        }
    }

    let formatDateString = (dates) =>
      `${("0" + (dates.getMonth() + 1)).slice(-2)}.${(
        "0" + dates.getDate()
      ).slice(-2)}`;

    return `${formatDateString(startDate)} ~ ${formatDateString(endDate)}`;
  };

  return (
    <View style={styles.weightCalendarContainer}>
      <TouchableOpacity
        style={styles.prevDate}
        onPress={() => changeWeightDate(-1)}
      >
        <Image
          source={require("../../assets/dateLeft.png")}
          style={styles.weightDateIcon}
        />
      </TouchableOpacity>
      <Text style={styles.weightDateText}>{getDisplayDate()}</Text>
      <TouchableOpacity
        onPress={() => changeWeightDate(1)}
        disabled={isFutureDate}
      >
        <Image
          source={require("../../assets/dateRight.png")}
          style={[
            styles.weightDateIcon,
            isFutureDate ? styles.disabledIcon : {},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  weightCalendarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 19,
    marginBottom: 30,
  },
  prevDate: {
    width: 36,
    height: 22,
  },
  weightDateText: {
    fontSize: 21,
    fontWeight: "400",
    marginLeft: 1,
    marginRight: 0.8,
  },
  weightDateIcon: {
    tintColor: "#E46C0A",
    height: 20,
    width: 16,
    marginHorizontal: 8,
    marginTop: 1.2,
  },
  disabledIcon: {
    opacity: 0.5,
  },
});

export default WeightCalendar;
