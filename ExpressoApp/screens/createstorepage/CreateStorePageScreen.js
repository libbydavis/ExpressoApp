import React, {useState, useEffect} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Text,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import CustomImagePicker from '../../components/CustomImagePicker';
import Header from '../../components/Header';
import ExpressoButton from '../../components/Button';

const CreateStorePageScreen = () => {
    const navigate = useNavigation();
    const userID = firebaseAuth.currentUser.uid;
    const [itemData, setItemData] = useState({});
    const [openEditStoreModal, setOpenEditStoreModal] = useState(false);
    // const [isRender, setisRender] = useState(false);
    // const [storeName, setStoreName] = useState();
    // const [storeAddress, setStoreAddress] = useState();
    // const [storePhoneNum, setStorePhoneNum] = useState();
    // const [coverImage, setCoverImage] = useState();
    // const [itemNameFirst, setItemNameFirst] = useState();
    // const [itemPriceFirst, setItemPriceFirst] = useState();
    // const [itemCoverImageFirst, setItemCoverImageFirst] = useState();
    // const [itemNameSecond, setItemNameSecond] = useState();
    // const [itemPriceSecond, setItemPriceSecond] = useState();
    // const [itemCoverImageSecond, setItemCoverImageSecond] = useState();
    // const [changeStoreData, setChangeStoreData] = useState();

    // itemNameFirst: '',
    // itemPriceFirst: '',
    // itemCoverImageFirst: '',
    // itemNameSecond: '',
    // itemPriceSecond: '',
    // itemCoverImageSecond: '',

    useEffect(() => {
        // let data = readFromStorePage();
        // data = typeof data === undefined ? readFromBusiness() : data;
        // if(typeof data === undefined){
        //     data = {
        //         business: userID,
        //         storeName: '',
        //         storeAddress: '',
        //         storePhoneNum: '',
        //         image: '',
        //     };
        // }
        // setItemData(data);let business = {};
        firebaseDB
        .ref('storepage')
        .child(userID)
        .get()
        .once('value', snapshot => {
            if (snapshot.exists() && snapshot.numChildren() === 1) {
                snapshot.forEach(child => {
                    business = {
                        business: child.val().business,
                        storeName: child.val().storeName,
                        storeAddress: child.val().storeAddress,
                        storePhoneNum: child.val().storePhoneNum,
                        image: child.val().image,
                    };
                });
            }
        });
        console.log('read from store page');
        console.log(business);
        setItemData(business);
    }, []);

    const readFromStorePage = () => {
        let business = {};
        firebaseDB
            .ref('storepage')
            .child(userID)
            .get()
            .once('value', snapshot => {
                if (snapshot.exists() && snapshot.numChildren() === 1) {
                    snapshot.forEach(child => {
                        business = {
                            business: child.val().business,
                            storeName: child.val().storeName,
                            storeAddress: child.val().storeAddress,
                            storePhoneNum: child.val().storePhoneNum,
                            image: child.val().image,
                        };
                    });
                }
            });
            console.log('read from store page');
            console.log(business);
        return business;
    };

    const readFromBusiness = () => {
        let business = {};
        firebaseDB
            .ref()
            .child('businesses')
            .orderByChild('owner')
            .equalTo(userID)
            .once('value', snapshot => {
                let business;
                if (snapshot.exists() && snapshot.numChildren() === 1) {
                    snapshot.forEach(child => {
                        console.log(child.val().title);
                        business = {
                            business: child.val().owner,
                            storeName: child.val().title,
                            storeAddress: child.val().address,
                            storePhoneNum: child.val().phone,
                            image: child.val().image,
                        };
                    });
                }
            });
            console.log('read from business');
            console.log(business);
            return business;
    };

    useEffect(() => {
        console.log(itemData);
    }, [itemData]);

    const saveToDatabase = item => {
        console.log('save to database');
        console.log(item);
        console.log(itemData);
        firebaseDB
            .ref('storepage/' + userID)
            .set(itemData)
            .then(() => {
                console.log('Store details successfully stored');
                Alert.alert(
                    'Success:',
                    'Your store details has been successfully added!',
                    [
                        {
                            text: 'OK',
                        },
                    ],
                );
                // navigate.navigate('StorePageScreen', {userID: userID});
            })
            .catch(error => {
                console.log(error);
            });
        // firebaseDB.ref('storepage'+userID).set(itemData).then(()=>{Alert.alert('Success:', 'Your store details has been successfully added!', [ {text: 'OK,'},],)}).catch(e=>{console.log(e)})
    };

    const receiveImage = image => {
        setItemData(image);
    };

    // const receiveImageFirst = image => {
    //     setCoverImageFirst({
    //         ...coverImageFirst,
    //         ['itemImageFirst']: image,
    //     });
    // };

    // const receiveImageSecond = image => {
    //     setCoverImageSecond({
    //         ...coverImageSecond,
    //         ['itemImageSecond']: image,
    //     });
    // };

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
                    <CustomImagePicker
                        receiveImage={receiveImage}
                        itemData={itemData}
                        width={450}
                        height={190}>
                        {itemData.coverImage}
                    </CustomImagePicker>
                </View>

                <View style={{flex: 1, margin: 20}}>
                    <ExpressoButton
                        title="Edit Store"
                        onPress={() => setOpenEditStoreModal(true)}
                    />
                    <ExpressoButton title="Contact Details" />
                    <ExpressoButton title="Create Your Menu" />
                    <TouchableOpacity
                        onPress={() => saveToDatabase()}
                        style={styles.expressoButtonContainer}>
                        <Text style={styles.expressoButtonText}>
                            Save Store Page
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* 
                <View
                    style={[
                        styles.itemImageContainer,
                        {marginLeft: 60, marginTop: 15},
                    ]}>
                    <CustomImagePicker
                        receiveImage={receiveImageFirst}
                        width={200}
                        height={150}>
                        {CoverImage}
                    </CustomImagePicker>
                </View>
                <View styles={styles.itemContainer}>
                    <TextInput
                        style={[styles.itemNameText, {marginLeft: 25}]}
                        placeholder={'Name'}
                        onChangeText={text => setItemNameFirst(text)}
                    />
                    <TextInput
                        style={[styles.itemPriceText, {marginLeft: 130}]}
                        placeholder={'Price'}
                        onChangeText={text => setItemPriceFirst(text)}
                    />
                </View>
                <View
                    style={[
                        styles.itemImageContainer,
                        {marginLeft: 240, marginTop: -195},
                    ]}>
                    <CustomImagePicker
                        receiveImage={receiveImageSecond}
                        width={200}
                        height={150}>
                        {coverImageSecond}
                    </CustomImagePicker>
                </View>
                <View styles={styles.itemContainer}>
                    <TextInput
                        style={[styles.itemNameText, {marginLeft: 205}]}
                        placeholder={'Name'}
                        onChangeText={item => setInputItemNameSecond(item)}
                    />
                    <TextInput
                        style={[styles.itemPriceText, {marginLeft: 315}]}
                        placeholder={'Price'}
                        onChangeText={item => setInputItemPriceSecond(item)}
                    />
                </View> */}
            </KeyboardAwareScrollView>

            <Modal
                visible={openEditStoreModal}
                onRequestClose={() => setOpenEditStoreModal(false)}
                animationType="slide">
                <View style={styles.modalView}>
                    <Text style={styles.text}>Edit Store Details: </Text>
                    <TextInput
                        style={styles.modalTextInput}
                        value={itemData.storeName}
                        onChangeText={text =>
                            setItemData({
                                ...itemData,
                                ['storeName']: text,
                            })
                        }
                        placeholder="Store name"
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.modalTextInput}
                        value={itemData.storeAddress}
                        onChangeText={text =>
                            setItemData({
                                ...itemData,
                                ['storeAddress']: text,
                            })
                        }
                        placeholder="Store address"
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.modalTextInput}
                        value={itemData.storePhoneNum}
                        onChangeText={text =>
                            setItemData({
                                ...itemData,
                                ['storePhoneNum']: text,
                            })
                        }
                        placeholder="Store phone number"
                        maxLength={70}
                        keyboardType={'numeric'}
                    />
                    <View styles={styles.modalButton}>
                        <TouchableOpacity
                            style={[
                                styles.storeDetailsButton,
                                {backgroundColor: '#25a2af'},
                            ]}>
                            <Text
                                style={styles.buttonText}
                                onPress={() => {
                                    setOpenEditStoreModal(false);
                                }}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.storeDetailsButton,
                                {backgroundColor: 'red'},
                            ]}>
                            <Text
                                style={styles.buttonText}
                                onPress={() => setOpenEditStoreModal(false)}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    expressoButtonContainer: {
        backgroundColor: '#25a2af',
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

export default CreateStorePageScreen;
