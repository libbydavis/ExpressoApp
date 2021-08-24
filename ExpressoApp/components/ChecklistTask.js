import React, {Component} from "react";
import {TextInput, TouchableOpacity, View, StyleSheet, Text } from "react-native";

const CheckListTask = (props) => {
  return(
    <View style={styles.checklistTask}>
      <Text style={styles.checklistText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checklistTask: {
    backgroundColor: '#c9c9c9',
    padding: 10,
    margin: 8,
    borderRadius: 10,
    flexDirection: "row",
  },
  checklistText: {
    color: '#383838',
  },
})

export default CheckListTask;
