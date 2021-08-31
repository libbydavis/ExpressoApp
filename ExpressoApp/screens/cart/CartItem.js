import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CartItem = (props) => {
  return (
    <View style={styles.cartItemView}>
      <View style={styles.leftView}>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.rightView}>
        <Text>${props.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemView: {
    flexDirection: 'row',
    backgroundColor: '#c9c9c9',
    margin: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    alignSelf: 'flex-start',
  },
  rightView: {
    alignSelf: 'flex-end',
  },
});

export default CartItem;
