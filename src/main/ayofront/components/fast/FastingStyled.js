import styled from "styled-components/native"

//-------------------MainPage-----------------------------//
export const MainBtn = styled.TouchableOpacity`
 border-radius : 20px;
 width : 200px;
 height : 60px;
 align-items: center;
 justify-content: center;

`;
export const MainText = styled.Text`
 color : black;
 opacity : 0.9;
 font-size : 20px;
 font-weight : 600
`;
export const FirstMainPage = styled.View`
width : 100%;
height : 100%;
align-items: center;
justify-content: center;

`;
//---------------------------------------------------------------//
export const FastBGImgView = styled.View`
width: 100%;
height: 100%;
`;
export const FastBGImg = styled.ImageBackground`
width: 100%;
height: 750px;
z-index : -1;
`;
//---------------------FastMethod(Stack.js)----------------------//
export const MethodScrollView = styled.ScrollView`
width:100%;
height:100%;
background-color: #FFE9D8;
`;
export const MethodContainer = styled.View`
width:100%;
height:850px;
background-color: #FFE9D8;
`;
export const MethodTitle = styled.Text`
font-size: 20px;
align-self: center;
color: black;
bottom: 50px;
margin-top: 100px;
`;
export const MethodCTouch = styled.TouchableOpacity`
border-radius : 20px;
background-color: #FFFFFF80;
height: 70px;
width: 88%;
margin-top : 50px;
margin-left : 20px;
margin-right : 20px;
align-items: center;
justify-content: center;
bottom: 50px;
`;
export const MethodCText = styled.Text`
font-size: 30px;
font-weight: 600;
color: #E46C0A;
white-space : pre;
`;
export const MethodCTextS = styled.Text`
font-size: 15px;
font-weight: 400;
color: black;
white-space : pre;
`;
export const MethodCEndTouch = styled.TouchableOpacity`
border-radius : 20px;
background-color: #FFFFFF80;
height: 70px;
width: 88%;
margin-top : 50px;
margin-left : 20px;
margin-right : 20px;
margin-bottom : 30px;
align-items: center;
justify-content: center;
bottom: 50px;
`;
//---------------FastPlan(Stack.js)---------------//
export const PlanContainer = styled.ScrollView`
flex:1;
background-color: #FFE9D8;
width: 100%;
`;
export const PlanTitle = styled.Text`
font-size: 17px;
margin-top : 100px;
margin-left : 35px;
line-height : 25px;
color: black;
background-color: #FFE9D8;
`;
export const PlanMethodText = styled.Text`
font-size: 18px;
font-weight : 500;
margin-top : 50px;
margin-left : 35px;
line-height : 25px;
background-color: #FFE9D8;
`;
export const PlanMethodCView = styled.TouchableOpacity`
align-items: center;
justify-content: center;
border: 1px solid #000000;
border-radius : 20px;
background-color: #FFFFFF80;
height: 45px;
width: 80%;
margin-top : 10px;
margin-left : 40px;
margin-right : 20px;

`;
export const PlanMethodC = styled.Text`
font-size: 20px;
color: #505050;
`;

export const PlanEndView = styled.View`
align-items: center;
justify-content: center;
margin-top : 50px;
width : 100%;
height : 50px;
`;
export const PlanEndText = styled.Text`
font-size : 17px;
white-space : pre;
`;
export const PlanConfirmV = styled.View`
height: 150px;
background-color: #FFE9D8;
`;
export const PlanConfirmB = styled.TouchableOpacity`
background-color: #E46C0A;
border-radius : 20px;
width : 85%;
height : 50px;
align-items: center;
justify-content: center;
margin-top : 50px;
margin-left : 30px;
`;
export const PlanConfirmT = styled.Text`
font-size: 20px;
font-weight : 600;
color : white;
`;
//--------------------Confirm(Stack.js)----------------------//
export const ConfirmScroll = styled.ScrollView`
flex: 1;
`;
export const ConfirmContainer = styled.View`
background-color: #FFE9D8;
height : 600px;
`;

