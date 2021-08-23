import React, {Component} from "react";
import {Image, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";


export default class quantityInput extends Component {
    state = {
        quantityText: '5',
        quantityValue: 5,
        quantityPlaceholder: '5',
    }
    handleButtonQuantity(buttonType) {
        let currentValue;
        if (buttonType == true) {
            currentValue = ++this.state.quantityValue;
        }
        else {
            currentValue = --this.state.quantityValue;
        }
        let textValue = currentValue.toString();

        this.setState({
            quantityValue: currentValue,
            quantityText: textValue,
        });
    }

    minusQuantity() {
        this.handleButtonQuantity(false);
    }

    plusQuantity() {
        this.handleButtonQuantity(true);
    }

    setKeyQuantity() {
        let textValue = "10";
        let currentValue = textValue.valueOf();

        this.setState({
            quantityValue: currentValue,
            quantityText: textValue,
        });
        console.log(this.state.quantityText);
    }

    render() {
        return(
            <View style={styles.quantityRow}>
                <TouchableOpacity onPress={this.minusQuantity.bind(this)}>
                    <Image source={require('../assets/minusButton.png')} style={styles.quantityIcon} />
                </TouchableOpacity>
                <TextInput placeholder={this.state.quantityPlaceholder} value={this.state.quantityText} onKeyPress={this.setKeyQuantity.bind(this)} />
                <TouchableOpacity onPress={this.plusQuantity.bind(this)}>
                    <Image source={require('../assets/addButton.png')} style={styles.quantityIcon} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    quantityRow: {
        flexDirection: "row",
    },
    quantityIcon: {
        width: 25,
        height: 25,
    },
});
