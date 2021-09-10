import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {nextTick} from 'yarn/lib/cli';

// eslint-disable-next-line react/prop-types
function Order({props}, {key}) {
  const navigation = useNavigation();
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
  // onPress={()=>{
  // navigation.navigate('OrderScreen', {this.component});

  return (
    <TouchableOpacity key={key} style={styles.order} onPress={()=>{
      navigation.navigate('OrderScreen', props={menuItems: menuItemList, transactionID: transactionID, orderTime: orderTime});
    }}>
      <Text style={styles.title}>ID: {transactionID}</Text>
      <View style={styles.orderTitle}>
        {menuItemList}
      </View>
      <Text style={styles.time}>Time: {orderTime}</Text>
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
    backgroundColor: '#29b79c',
    width: '100%',
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
    fontSize: 18,
  },
  time: {
    fontSize: 18,
    color: 'green',
  },
});


