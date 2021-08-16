import React, {Component, useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import QuantityInput from './QuantityInput';

const AddMenuItemScreen = ({navigation}) => {

    return(
        <View style={styles.mainView}>
            <Text style={styles.title}>Add Item</Text>
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <TextInput style={styles.textInput} placeholder="title" />
                    <TextInput style={styles.textInput} placeholder="description" multiline={true}/>
                    <TextInput style={styles.textInput} placeholder="price" keyboardType='decimal-pad' />
                </View>
                <View style={styles.columnView}>
                    <View>
                        <Text>quantity</Text>
                        <View style={styles.rowView}>
                            <QuantityInput></QuantityInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.expressoButton}>
                        <Text style={styles.expressoButtonText}>add options</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.expressoButton}>
                    <Text style={styles.expressoButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 50,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    rowView: {
      flexDirection: "row",
        marginTop: 20,
    },
    columnView: {
      flexDirection: "column",
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButton: {
      backgroundColor: '#25a2af',
      borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
});

export default AddMenuItemScreen;
