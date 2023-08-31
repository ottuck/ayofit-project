import React from 'react';
import { FastHeader, FastHeaderT, FastTotalHeader } from './FastingStyled';


const FastHeaderCom = ({ navigation }) => {
    return (
        <FastTotalHeader>
            <FastHeader onPress={() => navigation.navigate("Timer")}>
                <FastHeaderT>Timer</FastHeaderT>
            </FastHeader>
            <FastHeader onPress={() => navigation.navigate("Records")}>
                <FastHeaderT>Record</FastHeaderT>
            </FastHeader>
        </FastTotalHeader>
    );
};

export default FastHeaderCom;
