// import React, { useState } from "react";
// import { Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
// import { Feather } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-modern-datepicker';

// const TimePickerExample = () => {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(true);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setShow(false);
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <SafeAreaView>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
//         <TouchableOpacity onPress={showDatepicker}>
//           <Feather name="calendar" size={40} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={showTimepicker}>
//           <Feather name="clock" size={40} color="black" />
//         </TouchableOpacity>

//         <DatePicker onSelectedChange={date => setSelectedDate(date)}
//         style={{borderRadius: 20, zIndex: 1}}/>

//         <View>
//           {show && (
//             <DateTimePicker
//               testID="dateTimePicker"
//               value={date}
//               mode={mode}
//               is24Hour={true}
//               onChange={onChange}
//             />
//           )}
//         </View>

//       </View>

//       <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>selected: {date.toLocaleString()}</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default TimePickerExample;
