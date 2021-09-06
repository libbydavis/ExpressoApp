import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

function Order({props: props}) {
  const itemList = [];

  if (props.items > 0) {
    for (const item in props.items) {
      itemList.push(<Text>{item.title} x {item.quantity}</Text>);
    }
  }

  return (
    <View style={styles.order}>
      <Text style={styles.title}>{props.title}</Text>
      {itemList}
      <Text style={styles.time}>{props.time}</Text>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  order: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    color: 'red',
  },
});


