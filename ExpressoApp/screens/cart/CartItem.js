import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const CartItem = (props) => {
  return (
    <View style={styles.cartItemView}>
      <View style={styles.leftDiv}>
        <Image source={{uri: props.image}} style={styles.image}></Image>
        <Text>{props.title}</Text>
        <Text style={styles.price}>${props.price}</Text>
      </View>
      <View style={styles.rightDiv}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250,
  },
  leftDiv: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightDiv: {
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  price: {
    marginLeft: 10,
  },
  x: {
    color: 'red',
    padding: 10,
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
