import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity, Image,
} from 'react-native';
import Cart from "./Cart";
/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CartScreen = ({navigation}) => {

  return (
    <ScrollView>
      <View style={styles.navBar}>
        <Image
            source={require('../../assets/ExpressoLogo.png')}
            style={styles.headerIcon}
        />
        <TouchableOpacity onPress={navigation.navigate('Cart')}>
          <Image source={require('../../assets/carticon.png')} style={styles.cartIcon}/>
        </TouchableOpacity>
      </View>
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
  navBar: {
    marginBottom: 15,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 200,
    height: 50,
    marginLeft: 15,
  },
  cartIcon: {
    width: 40,
    height: 40,
    marginTop: 8,
    marginRight: 10,
  },
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
