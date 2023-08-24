import React, { useState,} from "react";
import { StyleSheet, TouchableOpacity,Text, Alert } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import FastTime from '../components/fast/FastTime';
import FastDate from "../components/fast/FastDate";
import {MethodContainer, MethodTitle, MethodCTouch, MethodCText, MethodCEndTouch,PlanContainer,PlanTitle,PlanMethodText,PlanMethodCView,PlanMethodC
    ,PlanEndView,PlanEndText,PlanConfirmV,PlanConfirmB,PlanConfirmT,ConfirmScroll,ConfirmContainer,ConfirmTitle,ConfirmTime,ConfirmBtn,ConfirmText
    ,TimerContainer,TimerTitle,TimerHomeBtn,TimerHomeBT,EndTimeText,MethodCTextS,ConfirmMessage,ConfirmMView,ConfirmStart,ConfrimSText,ConfirmEnd
    ,ConfirmEText,ConfirmTView,TimerStart,TimerSText,TimerEnd,TimerEText,TimerMView,FirstMainPage,MainBtn,MainText,FastMainImage
    ,ConfirmHeader,MethodScrollView,ConfirmTimeText,ConfirmTextM,MethodLeftContent,MethodRightContent,
    MethodCText2,MethodCTextS2,TimerScrollView,TimerStop
} from '../components/fast/FastingStyled';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import Constants from "expo-constants";




//-------------------------------current Time------------------------------//
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



let nowTime = new Date();

function TimeNumber(time) {
  return time < 10 ? `0${time}` : `${time}`;
}
let nowHours = TimeNumber(nowTime.getHours());

function MinuteNumber(minute) {
  return minute < 10 ? `0${minute}` : `${minute}`;
}
let nowminutes = MinuteNumber(nowTime.getMinutes());

let HourMinutes = `${nowHours}:${nowminutes}`

//-----------------------------------------------------------------------//


//---------------------StackPage-----------------------------------------//
const FastMainPage = ({navigation : { navigate } }) => (
<LinearGradient colors={['#f7d7be','#e7a370']}>
    <FirstMainPage>
    <MainBtn onPress={() => navigate("FastingMethod")}>
        <MainText>+ Set up your plan</MainText>
    </MainBtn>
</FirstMainPage>
    </LinearGradient>
    );
    


