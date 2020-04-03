import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  BackHandler, //返回键
  ToastAndroid //提示框
} from 'react-native';

import Demo01 from './tsdemos/Demo01';
import Desc from './tsdemos/Desc';

// console.disableYellowBox=true;
const App= () => {
  return <View>
      <Demo01 />
      <Desc/>
  </View>
};

const styles = StyleSheet.create({
});

export default App;
