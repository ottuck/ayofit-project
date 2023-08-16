import React, { useState,} from "react";
import { StyleSheet, TouchableOpacity,Text,Image } from 'react-native';
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
    ,ConfirmEText,ConfirmTView,TimerStart,TimerSText,TimerEnd,TimerEText,TimerMView,FirstMainPage,MainBtn,MainText,FastMainImage,FastHeaderImg,FastOverlay
} from '../components/fast/FastingStyled';
import FastHeader1 from '../images/FastImage/FastHeader1.png'
import FastHeader2 from '../images/FastImage/FastHeader2.png'

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

//----------------------오버레이 이미지------------------------------------//
const OverlayedImage = () => (
    <FastMainImage>
      <FastHeaderImg source={FastHeader1} />
      <FastOverlay source={FastHeader2} />
    </FastMainImage>
  );

//---------------------StackPage-----------------------------------------//
const FastMainPage = ({navigation : { navigate } }) => (
    <FirstMainPage>
        <OverlayedImage />
       <MainBtn onPress={() => navigate("FastingMethod")}>
            <MainText>+ Set up your plan</MainText>
        </MainBtn>
    </FirstMainPage>
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
<MethodContainer>
<MethodTitle>
<OverlayedImage />
    Please choose a method<Ionicons name="checkmark" size={28} color="black" />
</MethodTitle>
<MethodCTouch onPress={() => selectMethod(12)}>
    <MethodCText>12H        <FontAwesome5 name="minus" size={24} color="#E46C0A" />       12H</MethodCText>
    <MethodCTextS> fasting                                       relaxing</MethodCTextS>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(14)}>
<MethodCText>14H        <FontAwesome5 name="minus" size={24} color="#E46C0A" />       10H</MethodCText>
    <MethodCTextS> fasting                                       relaxing</MethodCTextS>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(16)}>
<MethodCText>16H        <FontAwesome5 name="minus" size={24} color="#E46C0A" />         8H</MethodCText>
    <MethodCTextS> fasting                                       relaxing</MethodCTextS>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(18)}>
<MethodCText>18H        <FontAwesome5 name="minus" size={24} color="#E46C0A" />         6H</MethodCText>
    <MethodCTextS> fasting                                       relaxing</MethodCTextS>
</MethodCTouch>
<MethodCTouch onPress={() => selectMethod(20)}>
<MethodCText>20H        <FontAwesome5 name="minus" size={24} color="#E46C0A" />         4H</MethodCText>
    <MethodCTextS> fasting                                       relaxing</MethodCTextS>
</MethodCTouch>
<MethodCEndTouch onPress={() => selectMethod(24)}>
    <MethodCText>24H</MethodCText>
    <MethodCTextS>fasting</MethodCTextS>
</MethodCEndTouch>
</MethodContainer>
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
            });
    };
const route = useRoute();
const selectMethod = route.params.seletedValue;

return(
<PlanContainer>
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
{route.params.endTime}
</PlanEndText>
</PlanEndView>
<PlanConfirmV>
<PlanConfirmB onPress={() => selectsecond(selectMethod.number)}>
    <PlanConfirmT>Next</PlanConfirmT>
</PlanConfirmB>
</PlanConfirmV>
</PlanContainer>
);
};

const FastConfirm = ({ navigation }) => {
    const selectTimer = (seletedValue) => {
        const stringFormat = `${seletedValue} - ${24 - seletedValue}`;  
            navigation.navigate("Timer", {
                seletedValue: {
                    number: seletedValue,
                    string: stringFormat,
                }},
            );
    };
const route = useRoute();
const confirmTime = route.params.seletedValue;
return(

<ConfirmScroll>
<ConfirmContainer>
    <ConfirmTitle>
    </ConfirmTitle>
    <ConfirmTime> {confirmTime.string} </ConfirmTime>
    <ConfirmTView>
    <ConfirmStart>
        <ConfrimSText>
        Start :   August 10, 2023 AM 10:00
        </ConfrimSText>
    </ConfirmStart>
    <ConfirmEnd>
        <ConfirmEText>
        End :     August 10, 2023 AM 10:00
        </ConfirmEText>
    </ConfirmEnd>
</ConfirmTView>
    <ConfirmMView>
    <ConfirmMessage>Are you sure about this plan?</ConfirmMessage>
    </ConfirmMView>
    <ConfirmBtn onPress={() => selectTimer(confirmTime.number) }>
    <ConfirmText>Confirm</ConfirmText>
    </ConfirmBtn>
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

function MyTimer({ route, navigation: {navigate} }) {
    
    const timerTime = route.params?.seletedValue;
    const [isPlaying, setIsPlaying] = React.useState(true);
    const totalSeconds = timerTime.number * 3600;

    return (
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
                        return (
                            <>
                             <Text style={{ color:"#505050", fontSize: 18 }}>
                               Elpased Time
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
            Start : August 10, 2023 AM 10:00
        </TimerSText>
    </TimerStart>
    <TimerEnd>
        <TimerEText>
        End  :  August 10, 2023 AM 10:00
        </TimerEText>
    </TimerEnd>
</TimerMView>
        </TimerContainer>
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
    <NativeStack.Screen name="Timer" component={MyTimer} />
    
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