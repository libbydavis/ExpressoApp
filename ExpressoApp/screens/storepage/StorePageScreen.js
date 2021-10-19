import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import retrieveImage from '../../constants/RetrieveImage';

function StorePageScreen({navigation, route}) {
    //Menus children objects have business as child
    //StorePages children id is business
    const navigate = useNavigation();
    const business = route.params['business'];
    const title = route.params['title'];
    const address = route.params['address'];
    const [itemData, setItemData] = useState({});
    const [coverImage, setCoverImage] = useState('');

    useEffect(() => {
        firebaseDB.ref('storepage/' + business).on('value', snapshot => {
            if (snapshot.exists()) {
                let store = {
                    business: business ?? business,
                    storeName: snapshot.val().storeName ?? title,
                    storeAddress: snapshot.val().storeAddress ?? address,
                    storePhoneNum: snapshot.val().storePhoneNum ?? '',
                    image: snapshot.val().image ?? '',
                };
                retrieveImage(store.image, setCoverImage)
                console.log("cover image: " + coverImage)
                setItemData(store);
            } else {
                Alert.alert(
                    'Store Page Not Found',
                    `Unfortunately, ${title} is not ready to be ordered from.`,
                );
                navigate.navigate('SearchScreen');
            }
        });
    }, []);

    return (
        <View>
            <Header rightOption="profile" />
            <KeyboardAwareScrollView>
                <View styles={styles.storeDetails}>
                    <Text style={[styles.storeText, {fontSize: 35}]}>
                        {itemData.storeName}
                    </Text>
                    <Text style={[styles.storeText, {fontSize: 25}]}>
                        {itemData.storeAddress}
                    </Text>
                    <Text style={[styles.storeText, {fontSize: 20}]}>
                        {itemData.storePhoneNum}
                    </Text>
                </View>

                <View style={styles.storeImageContainer}>
                    <Image source={{uri: coverImage}} style={{height:200, width:200}} />
                </View>

                <View style={{flex: 1, margin: 20}}></View>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default StorePageScreen;

const styles = StyleSheet.create({
    expressoButtonContainer: {
        backgroundColor: '#25d2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
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
    itemContainer: {
        borderColor: '#ffffff',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: 100,
    },
    storeImageContainer: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
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
        marginTop: -10,
        width: 90,
    },
    itemPriceText: {
        fontSize: 15,
        fontFamily: 'Monserrat-Bold',
        color: '#000000',
        marginVertical: 5,
        textAlign: 'center',
        flexDirection: 'row',
        marginTop: -53,
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
        marginHorizontal: 16,
    },
    storeDetailsButton: {
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    storeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        width: '25%',
    },
});
