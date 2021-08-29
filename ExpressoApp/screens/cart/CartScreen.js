import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import firebase from 'firebase';
// import CheckListTask from '../components/ChecklistTask';
import CartItem from './CartItem';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CartScreen = ({navigation, route}) => {
  const [total, setTotal] = useState(0.0);

  const calculateTotal = () => {
    let tempTotal = 0.0
    route.params.items.map((item) => {tempTotal = tempTotal + item.price})
    setTotal(tempTotal)
  }

  return (
    <ScrollView>
      <View style={styles.cartView}>
        <Text style={styles.cartTitle}>Cart</Text>
        <View>
          {
            route.params.items.map((item, index) => {
              return <CartItem key={index} title={item.title} price={item.price}></CartItem>;
            })
          }
        </View>
        <View>
          {
            calculateTotal()
          }
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
