import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {nextTick} from 'yarn/lib/cli';

// eslint-disable-next-line react/prop-types
function Order({props}, {key}) {
  const menuItemList = [];
  const menuItems = props.menuItems;
  const transactionID = props.transactionID;
  const orderTime = props.orderTime;

  menuItems.forEach((menuItem) => {
    if (menuItem.title != 'business') {
      menuItemList.push(
          <Text>
            {menuItem.title} x {menuItem.quantity}
          </Text>,
      );
    }
  });


  return (
    <View key={key} style={styles.order}>
      <Text style={styles.title}>{transactionID}</Text>
      {menuItemList}
      <Text style={styles.time}>{orderTime}</Text>
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
    flexGrow: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    color: 'red',
  },
});