const FastMethod = ({ navigation }) => {
    const[seletedDate, setSelectedDate] = useState('');
    const[selectedTime,setSelectedTime] = useState('');
    const[endTime,setEndTime] = useState('');


    const selectMethod = (seletedValue) => {
        
        let nowDate = new Date();
        let currentYear = nowDate.getFullYear();
        let currentMonth = MonthNumber(nowDate.getMonth() + 1);
        
        let currentDay = DateNumber(nowDate.getDate());
        let currentDate = `${currentYear}/${currentMonth}/${currentDay}`;
        
        
        let nowTime = new Date();
        let nowHours = TimeNumber(nowTime.getHours());
        let nowminutes = MinuteNumber(nowTime.getMinutes());
        
        let endHour = parseInt(nowHours) + parseInt(seletedValue);
        let endMinute = parseInt(nowminutes);
        let nextDate = new Date();
        
        if (endHour >= 24) {
            endHour -= 24;
            nextDate.setDate(nextDate.getDate() + 1);
            setSelectedDate(`${nextDate.getFullYear()}/${currentMonth}/${DateNumber(nextDate.getDate())}`);
        }
        
        let endTime = `${nextDate.getFullYear()}/${MonthNumber(nextDate.getMonth() + 1)}/${DateNumber(nextDate.getDate())} : ${TimeNumber(endHour)}:${TimeNumber(endMinute)}`;

        setEndTime(endTime);

        const stringFormat = `${seletedValue} - ${24 - seletedValue}`;   
        navigation.navigate("FastPlan",{
            seletedValue: {
                number: seletedValue,
                string: stringFormat,
            },
            seletedDate: seletedDate || currentDate,
            selectedTime: selectedTime || HourMinutes, 
            endTime: endTime, 
        });
    };


    return(



<MethodScrollView>
<MethodContainer>  
<LinearGradient colors={['#f7d7be','#e7a370']}>
<MethodTitle>
    Please choose a method<Ionicons name="checkmark" size={28} color="black" />
</MethodTitle>
<MethodCTouch onPress={() => selectMethod(12)}>
<MethodLeftContent>
<MethodCText>12H</MethodCText>
<MethodCTextS>fasting</MethodCTextS>
</MethodLeftContent>
<FontAwesome5 name="minus" size={24} color="#E46C0A" />
<MethodRightContent>
<MethodCText2>12H</MethodCText2>
<MethodCTextS2>relaxing</MethodCTextS2>
</MethodRightContent>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(14)}>
<MethodLeftContent>
<MethodCText>14H</MethodCText>
<MethodCTextS>fasting</MethodCTextS>
</MethodLeftContent>
<FontAwesome5 name="minus" size={24} color="#E46C0A" />
<MethodRightContent>
<MethodCText2>10H</MethodCText2>
<MethodCTextS2>relaxing</MethodCTextS2>
</MethodRightContent>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(16)}>
<MethodLeftContent>
<MethodCText>16H</MethodCText>
<MethodCTextS>fasting</MethodCTextS>
</MethodLeftContent>
<FontAwesome5 name="minus" size={24} color="#E46C0A" />
<MethodRightContent>
<MethodCText2>8H</MethodCText2>
<MethodCTextS2>relaxing</MethodCTextS2>
</MethodRightContent>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(18)}>
<MethodLeftContent>
<MethodCText>18H</MethodCText>
<MethodCTextS>fasting</MethodCTextS>
</MethodLeftContent>
<FontAwesome5 name="minus" size={24} color="#E46C0A" />
<MethodRightContent>
<MethodCText2>6H</MethodCText2>
<MethodCTextS2>relaxing</MethodCTextS2>
</MethodRightContent>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(20)}>
<MethodLeftContent>
<MethodCText>20H</MethodCText>
<MethodCTextS>fasting</MethodCTextS>
</MethodLeftContent>
<FontAwesome5 name="minus" size={24} color="#E46C0A" />
<MethodRightContent>
<MethodCText2>4H</MethodCText2>
<MethodCTextS2>relaxing</MethodCTextS2>
</MethodRightContent>
</MethodCTouch>
<MethodCEndTouch onPress={() => selectMethod(24)}>
    <MethodCText>24H</MethodCText>
    <MethodCTextS>fasting</MethodCTextS>
</MethodCEndTouch>
</LinearGradient>
</MethodContainer>
</MethodScrollView>
);
};


