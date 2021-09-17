import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import QuantityInput from "../addmenuitem/QuantityInput";

const CartItem = (props) => {
  const receiveQuantity = (value) => {
    props.receiveQuantity(value)
  };

  return (
    <View style={styles.cartItemView}>

      <View style={styles.leftDiv}>
        <Image source={{uri: props.image}} style={styles.image}></Image>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.rightDiv}>
        <View style={styles.quantityStyle}>
          <QuantityInput receiveValue={receiveQuantity} initialQuantity={props.quantity}></QuantityInput>
        </View>
        <Text style={styles.price}>${props.price}</Text>
        <Text style={styles.x} onPress={props.onpress}>X</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemView: {
    flexDirection: 'row',
    backgroundColor: '#c9c9c9',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
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
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CartItem;
