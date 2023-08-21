import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const FastRecord = () => (

        <View>
            <Text>FastRecord1</Text>
        </View>

        );
        
const FastSetRecord = () => (

        <View>
            <Text>FastRecord1</Text>
        </View>
                );


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