export const ConfirmTime = styled.Text`
align-self: center;
font-size: 35px;
color : #E46C0A;
margin-top : 20px;
margin-right : 10px;
`;
export const ConfirmTimeText = styled.Text`
align-self: center;
font-size: 15px;
color : black;
margin-top : 20px;
margin-right : 10px;
`;
export const ConfirmTextM = styled.Text`
align-self: center;
font-size: 15px;
color : black;
margin-top : 20px;
margin-right : 10px;
padding : 5px;
`;
export const ConfirmHeader = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`;
export const ConfirmBtn = styled.TouchableOpacity`
border: 1px solid #808e9b;
border-radius : 20px;
background-color: #E46C0A;
height: 50px;
width: 85%;
position : absolute;
bottom : 30px;
margin-left : 30px;
margin-right : 20px;
align-items: center;
justify-content: center;
`;
export const ConfirmText = styled.Text`
font-size: 20px;
font-weight : 600;
color : white;
`;
export const ConfirmMessage = styled.Text`
font-size: 20px;
font-weight : 500;
color : #000000;
`;
export const ConfirmMView = styled.View`
justify-content : center;
align-items: center;
bottom : -100px;
`;
export const ConfirmTView = styled.View`
align-items: center;
justify-content: center;
`;
export const ConfirmStart = styled.View`
margin-top : 30px;
width: 85%;
height: 50px;
background-color : #E46C0A33;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const ConfrimSText = styled.Text`
font-size: 18px;
font-weight : 500;
`;
export const ConfirmEnd = styled.View`
margin-top : 30px;
width: 85%;
height: 50px;
background-color : #E46C0A33;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const ConfirmEText = styled.Text`
font-size: 18px;
font-weight : 500;
white-space : pre;
`;
//--------------------Timer(Stack.js)----------------------//

export const TimerContainer = styled.View`
flex:1;
align-items: center;
justify-content: center;
background-color: #FFE9D8;
`;
export const TimerTitle = styled.Text`
font-size : 20px;
margin-bottom : 20px;
`;
export const TimerHomeBtn = styled.TouchableOpacity`
background-color: #E46C0A33;
border-radius : 50px;
align-items: center;
justify-content: center;
border : 1px solid #FFE9D8;
height : 70px;
width : 35%;
right : -120px;
margin-bottom : 30px;
`;
export const TimerHomeBT = styled.Text`
font-size : 20px;
color : black;
white-space : pre;
`;
export const EndTimeText = styled.Text`
font-size: 20;
text-align: center;
`;
export const TimerMView = styled.View`
justify-content : center;
align-items: center;

`;
export const TimerStart = styled.View`
margin-top : 40px;
width: 330px;
height: 50px;
background-color : #E46C0A33;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const TimerSText = styled.Text`
font-size: 18px;
font-weight : 500;
`;
export const TimerEnd = styled.View`
margin-top : 20px;
width: 330px;
height: 50px;
background-color : #E46C0A33;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const TimerEText = styled.Text`
font-size: 18px;
font-weight : 500;
white-space : pre;
`;
//---------------------FastDate.js---------------------//
export const FastDateContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;
export const CustomDatePicker = styled.TouchableOpacity`
align-items: center;
justify-content: center;
border-radius : 30px;
width: 330px;
height: 80px;
`;
export const StartDate = styled.Text`
font-size: 20px;
color: #505050;
white-space: pre;
`;
export const ModalContent = styled.View`
background-color: white;
padding: 20px;
border-radius: 10px;
justify-content: center;
align-items: center;
`;
//-------------------------FastTime-------------------------//
export const FastTimeContainer= styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;
export const CustomTimePicker = styled.TouchableOpacity`
align-items: center;
justify-content: center;
border-radius: 30px;
width: 330px;
height: 80px;
`;
export const StartTime = styled.Text`
font-size: 20px;
color: #505050;
`;
export const ModalContent2 = styled.View`
background-color: white;
padding: 20px;
border-radius: 10px;
justify-content: center;
align-items: center;
`;

