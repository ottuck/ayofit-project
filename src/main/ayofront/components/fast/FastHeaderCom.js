import React from 'react';
import { FastHeader, FastHeaderT, FastTotalHeader,FastHeaderR } from './FastingStyled';


const FastHeaderCom = ({ navigation }) => {
    return (
        <FastTotalHeader>
            <FastHeader onPress={() => navigation.navigate("Timer")}>
                <FastHeaderT>Timer</FastHeaderT>
            </FastHeader>
            <FastHeaderR onPress={() => navigation.navigate("Records")}>
                <FastHeaderT>Record</FastHeaderT>
            </FastHeaderR>
        </FastTotalHeader>
    );
};

export default FastHeaderCom;
