import React, {Component} from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
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
                let itemsArray = this.props.item;
                if (tryItems === false) {
                    let storedItems = await AsyncStorage.getItem('@items');
                    if (storedItems != null) {
                        itemsArray = [...storedItems, this.props.item];
                    }
                }
                item = true;
                console.log(itemsArray)
                const jsonValue = JSON.stringify(itemsArray);
                console.log(jsonValue)
                await AsyncStorage.setItem('testItems', jsonValue);
            } catch (e) {
                // saving error
                tryItems = true;
                console.log(e)
            }
        }
        try {
            let asyncb = await AsyncStorage.getItem('@testItems');
            console.log(asyncb);
        } catch(e) {
            // read error
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.handleAddToCart()}>
                <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
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
