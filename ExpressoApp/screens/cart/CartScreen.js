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

  const deleteCartItem = (index, price) => {
    recalculateTotal(price);
    const copyCartItems = [...items];
    copyCartItems.splice(index, 1);
    setItems(copyCartItems);
  }

  const recalculateTotal = (price) => {
    let tempTotal = total;
    tempTotal -= price;
    setTotal(tempTotal);
  }

  return (
    <ScrollView>
      <Cart items={items} receiveTotal={receiveTotal} receiveItems={receiveItems}></Cart>
      <View style={styles.cartView}>
        <Text style={styles.cartTitle}>Cart</Text>
        <View>
          {
            items.map((item, index) => {
                return <CartItem key={index} image={item.image} title={item.title} price={item.price} onpress={() => deleteCartItem(index, item.price)}></CartItem>
            })
          }
        </View>
        <View>
          <Text>Total: ${total}</Text>
        </View>
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
