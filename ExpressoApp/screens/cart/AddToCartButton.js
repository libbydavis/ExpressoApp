import React, {Component} from "react";
import {Text, TouchableOpacity, StyleSheet, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddToCartButton extends Component {
    constructor(props) {
        super(props);
    }

    async handleAddToCart() {
        let item = false;
        let tryItems = false;

        while (item === false) {
            try {
                let itemsArray = [this.props.item];
                let total = this.props.item.price;
                if (tryItems === false) {
                    let storedItems = await AsyncStorage.getItem('@items');
                    if (storedItems != null) {
                        const currentValue = JSON.parse(storedItems)
                        itemsArray = [...currentValue, this.props.item];
                    }
                    total = await AsyncStorage.getItem('@total');
                    if (total != null) {
                        total = parseFloat(total);
                        total += this.props.item.price;
                    }
                }
                item = true;
                const jsonValue = JSON.stringify(itemsArray);
                await AsyncStorage.setItem('@items', jsonValue);
                const jsonTotal = JSON.stringify(total);
                await AsyncStorage.setItem('@total', jsonTotal);
            } catch (e) {
                // saving error
                tryItems = true;
                console.log(e)
            }
        }
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
