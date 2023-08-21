import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View,Text } from 'react-native';
import FastRoot from '../../navigations/FastRoot';



function FastMainPage() {

  return (
    <View style={styles.fasting}>
      <StatusBar style="auto" />
    <FastRoot />
    </View>
  );
}
export default FastMainPage;

const styles = StyleSheet.create({
  fasting: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
