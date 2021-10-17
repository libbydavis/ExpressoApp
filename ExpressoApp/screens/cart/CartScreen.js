import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity, Image,
} from 'react-native';
import Cart from "./Cart";
import PaymentButton from "../../components/PaymentButton";
import Header from "../../components/Header";
/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CartScreen = ({navigation}) => {
  const [amount, setAmount] = useState();

  const receiveAmount = (value) => {
    setAmount(value);
  };

  return (
    <ScrollView>
      <Header></Header>
      <View style={styles.cartView}>
        <Text style={styles.cartTitle}>Cart</Text>
        <Cart receiveValue={receiveAmount}></Cart>
        <PaymentButton amount={amount}></PaymentButton>
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
});


export default CartScreen;
