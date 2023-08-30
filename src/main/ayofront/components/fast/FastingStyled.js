import styled from "styled-components/native"

//-------------------MainPage-----------------------------//
export const MainBtn = styled.TouchableOpacity`
 border-radius : 20px;
 width : 200px;
 height : 60px;
 align-items: center;
 justify-content: center;
 margin-bottom: 60px;
`;
export const MainText = styled.Text`
 color : black;
 text-shadow: 2px 3px 5px #f8d5bc;
 opacity: 0.8;
 font-size : 22px;
 font-weight : 400
`;
export const FirstMainPage = styled.View`
flex:1;
align-items: center;
justify-content: center;
`;
export const MainHeaderBtn = styled.TouchableOpacity`

`;

//---------------------FastMethod(Stack.js)----------------------//
export const MethodScrollView = styled.ScrollView`
width: 100%;
`;
export const MethodContainer = styled.View`
flex:1;
`;
export const MethodTitle = styled.Text`
font-size: 20px;
align-self: center;
color: white;
bottom: 50px;
margin-top: 70px;
font-weight: 600;
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
position: relative;
`;
export const MethodLeftContent = styled.View`
width: 40%;
position: absolute;
left : 30px;

`;
export const MethodCText = styled.Text`
font-size: 30px;
font-weight: 600;
color: #E46C0A;

`;
export const MethodCTextS = styled.Text`
font-size: 15px;
padding-left:3px;
font-weight: 400;
color: black;
`;
export const MethodCText2 = styled.Text`
font-size: 30px;
font-weight: 600;
color: #E46C0A;
text-align:right;
`;
export const MethodCTextS2 = styled.Text`
font-size: 15px;
font-weight: 400;
color: black;
text-align:right;
`;
export const MethodRightContent = styled.View`
width: 40%;
position: absolute;
right : 30px;

`;
export const MethodCEndTouch = styled.TouchableOpacity`
border-radius : 20px;
background-color: #FFFFFF80;
height: 65px;
width: 88%;
margin-top : 50px;
margin-left : 20px;
margin-right : 20px;
margin-bottom : 30px;
align-items: center;
justify-content: center;
bottom: 60px;
`;
//---------------FastPlan(Stack.js)---------------//
export const PlanContainer = styled.ScrollView`
width: 100%;
height: 700px;
bottom:-30px;
`;
export const PlanTitle = styled.Text`
font-size: 17px;
margin-left : 35px;
line-height : 25px;
color: black;
`;
export const PlanMethodText = styled.Text`
font-size: 18px;
font-weight : 500;
margin-top : 30px;
margin-left : 35px;
line-height : 25px;
color: white;
`;
export const PlanMethodTText = styled.Text`
font-size: 18px;
font-weight : 500;
margin-top : 30px;
margin-left : 35px;
line-height : 25px;

`;
export const PlanMethodCTouch = styled.TouchableOpacity`
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
flex-direction : row;
`;
export const PlanMethodCView = styled.View`
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
flex-direction : row;
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
height : 100px;

`;
export const PlanEndText = styled.Text`
font-size : 20px;
line-height : 28px;
`;
export const PlanConfirmV = styled.View`
height: 130px;
`;
export const PlanConfirmB = styled.TouchableOpacity`
background-color: #E46C0A;
border-radius : 20px;
width : 85%;
height : 50px;
align-items: center;
justify-content: center;
margin-top : 25px;
margin-left : 30px;
`;
export const PlanConfirmT = styled.Text`
font-size: 20px;
font-weight : 600;
color : white;
`;
//--------------------Confirm(Stack.js)----------------------//
export const ConfirmScroll = styled.ScrollView`
width:100%;
height:100%;
bottom: -25px;
`;
export const ConfirmContainer = styled.View`
height: 650px;
position : relative;
`;

