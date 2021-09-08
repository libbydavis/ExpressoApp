import React, {Component, useState} from "react";
import { ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: getItemsFromStorage(props.receiveItems),
      total: getTotalFromStorage(props.receiveTotal),
    }
  }

  render() {
    return (
        <View></View>
    )
  }
}

async function getTotalFromStorage(parentTotal) {
  let tempTotal = 0.0;
  try {
    await AsyncStorage.getItem('@total')
        .then((total) => {
          if (total) {
            parentTotal(JSON.parse(total));
            tempTotal = JSON.parse(total);
          }
        });
  } catch (e) {
    console.log(e);
  }
  console.log(tempTotal)
  return tempTotal;
}
function calculateTotal(items, parentTotal) {
  let tempTotal = 0.0;
  this.state.items.map((item) => {tempTotal = tempTotal + item.price});
  parentTotal(tempTotal);
  console.log(tempTotal)
  return(tempTotal);
}

async function getItemsFromStorage(parentItems) {
  let itemsTemp = [];
  try {
    await AsyncStorage.getItem('@items')
        .then((item) => {
          if (item) {
            itemsTemp = [...itemsTemp, JSON.parse(item)]
          }
        });
  } catch (e) {
    console.log(e);
  }
  console.log(itemsTemp)
  parentItems(JSON.parse(itemsTemp));
  return itemsTemp;
}

export default Cart;
