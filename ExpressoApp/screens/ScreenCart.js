import React from 'react';
import { ScrollView, Text, View } from "react-native";
import firebase from 'firebase';

const ScreenCart = ({navigation}) => {
  let total;
  return(
    <ScrollView>
      <Text>Cart</Text>
      <View></View>
      <View>
        <Text value={"Total: " + total}></Text>
      </View>
    </ScrollView>
  )
}


export default ScreenCart;
