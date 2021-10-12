import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import QuantityInput from "./QuantityInput";

const CartItem = (props) => {
  const receiveQuantity = (value) => {
    props.receiveQuantity(value)
  };

  function ViewBottom() {
    if (props.cartItem.notes || props.cartItem.options) {
      return (
          <View style={styles.secondRow}>
            <Text style={styles.options}>options: {props.cartItem.options}</Text>
            <Text>notes: {props.cartItem.notes? props.cartItem.notes: "none"}</Text>
          </View>
      )
    }
    return null;
  }

return (
    <View style={styles.cartItemView}>
      <Image source={{uri: props.cartItem.image}} style={styles.image}></Image>
      <View>
        <View style={styles.firstRow}>
          <View style={styles.leftDiv}>
            <Text>{props.cartItem.title}</Text>
          </View>
          <View style={styles.rightDiv}>
            <View style={styles.quantityStyle}>
              <QuantityInput receiveValue={receiveQuantity} initialQuantity={props.cartItem.quantity}></QuantityInput>
            </View>
            <Text style={styles.price}>${props.cartItem.price}</Text>
            <Text style={styles.x} onPress={props.onpress}>X</Text>
          </View>
        </View>
        <ViewBottom></ViewBottom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemView: {
    backgroundColor: '#c9c9c9',
    margin: 10,
    borderRadius: 10,
    alignContent: 'center',
    flexDirection: 'row',
  },
  firstRow: {
    flexDirection: 'row',
  },
  secondRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  leftDiv: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightDiv: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityStyle: {
    marginTop: 25,
    marginLeft: 5
  },
  price: {
    marginLeft: 10,
  },
  x: {
    color: 'red',
    padding: 10,
    marginLeft: 10
  },
  image: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    alignSelf: 'center',
    margin: 5,
    backgroundColor: 'green'
  },
  options: {
    marginRight: 10,
  }
});

export default CartItem;
