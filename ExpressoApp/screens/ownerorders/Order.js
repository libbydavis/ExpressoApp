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

function Order({menuItems, transactionID}) {
  const menuItemList = [];

  if (menuItems > 0) {
    menuItems.forEach((menuItem) => {
      menuItemList.push(<Text>${menuItem.title} x ${menuItem.quantity}</Text>);
    });
  }

  return (
    <View style={styles.order}>
      <Text style={styles.title}>{transactionID}</Text>
      {menuItemList}
      <Text style={styles.time}>{}</Text>
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


