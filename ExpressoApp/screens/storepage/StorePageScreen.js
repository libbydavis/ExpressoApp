import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import {firebaseDB, firebaseAuth} from '../../firebase/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const StorePageScreen = ({route}) => {
    //Menus children objects have business as child
    //StorePages children id is business

    const navigate = useNavigation();
    const business = route.params;

    const [storeData, setStoreData] = useState([
        {
            storeName: '',
            storeAddress: '',
            storePhoneNum: '',
            coverImage: '',
            itemNameFirst: '',
            itemPriceFirst: '',
            itemCoverImageFirst: '',
            itemNameSecond: '',
            itemPriceSecond: '',
            itemCoverImageSecond: '',
        },
    ]);

    useEffect(() => {
        firebaseDB.ref(`storepage/` + business).on('value', snapshot => {
            if (snapshot.exists()) {
                let storeDetailsList = [];
                let coverImage = snapshot.val().coverImage.image;
                let itemCoverImageFirst =
                    snapshot.val().itemCoverImageFirst.itemImageFirst;
                let itemCoverImageSecond =
                    snapshot.val().itemCoverImageSecond.itemImageSecond;
                let storeName = snapshot.val().storeName;
                let storeAddress = snapshot.val().storeAddress;
                let storePhoneNum = snapshot.val().storePhoneNum;
                let itemNameFirst = snapshot.val().itemNameFirst;
                let itemNameSecond = snapshot.val().itemNameSecond;
                let itemPriceFirst = snapshot.val().itemPriceFirst;
                let itemPriceSecond = snapshot.val().itemPriceSecond;

                storeDetailsList.push({
                    coverImage,
                    itemCoverImageFirst,
                    itemCoverImageSecond,
                    storeName,
                    storeAddress,
                    storePhoneNum,
                    itemNameFirst,
                    itemNameSecond,
                    itemPriceFirst,
                    itemPriceSecond,
                });

                // console.log(storeDetailsList);
                setStoreData(storeDetailsList);
            } else {
                alert('Store page data does not exist');
            }
        });
    }, []);

    return (
        <>
            <Header navigation={navigate} rightOption={'profile'} />
            <ScrollView>
                <View styles={styles.storeDetails}>
                    <Text style={[styles.storeText, {fontSize: 35}]}>
                        {storeData[0].storeName}
                    </Text>
                    <Text style={[styles.storeText, {fontSize: 25}]}>
                        {storeData[0].storeAddress}
                    </Text>
                    <Text style={[styles.storeText, {fontSize: 20}]}>
                        {storeData[0].storePhoneNum}
                    </Text>
                </View>
                <View style={styles.storeImageContainer}>
                    <Image
                        style={styles.storeCoverImage}
                        source={
                            storeData[0].coverImage && {
                                uri: storeData[0].coverImage,
                            }
                        }
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, {marginLeft: 70, marginTop: 15}]}>
                    <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {marginLeft: 225, marginTop: -35}]}>
                    <Text style={styles.buttonText}>Menu</Text>
                </TouchableOpacity>
                <View
                    style={[
                        styles.itemImageContainer,
                        {marginLeft: 30, marginTop: 20},
                    ]}>
                    <Image
                        style={styles.storeItemImage}
                        source={
                            storeData[0].itemCoverImageFirst && {
                                uri: storeData[0].itemCoverImageFirst,
                            }
                        }
                    />
                </View>
                <View styles={styles.itemContainer}>
                    <Text
                        style={[styles.itemNameText, {marginLeft: 35}]}
                        placeholder={'Name'}>
                        {storeData[0].itemNameFirst}
                    </Text>
                    <Text
                        style={[styles.itemPriceText, {marginLeft: 130}]}
                        placeholder={'Price'}>
                        {storeData[0].itemPriceFirst}
                    </Text>
                </View>
                <View
                    style={[
                        styles.itemImageContainer,
                        {marginLeft: 210, marginTop: -190},
                    ]}>
                    <Image
                        style={styles.storeItemImage}
                        source={
                            storeData[0].itemCoverImageSecond && {
                                uri: storeData[0].itemCoverImageSecond,
                            }
                        }
                    />
                </View>
                <View styles={styles.itemContainer}>
                    <Text
                        style={[styles.itemNameText, {marginLeft: 220}]}
                        placeholder={'Name'}>
                        {storeData[0].itemNameSecond}
                    </Text>
                    <Text
                        style={[styles.itemPriceText, {marginLeft: 315}]}
                        placeholder={'Price'}>
                        {storeData[0].itemPriceSecond}
                    </Text>
                </View>
            </ScrollView>
        </>
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
        marginHorizontal: 16,
    },
});

export default StorePageScreen;
