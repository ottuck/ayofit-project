import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View,Text } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import FastStack from '../../navigations/FastStack';



function FastMainPage() {

  return (
    <View style={styles.fasting}>
      <StatusBar style="auto" />
    <FastStack />
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
