import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {nextTick} from 'yarn/lib/cli';

// eslint-disable-next-line react/prop-types
function Order({props}, {key}) {
  const menuItemList = [];
  const menuItems = props.menuItems;
  const transactionID = props.transactionID;
  const orderTime = props.orderTime;

  menuItems.forEach((menuItem, index) => {
    if (menuItem.title != 'business') {
      menuItemList.push(
          <Text key={index} style={styles.list}>
            {menuItem.title} x {menuItem.quantity}
          </Text>,
      );
    }
  });


  return (
    <TouchableOpacity key={key} style={styles.order} onPress={()=>{}}>
      <Text style={styles.title}>ID: {transactionID}</Text>
      <View style={styles.orderTitle}>
        {menuItemList}
      </View>
      <Text style={styles.time}>ORDER TIME: {orderTime}</Text>
    </TouchableOpacity>
  );
};

export default Order;

const styles = StyleSheet.create({
  order: {
    borderRadius: 10,
    padding: 10,
    margin: 7,
    flexGrow: 2,
    backgroundColor: '#25a2afDD',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 10,
  },
  list: {
    color: '#ffffff',
    textAlign: 'left',
  },
  orderTitle: {
    color: '#ffffff',
  },
  time: {
    color: 'green',
  },
});


