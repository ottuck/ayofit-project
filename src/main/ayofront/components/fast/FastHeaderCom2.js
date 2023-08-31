import React from 'react';
import { FastHeader2, FastHeaderT2, FastTotalHeader2 } from './FastingStyled';
import { AntDesign } from '@expo/vector-icons';

const FastHeaderCom2 = ({ navigation }) => {
    return (
        <FastTotalHeader2>
            <AntDesign
            name="left"
            size={30}
            color="white"
            style={{marginTop : 20, marginLeft:20 }} />
            <FastHeader2 onPress={() => navigation.navigate("Timer")}>
                <FastHeaderT2>Timer</FastHeaderT2>
            </FastHeader2>
            <FastHeader2 onPress={() => navigation.navigate("Records")}>
                <FastHeaderT2>Record</FastHeaderT2>
            </FastHeader2>
        </FastTotalHeader2>
    );
};

export default FastHeaderCom2;
