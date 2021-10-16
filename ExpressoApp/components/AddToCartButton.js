import React, {Component} from "react";
import {Text, TouchableOpacity, StyleSheet, View, Modal, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddToCartButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            price: props.price,
            businessID: props.businessID
        }
    }

    updateItem() {
        let updatedItem = this.props.onClick();
        console.log(updatedItem)
        this.setState({...this.state, ['quantity']: updatedItem.quantity, ['totalPrice']: updatedItem.currentPrice, ['notes']: updatedItem.notes, ['options']: updatedItem.options});
    }

    async handleAddToCart() {
        //TODO: check business ID before adding
        this.updateItem()

        let item = false;
        let tryItems = false;

        while (item === false) {
            try {
                let itemsArray = [this.state];
                let total = this.state.totalPrice;
                if (tryItems === false) {
                    let storedItems = await AsyncStorage.getItem('@items');
                    if (storedItems != null) {
                        const currentValue = JSON.parse(storedItems)
                        itemsArray = [...currentValue, this.state];
                    }
                    total = await AsyncStorage.getItem('@total');
                    if (total != null) {
                        total = parseFloat(total);
                        total += this.state.totalPrice;
                    }
                }
                item = true;
                const jsonValue = JSON.stringify(itemsArray);
                await AsyncStorage.setItem('@items', jsonValue);
                const jsonTotal = JSON.stringify(total);
                await AsyncStorage.setItem('@total', jsonTotal);

                this.notifyAdd()
            } catch (e) {
                // saving error
                tryItems = true;
                console.log(e)
            }
        }
    }

    notifyAdd() {
        let title = this.state.title;
        Alert.alert("Item added!", title + " has been added to cart")
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button} onPress={() => this.handleAddToCart()}>
                    <Text style={styles.buttonText}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        padding: 10,
    }
})
export default AddToCartButton;
