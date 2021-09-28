import React from "react";
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";


const StorePageScreen = ( {navigation, route} ) => {
    const {storeName, storeAddress, storePhoneNum, 
            coverImage, itemName, itemPrice, itemCoverImage} = route.params;
    console.log(coverImage.image);
    console.log(storeName);
    
    return (
        <ScrollView>
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
                <Text style={[styles.storeText, {fontSize: 35}]}>{storeName}</Text>
                <Text style={[styles.storeText, {fontSize: 25}]}>{storeAddress}</Text>
                <Text style={[styles.storeText, {fontSize: 20}]}>{storePhoneNum}</Text>
            </View>
            <View style={styles.storeImageContainer}>
                <Image 
                    style={styles.storeCoverImage}
                    source={coverImage.image && {uri: coverImage.image}}
                />  
            </View>
            <TouchableOpacity style={[styles.button, {marginLeft: 70, marginTop: 15}]}>
                <Text style={styles.buttonText}>
                    Contact
                </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginLeft: 225, marginTop: -40}]}>
                <Text style={styles.buttonText}>
                    Menu
                </Text> 
            </TouchableOpacity>
            <View style={[styles.itemImageContainer, {marginLeft: 30, marginTop: 20}]}>
                <Image
                    style={styles.storeItemImage}
                    source={itemCoverImage.image && {uri: itemCoverImage.image}}
                />
            </View>
            <View styles={styles.itemContainer}>
                <Text style={[styles.itemNameText, {marginLeft: 35}]} placeholder={"Name"}>{itemName}</Text>
                <Text style={[styles.itemPriceText, {marginLeft: 130}]} placeholder={"Price"}>{itemPrice}</Text>
            </View>
            <View style={[styles.itemImageContainer, {marginLeft: 210, marginTop: -190}]}>
                <Image
                    style={styles.storeItemImage}
                    source={itemCoverImage.image && {uri: itemCoverImage.image}}
                />
            </View>
            <View styles={styles.itemContainer}>
                <Text style={[styles.itemNameText, {marginLeft: 220}]} placeholder={"Name"}>{itemName}</Text>
                <Text style={[styles.itemPriceText, {marginLeft: 315}]} placeholder={"Price"}>{itemPrice}</Text>
            </View>
        </ScrollView>
    );
}


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
    storeCoverImage: {
        width: 450,
        height: 190,
        marginTop: 12,
    },
    storeItemImage: {
        width: 160,
        height: 150,
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        width: '25%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 15,
        textTransform: 'uppercase',
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
    itemImageContainer: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        height: '25%',
        width: '25%',
    },
    storeText: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        marginVertical: 5,
        textAlign: 'center',
    },
    itemNameText: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: 5, 
        width: 60,
    },
    itemPriceText: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: -25,
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
    storeDetails: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 16
    },
});

export default StorePageScreen;
