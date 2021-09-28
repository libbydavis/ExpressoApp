import React, {Component, useState} from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "../../components/CartItem";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        total: 0.0,
    };

  }

  componentDidMount() {
    this.getItemsFromStorage();
    this.getTotalFromStorage();
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
      this.props.receiveValue(tempTotal);
  }

  deleteCartItem = (index, price) => {
    this.recalculateTotal(price)
    const copyCartItems = [...this.state.items];
    copyCartItems.splice(index, 1);
    this.setState({...this.state.total, ['items'] : copyCartItems});
    this.deleteFromStorage(index);
  }

  deleteFromStorage = async (index) => {
      try {
          await AsyncStorage.getItem('@items')
              .then(async (items) => {
                  if (items) {
                      let updatedItems = JSON.parse(items);
                      updatedItems.splice(index, 1);
                      await AsyncStorage.setItem('@items', JSON.stringify(updatedItems));
                  }
              });
      } catch (e) {
          console.log(e);
      }
  }

  recalculateTotal = (price) => {
    let tempTotal = this.state.total;
    tempTotal -= price;
    this.setState({...this.state.items, ['total'] : tempTotal});
    console.log(tempTotal)
    this.setNewTotalStorage(tempTotal).then(r => {
        this.props.receiveValue(tempTotal);
    });
  }

  setNewTotalStorage = async (newPrice) => {
      await AsyncStorage.setItem('@total', JSON.stringify(newPrice));
  }

  replaceItemsInStorage = async () => {
      await AsyncStorage.setItem('@items', JSON.stringify(this.state.items));
  }

  setNewQuantity = (value, index) => {
      if (value == 0) {
          this.deleteCartItem(index, this.state.items[index].price)
      }
      else {
          let itemsCopy = [...this.state.items];
          let itemCheck = itemsCopy[index];
          itemCheck.quantity = value;

          //minus current total
          let totalCheck = this.state.total;
          totalCheck -= itemCheck.totalPrice;

          //set new total
          itemCheck.totalPrice = itemCheck.price * value;
          totalCheck += itemCheck.totalPrice;
          this.setState({...this.state.items, ['total']: totalCheck});

          //replace item with modified item
          let newArray = [...itemsCopy.slice(0, index), itemCheck, ...itemsCopy.slice(index)];
          this.setState({...this.state.total, ['items']: itemsCopy});

          //set into storage
          this.setNewTotalStorage(totalCheck).then(r => {
              this.replaceItemsInStorage().then(r => {
                  this.props.receiveValue(totalCheck);
              })
          });
      }

  }

  render() {

    return (
        <View style={styles.cartView}>
          <View>
            {
              this.state.items.map((item, index) => {
                return <CartItem key={index} cartItem={{image: item.image, title: item.title, price: item.price, quantity: item.quantity, notes: item.notes, options: item.options}} receiveQuantity={(value) => this.setNewQuantity(value, index)} onpress={() => this.deleteCartItem(index, item.totalPrice)}></CartItem>
              })
            }
          </View>
          <View>
            <Text>Total: ${this.state.total.toFixed(2)}</Text>
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
