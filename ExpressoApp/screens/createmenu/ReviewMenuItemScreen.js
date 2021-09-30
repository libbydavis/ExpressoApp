import React, {Component, useState} from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import AddToCartButton from "../../components/AddToCartButton";
import QuantityInput from "../../components/QuantityInput";
import Header from "../../components/Header";

//TODO: options lists
//TODO: make nav bar into it's own component

const ReviewMenuItemScreen = ({navigation, route}) => {
    const [quantity, setQuantity] = useState(1);
    const UNIT_PRICE = route.params.item.price;
    const [currentPrice, setCurrentPrice] = useState(route.params.item.price);

    const receiveQuantity = (value) => {
        setQuantity(quantity);
        let newPrice = UNIT_PRICE * value;
        setCurrentPrice(newPrice);
    }

    return (
        <View>
            <Header></Header>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AddMenuItem')}>
                <Text style={styles.backButtonText}>Back To Menu</Text>
            </TouchableWithoutFeedback>
            <View style={styles.pageView}>
                <View style={styles.contentView}>
                    <Image source={{uri: route.params.item.image}}></Image>
                    <Text style={styles.title}>{route.params.item.title}</Text>
                    <Text style={styles.description}>{route.params.item.description}</Text>

                    <QuantityInput receiveValue={receiveQuantity} initialQuantity={quantity}></QuantityInput>
                    <Text style={styles.price}>$ {currentPrice}</Text>
                    <AddToCartButton item={{title: route.params.item.title, price: UNIT_PRICE, quantity: quantity}}></AddToCartButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageView: {
        alignItems: 'center',
        marginTop: 15
    },
    contentView: {
        justifyContent: 'flex-start'
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 25,
        marginBottom: 10,
        marginTop: 15
    },
    description: {
        fontFamily: 'Monserrat-Regular',
        marginBottom: 30,
    },
    price: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 16,
        marginBottom: 20,
    },
    backButtonText: {
        fontFamily: 'Monserrat-ExtraBold',
        marginLeft: 22,
        fontSize: 15
    }

})

export default ReviewMenuItemScreen;
