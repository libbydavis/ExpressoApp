import React, {Component, useCallback, useEffect, useMemo, useState} from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput} from "react-native";
import AddToCartButton from "../../components/AddToCartButton";
import QuantityInput from "../../components/QuantityInput";
import Header from "../../components/Header";
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ReviewMenuItemScreen = ({navigation, route}) => {
    const UNIT_PRICE = route.params.price;
    const [cartItem, setCartItem] = useState({
        title: route.params.title,
        price: UNIT_PRICE,
        currentPrice: route.params.price,
        quantity: 1,
        notes: '',
        options: ''
    })

    const receiveQuantity = (value) => {
        let newPrice = UNIT_PRICE * value;
        setCartItem({...cartItem, ['quantity']: value, ['currentPrice']: newPrice});
    }


    const setNotes = (notes) => {
        setCartItem({...cartItem, ['notes']: notes});
    }

    const toggleOptions = (item, title, isChecked) => {
        let optionsCopy = [...cartItem.options];
        if (isChecked) {
            optionsCopy = [...optionsCopy, item];
            setCartItem({...cartItem, ['options']: optionsCopy});
        }
        else {
            let index = cartItem.options.indexOf(item);
            optionsCopy.splice(index, 1);
            setCartItem({...cartItem, ['options']: optionsCopy});
        }
    }

    const getCartItem = () => {
        return cartItem;
    }


    return (
        <View>
            <Header></Header>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('AddMenuItem')}>
                <Text style={styles.backButtonText}>Back To Menu</Text>
            </TouchableWithoutFeedback>
            <View style={styles.pageView}>
                <View style={styles.contentView}>
                    <Image source={{uri: route.params.image}}></Image>
                    <Text style={styles.title}>{cartItem.title}</Text>
                    <Text style={styles.description}>{route.params.description}</Text>
                    <QuantityInput receiveValue={receiveQuantity} initialQuantity={cartItem.quantity}></QuantityInput>

                    <View style={styles.checkListView}>
                        {
                            route.params.optionLists.map((item, index) => {
                                return (
                                    <View key={index} style={styles.checklist}>
                                        <Text style={styles.checkListTitle}>{item.title}</Text>
                                        {
                                            item.options.map((innerItem, innerIndex) => {
                                                return <BouncyCheckbox iconStyle={{borderColor: '#25a2af'}}
                                                                       fillColor={'#25a2af'}
                                                                       text={innerItem}
                                                                       style={styles.checkItem}
                                                                       key={innerIndex}
                                                                       textStyle={styles.checkboxText}
                                                                       onPress={(isChecked) => toggleOptions(innerItem, item.title, isChecked)}/>
                                            })
                                        }
                                    </View>
                                )

                            })
                        }
                    </View>
                    <Text style={styles.price}>$ {cartItem.currentPrice}</Text>
                    <TextInput onChangeText={(text) => setNotes(text)} placeholder={"additional notes"} style={styles.notesBox} multiline={true}/>

                    <AddToCartButton onClick={getCartItem} title={cartItem.title} price={cartItem.price}></AddToCartButton>
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
    },
    checkListView: {
        marginBottom: 20,
        flexDirection: 'row'
    },
    checkItem: {
        marginBottom: 3,
        marginTop: 3,
    },
    notesBox: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15
    },
    checkListTitle: {
        marginBottom: 5,
        fontSize: 16
    },
    checklist: {
        marginRight: 25
    },
    checkboxText: {
        color: 'black',
        textDecorationLine: 'none'
    }
})

export default ReviewMenuItemScreen;
