import React from 'react';
import { FastHeader2, FastHeaderT2, FastTotalHeader2,BackBtnTouch,FastHeader2R } from './FastingStyled';
import { AntDesign } from '@expo/vector-icons';

const FastHeaderCom2 = ({ navigation }) => {
    return (
        <FastTotalHeader2>
            <BackBtnTouch onPress={() => navigation.goBack()}>
            <AntDesign
            name="left"
            size={30}
            color="white"
            style={{marginTop : 55}} />
            </BackBtnTouch>
            <FastHeader2 onPress={() => navigation.navigate("Timer")}>
                <FastHeaderT2>Timer</FastHeaderT2>
            </FastHeader2>
            <FastHeader2R onPress={() => navigation.navigate("Records")}>
                <FastHeaderT2>Record</FastHeaderT2>
            </FastHeader2R>
        </FastTotalHeader2>
    );
};

export default FastHeaderCom2;
