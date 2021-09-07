import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items,
      total: calculateTotal(props.items, props.receiveTotal)
    }
  }

  render() {
    return (
        <View></View>
    )
  }
}

function calculateTotal(items, parentTotal) {
  let tempTotal = 0.0;
  items.map((item) => {tempTotal = tempTotal + item.price});
  parentTotal(tempTotal);
  return(tempTotal);
}

export default Cart;
