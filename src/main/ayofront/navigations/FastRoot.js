import React from 'react';
import FastStack from '../navigations/FastStack';
import { TouchableOpacity,Text,View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FastRecord from '../navigations/FastRecords';
import {HeaderView,HeaderTouch,HeaderText} from '../components/fast/FastingStyled';



const FastNav = createNativeStackNavigator();

const FastRoot = () => (
    <FastNav.Navigator          
    screenOptions={{
        header: ({ navigation : { navigate } }) => (
            <HeaderView>
                <HeaderTouch onPress={() => navigate('Timer')}>
                    <HeaderText>Timer</HeaderText>
                </HeaderTouch>
                <HeaderTouch onPress={() => navigate('Records')}>
                    <HeaderText>Records</HeaderText>
                </HeaderTouch>
            </HeaderView>
        ),
    }}
>
        <FastNav.Screen name="Timer" component={FastStack}
        />
        <FastNav.Screen name="Records" component={FastRecord}/>
    </FastNav.Navigator>

)
export default FastRoot;