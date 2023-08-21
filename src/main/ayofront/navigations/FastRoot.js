import { StatusBar } from 'expo-status-bar';
import React from 'react';
import FastStack from '../navigations/FastStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FastRecord from '../navigations/FastRecords';


const FastNav = createNativeStackNavigator();

const FastRoot = () => (
    <FastNav.Navigator 
    screenOptions={{
        headerShown : false,
    }}>
        <FastNav.Screen name="Timer" component={FastStack}/>
        <FastNav.Screen name="Records" component={FastRecord} />
    </FastNav.Navigator>

)
export default FastRoot;