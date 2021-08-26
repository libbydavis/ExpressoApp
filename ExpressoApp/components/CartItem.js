import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CartItem = (props) => {
  return (
    <View style={styles.cartItemView}>
      <Text>{props.name}</Text>
      <Text>{props.cost}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItemView: {
    flexDirection: 'row',
    backgroundColor: '#c9c9c9',
  },
})

export default CartItem;
