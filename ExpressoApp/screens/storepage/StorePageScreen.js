import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAwareScrollView,
    Alert,
} from 'react-native';
import {firebaseDB, firebaseAuth} from '../../firebase/FirebaseConfig';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

const StorePageScreen = ({navigation, route}) => {
    //Menus children objects have business as child
    //StorePages children id is business

    const navigate = useNavigation();
    const business = route.params["business"];
    const [itemData, setItemData] = useState({});

    useEffect(() => {
        firebaseDB.ref('storepage/' + business).on('value', snapshot => {
            if (snapshot.exists()) {
                let store = {
                    business : business ?? '',
                    storeName: snapshot.val().storeName ?? '',
                    storeAddress: snapshot.val().storeAddress ?? '',
                    storePhoneNum: snapshot.val().storePhoneNum ?? '',
                    image: snapshot.val().image ?? '',
                };
                setItemData(store);
            } else {
                alert('Store page data does not exist, please check back another time.');
            }
        });
    }, []);

    useEffect(()=>{console.log(itemData)}, [itemData]);

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
                </View>

                <View style={{flex: 1, margin: 20}}>                    
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

/*
                    {/*
                    Image
                     <CustomImagePicker
                        receiveImage={receiveImage}
                        itemData={itemData}
                        width={450}
                        height={190}>
                        {itemData.coverImage}
                    </CustomImagePicker>
                    Buttons <ExpressoButton
                        title="Edit Store"
                        onPress={() => setOpenEditStoreModal(true)}
                    />
                    <ExpressoButton title="Contact Details" />
                    <TouchableOpacity
                        onPress={() => navigate.navigate('MenuEditor')}
                        style={styles.expressoButtonContainer}>
                        <Text style={styles.expressoButtonText}>
                            Create Menu Screen
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => saveToDatabase()}
                        style={styles.expressoButtonContainer}>
                        <Text style={styles.expressoButtonText}>
                            Save Store Page
                        </Text>
                    </TouchableOpacity> */
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