export const ConfirmTime = styled.Text`
align-self: center;
font-size: 35px;
color : white;
top: 50px;
margin-right : 10px;
`;
export const ConfirmTimeText = styled.Text`
align-self: center;
font-size: 15px;
color : white;
top: 50px;
margin-right : 10px;
`;
export const ConfirmTextM = styled.Text`
align-self: center;
font-size: 15px;
color : black;
top: 50px;
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
bottom : 100px;
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
top:-270px;
`;
export const ConfirmTView = styled.View`
align-items: center;
justify-content: center;
height: 100%;
`;
export const ConfirmStart = styled.View`
top: -130px;
width: 85%;
height: 50px;
background-color : #fce1cd;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const ConfrimSText = styled.Text`
font-size: 18px;
font-weight : 500;
`;
export const ConfirmEnd = styled.View`
top: -130px;
margin-top : 30px;
width: 85%;
height: 50px;
background-color : #fce1cd;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
export const ConfirmEText = styled.Text`
font-size: 18px;
font-weight : 500;
`;
//--------------------Timer(Stack.js)----------------------//
export const TimerContainer = styled.View`
align-items: center;
justify-content: center;
height: 850px;
bottom:-30px;
`;
export const TimerAddView = styled.View`
bottom: 50px;
`;
export const TimerTitle = styled.Text`
font-size : 20px;
margin-bottom : 20px;
`;
export const TimerHomeBtn = styled.TouchableOpacity`
background-color: #E46C0A;
border-radius : 50px;
align-items: center;
justify-content: center;
border : 1px solid #FFE9D8;
height : 50px;
width : 100px;
right : -120px;
margin-bottom : 30px;
bottom: 40px;
border: 5px solid #160c02;
`;
export const TimerHomeBT = styled.Text`
font-size : 20px;
color : white;
`;
export const EndTimeText = styled.Text`
font-size: 20;
text-align: center;
`;
export const TimerMView = styled.View`
justify-content : center;
align-items: center;
bottom: 50px;
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
`;
export const TimerStopText = styled.Text`
font-size: 18px;
font-weight : 500;
color: white;
`;
export const TimerStop = styled.TouchableOpacity`
margin-top : 40px;
width: 100px;
height: 50px;
background-color : #E46C0A;
border-radius: 20px;
align-items: center;
justify-content: center;
`;
//---------------------FastDate.js---------------------//
export const FastDateContainer = styled.View`
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
margin-top: 15px;
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
margin-top: 15px;
`;
export const ModalContent2 = styled.View`
background-color: white;
padding: 20px;
border-radius: 10px;
justify-content: center;
align-items: center;
`;
//-----------------------FastRoot-----------------------//
export const HeaderView = styled.View`
height: 70px;
flex-direction: row; /* 가로로 정렬 */
`;
export const HeaderTouch = styled.TouchableOpacity`

`;
export const HeaderText = styled.Text`
font-size : 20px;
color:white;
margin-top : 30px;
margin-left : 10px;
`;
//----------------------RecordPage-------------------//
export const RecordScrollView = styled.ScrollView`
width: 100%;
height: 100%;
`;
export const FastRecordView = styled.View`
flex:1;
padding-top: 100px;
padding-bottom: 100px;
`;
export const RecordUpC = styled.View`
justify-content: center;
align-items: center;
bottom: 70px;
`;
export const RecordUnderC = styled.View`
align-items : center;
`;
export const RecordOneView = styled.View`
  border: 3px solid white;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  height: 10%;
  width: 90%;
  bottom: 30px;
`;
export const RecordUseTime = styled.Text`
margin-top : 10px;
margin-left : 10px;
font-size : 18px;
`;
export const RecordSTime = styled.Text`
margin-top : 17px;
margin-left : 10px;
`;
export const RecordETime = styled.Text`
margin-top : 10px;
margin-left : 10px;
`;
export const RecordRTime = styled.Text`
font-size: 20px;
font-weight: 600;
top:-50px;
`;
//--------------------HeaderCom-------------------//
export const FastTotalHeader = styled.View`
width: 100%;
display: flex;
flex-direction: row; /* 가로로 정렬 */
align-items: flex-start; /* 왼쪽에 붙이는 정렬 */
`;
export const FastHeader = styled.TouchableOpacity`
margin-top:55px;
margin-left:20px;
`;
export const FastHeaderT = styled.Text`
font-size: 25px;
color: white;
`;