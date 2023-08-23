import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import {FastRecordView,RecordTouch,PlanContainer,PlanTitle,PlanMethodText,PlanMethodCView,PlanMethodC
    ,PlanEndView,PlanEndText,PlanConfirmV,PlanConfirmB,PlanConfirmT} from '../components/fast/FastingStyled';

const FastRecord = ({navigation : { navigate } }) => (
    <LinearGradient colors={['#f7d7be','#e7a370']}>
        <FastRecordView>
            <RecordTouch onPress={() => navigate("FastRecordSet")}>
            <Text>FastRecord1</Text>
            </RecordTouch>
        </FastRecordView>
    </LinearGradient>
        );
        


const FastSetRecord = () => {
    return(
<PlanContainer>
<LinearGradient colors={['#f7d7be','#e7a370']}>
<PlanTitle>{"\n"}
</PlanTitle>
<PlanMethodText>
Starting Date
</PlanMethodText>
<PlanMethodCView>
</PlanMethodCView>
<PlanMethodText>
Starting Time
</PlanMethodText>
<PlanMethodCView>
</PlanMethodCView>
<PlanMethodText>
Fasting Duration
</PlanMethodText>
<PlanMethodCView>

</PlanMethodCView>
<PlanEndView>
 <PlanEndText>
    It ends at 
</PlanEndText>
</PlanEndView>
<PlanConfirmV>
<PlanConfirmB>
    <PlanConfirmT>Confirm</PlanConfirmT>
</PlanConfirmB>
</PlanConfirmV>
</LinearGradient>
</PlanContainer>
);
};


const RecordStack = createNativeStackNavigator();

const FastRecordPage = () => (
<RecordStack.Navigator
    screenOptions={{
        headerShown: false,
        headerTintColor: "black",
        headerBackTitleVisible: false,
    }}>
    <RecordStack.Screen name="FastRecordMain" component={FastRecord} />
    <RecordStack.Screen name="FastRecordSet" component={FastSetRecord} />
</RecordStack.Navigator>
);


export default FastRecordPage;