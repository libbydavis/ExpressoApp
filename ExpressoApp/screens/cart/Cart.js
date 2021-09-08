import React, {Component, useState} from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "./CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total: 0.0
    };

  }

  /*
  function firstFunction(_callback){
  // do some asynchronous work
  // and when the asynchronous stuff is complete
  _callback();
}

  function secondFunction(){
  // call first function and pass in a callback function which
  // first function runs when it has completed
  firstFunction(function() {
    console.log('huzzah, I\'m done!');
  });

   */

  componentDidMount() {
    this.getItemsFromStorage();
    this.getTotalFromStorage();
    /*
    let itemsFromStore = getItemsFromStorage();
    let totalFromStore = getTotalFromStorage();
    this.setState((state, props) => ({
      items: itemsFromStore,
      total: totalFromStore
    }));

     */
  }

  getItemsFromStorage = async () => {
      let itemsTemp = [];
      try {
          await AsyncStorage.getItem('@items')
              .then((item) => {
                  if (item) {
                      itemsTemp = JSON.parse(item);
                  }
              });
      } catch (e) {
          console.log(e);
      }
      this.setState({...this.state, ['items']: itemsTemp});
  }

  getTotalFromStorage = async () => {
      let tempTotal = 0.0;
      try {
          await AsyncStorage.getItem('@total')
              .then((total) => {
                  if (total) {
                      tempTotal = parseFloat(total);
                  }
              });
      } catch (e) {
          console.log(e);
      }
      this.setState({...this.state, ['total']: tempTotal});
  }

  deleteCartItem = (index, price) => {
    this.recalculateTotal(price)
    const copyCartItems = [...this.state.items];
    copyCartItems.splice(index, 1);
    this.setState({...this.state.total, ['items'] : copyCartItems});
  }

  recalculateTotal = (price) => {
    let tempTotal = this.state.total;
    tempTotal -= price;
    this.setState({...this.state.items, ['total'] : tempTotal});
  }

  render() {

    return (

        <View style={styles.cartView}>
          <View>
            {
              this.state.items.map((item, index) => {
                return <CartItem key={index} image={item.image} title={item.title} price={item.price} onpress={() => this.deleteCartItem(index, item.price)}></CartItem>
              })
            }
          </View>
          <View>
            <Text>Total: ${this.state.total}</Text>
          </View>
        </View>

    )
  }
}

const styles = StyleSheet.create({
    cartView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Cart;
