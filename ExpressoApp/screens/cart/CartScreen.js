import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CartItem from './CartItem';
import Cart from "./Cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CartScreen = ({navigation, route}) => {
  const [total, setTotal] = useState(0.0);
  const [items, setItems] = useState();

  const receiveTotal = (value) => {
    setTotal(value);
  };

  const receiveItems = (item) => {
    setItems(item);
  };




  return (
    <ScrollView>
      <View style={styles.cartView}>
        <Text style={styles.cartTitle}>Cart</Text>
        <Cart></Cart>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartTitle: {
    fontFamily: 'Monserrat-Regular',
    color: '#25a2af',
    fontSize: 35,
    margin: 10,
  },
  payButton: {
    backgroundColor: '#25a2af',
    borderRadius: 10,
    padding: 10,
    paddingRight: 50,
    paddingLeft: 50,
    marginTop: 15,
  },
  payButtonText: {
    color: '#ffffff',
  },
});


export default CartScreen;
