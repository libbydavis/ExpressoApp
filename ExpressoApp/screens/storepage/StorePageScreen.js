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
                <Text style={styles.storeNameText}>{storeName}</Text>
                <Text style={styles.storeAddressText}>{storeAddress}</Text>
                <Text style={styles.storePhoneNumText}>{storePhoneNum}</Text>
            </View>
            <View style={styles.storeImageContainer}>
                <Image 
                    style={styles.storeCoverImage}
                    source={coverImage.image && {uri: coverImage.image}}
                />  
            </View>
            <TouchableOpacity style={styles.contactButton}>
                    <Text style={styles.buttonText}>
                        Contact
                    </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.buttonText}>
                        Menu
                    </Text> 
            </TouchableOpacity>
            <View style={styles.itemImageContainerLeft}>
                <Image
                    style={styles.storeItemImage}
                    source={itemCoverImage.image && {uri: itemCoverImage.image}}
                />
            </View>
            <View styles={styles.itemContainer}>
                <Text style={styles.itemNameTextLeft} placeholder={"Name"}>{itemName}</Text>
                <Text style={styles.itemPriceTextLeft} placeholder={"Price"}>{itemPrice}</Text>
            </View>
            <View style={styles.itemImageContainerRight}>
                <Image
                    style={styles.storeItemImage}
                    source={itemCoverImage.image && {uri: itemCoverImage.image}}
                />
            </View>
            <View styles={styles.itemContainer}>
                <Text style={styles.itemNameTextRight} placeholder={"Name"}>{itemName}</Text>
                <Text style={styles.itemPriceTextRight} placeholder={"Price"}>{itemPrice}</Text>
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
    container: {
        flex: 1,
    },
    contactButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 70,
        width: '25%',
    },
    menuButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        marginTop: -37,
        marginLeft: 225,
        width: '25%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 16,
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
    itemImageContainerLeft: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        height: '25%',
        width: '25%',
        marginTop: 30,
        marginLeft: 20,
    },
    itemImageContainerRight: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        height: '25%',
        width: '25%',
        marginLeft: 210,
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
    itemNameTextLeft: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 35,
        marginTop: 5,
        width: 60,
    },
    itemPriceTextLeft: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 130,
        marginTop: -25,
        width: 45,
    },
    itemNameTextRight: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 220,
        marginTop: 5,
        width: 50,
    },
    itemPriceTextRight: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginLeft: 315,
        marginTop: -20,
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
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
        textTransform: 'uppercase',
    },
});

export default StorePageScreen;