const FastPlan = ({ navigation }) => {
    const[seletedDate, setSelectedDate] = useState('');
    const[selectedTime,setSelectedTime] = useState('');

    
    const selectsecond = (seletedValue) => {

        const stringFormat = `${seletedValue} - ${24 - seletedValue}`;

            navigation.navigate("ConfirmFastPlan",{
                seletedValue: {
                    number: seletedValue,
                    string: stringFormat,
                },
                seletedDate: seletedDate || currnetDate,
                selectedTime: selectedTime || currentTime,
                totalDateTime : totalDateTime,
                currnetDateTime : currnetDateTime,
            });
    };
const route = useRoute();
const selectMethod = route.params.seletedValue;
const currnetDate = route.params.seletedDate;
const currentTime = route.params.selectedTime;
const currnetDateTime = route.params.endTime;

const [selectYear,selectMonth,selectDay] = seletedDate.split('/');
const [selectHour,selectMinute] = selectedTime.split(':');

// const year = parseInt(selectYear);
// const month = parseInt(selectMonth) - 1;
// const day = parseInt(selectDay);
// const hour = parseInt(selectHour);
// const minute = parseInt(selectMinute);

// const jsDate = new Date(year, month, day, hour, minute);
// console.log(jsDate)

let totalHour = parseInt(selectMethod.number) + parseInt(selectHour) || '';
let totalHourParse = parseInt(totalHour);
let plusSelectDay = parseInt(selectDay);

if(totalHourParse > 23) {
    totalHourParse -=24;
    plusSelectDay += 1;
}

let totalDateTime;
if(!selectHour == '') {
    totalDateTime = `${selectYear}`+'/' +`${selectMonth}`+'/'+ `${MonthNumber(plusSelectDay)}`+':' + `${MonthNumber(totalHourParse)}`+':'+ `${selectMinute}`;
}else{
    totalDateTime = null;
}
// const currentEndTime = currnetDateTime.substring(13);
const currentEndTime = currnetDateTime.split(' : ')[1]; // " : "로 분리하고 두 번째 요소 추출

return(
<PlanContainer>
<LinearGradient colors={['#f7d7be','#e7a370']}>
<PlanTitle>{"\n"}
</PlanTitle>
<PlanMethodText>
    Fasting Method
</PlanMethodText>
<PlanMethodCView>
<PlanMethodC> {selectMethod.string}  </PlanMethodC>
</PlanMethodCView>
<PlanMethodText>
    Starting Date
</PlanMethodText>
<PlanMethodCView>
    <FastDate onDateChange={(newDate => setSelectedDate(newDate))}/>
</PlanMethodCView>
<PlanMethodText>
    Starting Time
</PlanMethodText>
<PlanMethodCView>
 <FastTime style={styles.FastTime} onTimeChange={(newTime => setSelectedTime(newTime))}/>
</PlanMethodCView>
<PlanEndView>
 <PlanEndText>
    It ends at  {"\n"}
    {totalDateTime || currnetDateTime}
</PlanEndText>
</PlanEndView>
<PlanConfirmV>
<PlanConfirmB onPress={() => selectsecond(selectMethod.number)}>
    <PlanConfirmT>Next</PlanConfirmT>
</PlanConfirmB>
</PlanConfirmV>
</LinearGradient>
</PlanContainer>
);
};

const FastConfirm = ({ navigation }) => {
    const selectTimer = (seletedValue) => {
        const stringFormat = `${seletedValue} - ${24 - seletedValue}`;  
            navigation.navigate("MyTimer", {
                seletedValue: {
                    number: seletedValue,
                    string: stringFormat,
                },
                ConfirmStartTime : ConfirmStartTime,
                ConfirmEndTime : ConfirmEndTime,
            });
    };
const route = useRoute();
const confirmTime = route.params.seletedValue;
const ConfirmDate = route.params.seletedDate;
const ConfirmTime2 = route.params.selectedTime;
const totalDateTime = route.params.totalDateTime;
const currnetDateTime = route.params.currnetDateTime;

// console.log('시작시간 시간 : ' + totalSTime)
// console.log('끝나는 시간 :' + totalDateTime);


const [currentFastDate,currentFastTime] =currnetDateTime.split(':');
const currentEndTime = currnetDateTime.substring(13);

const [totalDate,totalTime] = totalDateTime.split(':');
const totalTime2 = totalDateTime.substring(11);

const stringFormat = `${confirmTime.number}H`;
const stringFormat2 =`${24 - confirmTime.number}H`

const dateStr = ConfirmDate;
const timeStr = ConfirmTime2;

const currentDateStr = totalDate;
const currentTimeStr = totalTime2;

const currentDateEnd = currentFastDate;
const currentTimeEnd = currentEndTime;

const [year, month, day] = dateStr.split('/').map(str => parseInt(str, 10));
const [hours, minutes] = timeStr.split(':').map(str => parseInt(str, 10));

const [year2, month2, day2] = currentDateStr.split('/').map(str => parseInt(str, 10));
const [hours2, minutes2] = currentTimeStr.split(':').map(str => parseInt(str, 10));

const [year3, month3, day3] = currentDateEnd.split('/').map(str => parseInt(str, 10));
const [hours3, minutes3] = currentTimeEnd.split(':').map(str => parseInt(str, 10));

const date = new Date(year, month - 1, day, hours, minutes);
const date2 = new Date(year2, month2 - 1, day2, hours2, minutes2);
const date3 = new Date(year3, month3 - 1, day3, hours3, minutes3);

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  // 시작 날짜 (현재 or 셀렉)
  const ConfirmStartTime = formatter.format(date).replace('at', '').replace(',', ', ');
  // 종료 시간 (현재 or 셀렉)
  const ConfirmEndTime = formatter.format(date2).replace('at', '').replace(',', ', ');
  // 현재 날짜 (현재 종료)
  const ConfirmTimeEnd = formatter.format(date3).replace('at', '').replace(',', ', ');
  
return(

<ConfirmScroll>
<ConfirmContainer>
<LinearGradient colors={['#f7d7be','#e7a370']}>
    <ConfirmHeader>
    <ConfirmTime>{stringFormat}</ConfirmTime>
    <ConfirmTimeText>fasting </ConfirmTimeText>
    <ConfirmTextM><FontAwesome5 name="minus" size={15} color="#E46C0A" /></ConfirmTextM>
    <ConfirmTime> {stringFormat2}</ConfirmTime>
    <ConfirmTimeText>relaxing</ConfirmTimeText>
    </ConfirmHeader>
    <ConfirmTView>
    <ConfirmStart>
        <ConfrimSText>
        Start : {ConfirmStartTime}
        </ConfrimSText>
    </ConfirmStart>
    <ConfirmEnd>
        <ConfirmEText>
        End : {ConfirmEndTime||ConfirmTimeEnd}
        </ConfirmEText>
    </ConfirmEnd>
</ConfirmTView>
    <ConfirmMView>
    <ConfirmMessage>Are you sure about this plan?</ConfirmMessage>
    </ConfirmMView>
    <ConfirmBtn onPress={() => selectTimer(confirmTime.number) }>
    <ConfirmText>Confirm</ConfirmText>
    </ConfirmBtn>
    </LinearGradient>
</ConfirmContainer>
</ConfirmScroll>
);
}


function formatNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { hours, minutes, seconds: remainingSeconds };
}

function MyTimer({ navigation: {navigate} }) {

    const { debuggerHost } = Constants.manifest2.extra.expoGo;
    const uri = `http://${debuggerHost.split(":").shift()}:8080/api/fast`;

    const route = useRoute();
    const ConfirmStartTime = route.params.ConfirmStartTime;
    const ConfirmEndTime = route.params.ConfirmEndTime;
    const timerTime = route.params?.seletedValue;
    const timerMethod = route.params.seletedValue.number;
    const timerMethod2 = route.params.seletedValue.string;
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState();

    const [fastDateSend,setFastDateSend] = useState(false);

    const handleStopTimer = () => {
        Alert.alert(
            'Stop Timer',
            'Are you sure?',
            [
                {
                    text: 'cancel',
                    style: 'cancel',
                },
                {
                    text: 'Stop',
                    onPress: () => {
                        setIsPlaying(false); // 타이머 멈추기
                        setElapsedTime(totalSeconds - remainingTime); // 사용된 시간 계산 및 저장

                        const dataToSend = {
                            ConfirmStartTime : ConfirmStartTime,
                            ConfirmEndTime : ConfirmEndTime,
                            timerMethod : timerMethod,
                        };

                        axios
                            .post(`${uri}`,dataToSend)
                            .then(response => {
                                setFastDateSend(true);
                            })
                            .catch(error => {
                                console.error('Error sending data:', error)
                            })
                    },
                },
            ],
            );
        };
        const totalSeconds = timerTime.number * 3600;
        console.log('시작 시간 :'+ConfirmStartTime);
        console.log('종료 시간 :'+ConfirmEndTime);
        console.log('단식 방법 : ' + timerMethod);
        console.log('단식 방법 초 : ' + totalSeconds);
        console.log('단식 방법 초 : ' + timerMethod2);
        console.log('남은 시간 : ' + remainingTime);
        console.log('사용 시간 : ' + elapsedTime);

        
        function formatToUTC(ConfirmStartTime) {
            const months = [
                "January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"
            ];
        
            const [monthStr, dayStr, yearStr, timeStr, ampm] = ConfirmStartTime.split(" ");
            const month = months.indexOf(monthStr);
            
            // Check if month is valid, otherwise set to 0
            const validMonth = month >= 0 ? month : 0;
            
            const day = parseInt(dayStr.replace(",", ""));
            const year = parseInt(yearStr);
            const [hourStr, minuteStr] = timeStr.split(":");
            const hour = parseInt(hourStr) + (ampm.toUpperCase() === "PM" ? 12 : 0);
            const minute = parseInt(minuteStr);
        
            // Check if all necessary parts are valid, otherwise return a default ISO string
            if (!isNaN(year) && !isNaN(validMonth) && !isNaN(day) && !isNaN(hour) && !isNaN(minute)) {
                const utcDate = new Date(Date.UTC(year, validMonth, day, hour, minute));
                return utcDate.toISOString();
            } else {
                return new Date().toISOString(); // Return default ISO string if invalid data
            }
        }
        
        const formattedUTC = formatToUTC(ConfirmStartTime);
        console.log('포맷 결과: ' + formattedUTC);
        
        
        


        //w : JS-> Oracle
        function formatOracleDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
        
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        const parsedStartTime = new Date(formattedUTC);
        const formattedStartTime = formatOracleDate(parsedStartTime);
        console.log('포맷팅 됨? : ' + formattedStartTime );
    return (
        <TimerScrollView>
            <LinearGradient colors={['#f7d7be','#e7a370']}>
        <TimerContainer>
            <TimerHomeBtn onPress={() => navigate("FastMainPage")}>
            <TimerHomeBT>Reset     <Entypo name="trash" size={24} color="black" /></TimerHomeBT> 
            </TimerHomeBtn>
            <TouchableOpacity activeOpacity={0} onPress={() => setIsPlaying(prev => !prev)}>
            <CountdownCircleTimer
    isPlaying={isPlaying}
    duration={totalSeconds}
    colors={["#F3A36F", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[totalSeconds, (totalSeconds * 0.7), (totalSeconds * 0.3), 0]}
    onComplete={() => ({ shouldRepeat: true, delay: 2 })}
    updateInterval={1}
    strokeWidth={30}
    size={300}
>
    {({ remainingTime, color }) => {
        const { hours, minutes, seconds } = secondsToHMS(remainingTime);
        setRemainingTime(remainingTime); // remainingTime 상태 업데이트
        return (
            <>
                <Text style={{ color:"#505050", fontSize: 18 }}>
                    Elapsed Time
                </Text>
                <Text style={{ color, fontSize: 40 }}>
                    {`${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`}
                </Text>
                {isPlaying && remainingTime === 0 && (
                    <EndTimeText style={{ fontSize: 20, textAlign: 'center' }}>
                        Time over!
                    </EndTimeText>
                )}
            </>
            );
    }}
</CountdownCircleTimer>

            </TouchableOpacity>
<TimerMView>
    <TimerStart>
        <TimerSText>
            Start : {ConfirmStartTime}
        </TimerSText>
    </TimerStart>
    <TimerEnd>
        <TimerEText>
        End  :  {ConfirmEndTime}
        </TimerEText>
    </TimerEnd>
    <TimerStop>
        <TimerEText onPress={handleStopTimer}>
        STOP
        </TimerEText>
    </TimerStop>
</TimerMView>
        </TimerContainer>
        </LinearGradient>
        </TimerScrollView>
    );
}




const NativeStack = createNativeStackNavigator();

const FastStack = () => (
<NativeStack.Navigator
    screenOptions={{
        headerShown: false,
        headerTintColor: "black",
        headerBackTitleVisible: false,
    }}>
    <NativeStack.Screen name="FastMainPage" component={FastMainPage} />
    <NativeStack.Screen name="FastingMethod" component={FastMethod} />
    <NativeStack.Screen name="ConfirmFastPlan" component={FastConfirm} />
    <NativeStack.Screen name="FastPlan" component={FastPlan} />
    <NativeStack.Screen name="MyTimer" component={MyTimer} />
    
</NativeStack.Navigator>
);

const styles = StyleSheet.create({
    checkBtnFast:{
        fontSize: 60,
        marginTop:150,
        marginLeft:160,
    },
    methodCheckBtn:{
        fontSize: 25,
        fontWeight:10,

    },
});
export default FastStack;