import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Alert} from "react-native";

const StorePageScreen = ( {navigation, route} ) => {


return (
    <View>
        <View style={styles.header}>
            <Image
                source={require('../../assets/ExpressoLogo.png')}
                style={styles.headerIcon}
            />
                <Image
                source={require('../../assets/profileIcon.png')}
                style={styles.profileIcon}
            />
        </View>
        <View styles={styles.storeDetails}>
            <Text style={styles.storeNameText}>{route.params.storeName}</Text>
            <Text style={styles.storeAddressText}>{route.params.storeAddress}</Text>
            <Text style={styles.storePhoneNumText}>{route.params.storePhoneNum }</Text>
        </View>
    
    </View>
   );
};  


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 8,
    },
    headerIcon: {
        width: 200,
        height: 50,
    },
    profileIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginTop: 5,
    },
    container: {
        flex: 1,
    },
    editStorePageButton: {
        flexDirection: 'row',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 70,
        width: '25%',
    },
    addMenuButton: {
        flexDirection: 'row',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        marginTop: -45,
        marginLeft: 225,
        width: '25%',
    },
    itemContainer: {
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: 100,
    },
    storeImageContainer: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        height: '50%',
    },
    itemImageContainerLeft: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        height: '25%',
        width: '25%',
        marginLeft: 60,
        marginTop: 15,
    },
    itemImageContainerRight: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        height: '25%',
        width: '25%',
        marginLeft: 240,
        marginTop: -190,
    },
    storeNameText: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        marginVertical: 5,
        textAlign: 'center',
    },
    storeAddressText: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        marginVertical: 5,
        textAlign: 'center',
    },
    storePhoneNumText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        marginVertical: 5,
        textAlign: 'center',
    },
    itemNameTextLeft: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 25,
        marginTop: -10,
        width: 90,
    },
    itemPriceTextLeft: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 130,
        marginTop: -53,
        width: 45,
    },
    itemNameTextRight: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 205,
        marginTop: -12,
        width: 100,
    },
    itemPriceTextRight: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 315,
        marginTop: -50,
        width: 45,
    },
    text: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 25,
        color: '#25a2af',
        marginVertical: 25,
    },
    modalTextInput: {
        width: '80%',
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        marginVertical: 15,
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButton: {
        width: '50%',
        marginVertical: 30,
        marginLeft: 50,
    },
    storeDetails: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 16
    },
    saveStoreDetailsButton: {
        backgroundColor: '#25a2af',
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    cancelStoreDetailsButton: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
     },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default StorePageScreen;
