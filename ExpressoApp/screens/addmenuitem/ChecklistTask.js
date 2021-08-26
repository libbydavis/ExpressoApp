import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const CheckListTask = (props) => {
  return (
    <View style={styles.checklistTask}>
      <Text style={styles.checklistText}>{props.text}</Text>
      <Text>X</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checklistTask: {
    backgroundColor: '#c9c9c9',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  checklistText: {
    color: '#383838',
    marginRight: 170,
  },
});

export default CheckListTask;
