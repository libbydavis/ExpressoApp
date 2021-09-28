import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, 
    ScrollView, FlatList, Text, Modal, TextInput, KeyboardAvoidingView, Alert} from "react-native";
import CustomImagePicker from '../addmenuitem/CustomImagePicker';
import {firebase, firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';

const CreateStorePageScreen = ( {navigation} ) => {

    const user = firebaseAuth.currentUser;
    const userID = user.uid;

    const [storeData, setStoreData] = useState([{
        id: 1,
        storeName: "",
        storeAddress: "",
        storePhoneNum: "",
        coverImage: "",
        itemName: "",
        itemPrice: "",
        itemCoverImage: "",
    }]);
    const [isRender, setisRender] = useState(false);
    const [openEditStoreModal, setOpenEditStoreModal] = useState(false);
    const [inputStoreName, setInputStoreName] = useState();
    const [inputStoreAddress, setInputStoreAddress] = useState();
    const [inputStorePhoneNum, setInputStorePhoneNum] = useState();
    const [inputCoverImage, setInputCoverImage] = useState();

    const [inputItemName, setInputItemName] = useState();
    const [inputItemPrice, setInputItemPrice] = useState();
    const [inputItemCoverImage, setInputItemCoverImage] = useState();
    const [changeStoreData, setChangeStoreData] = useState();


    const onPressEditStoreButton = (item) => {
        setOpenEditStoreModal(true);
        setInputStoreName(item.storeName);
        setInputStoreAddress(item.storeAddress);
        setInputStorePhoneNum(item.storePhoneNum);
     
        setChangeStoreData(item.id);
    }

    const onPressSubmitPageButton = () => {
        firebaseDB.ref('storepage/' + userID)
        .set({
            storeName: storeData[0].storeName,
            storeAddress: storeData[0].storeAddress,
            storePhoneNum: storeData[0].storePhoneNum,
            coverImage: storeData[0].coverImage,
            itemName: storeData[0].itemName,
            itemPrice: storeData[0].itemPrice,
            itemCoverImage : storeData[0].itemCoverImage,
        })
        .then(() => {
            console.log("Store details successfully stored");
            Alert.alert(
                "Success:",
                "Your store details has been successfully added!",
                [
                    {
                        text: "OK",
                    },
                ]
            )
        })
        .catch((error) => {
            console.error(error);
        });
        navigation.navigate('StorePageScreen', storeData[0]);
    }
    

    const renderItem = ({ item }) => {
        return (
            <KeyboardAvoidingView behavior="height">
                <ScrollView>
                    <TouchableOpacity style={styles.editStorePageButton}>
                        <Text style={styles.buttonText} onPress={() => onPressEditStoreButton(item)}>
                            Edit Store
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.buttonText} onPress={() => onPressSubmitPageButton(item)}>
                            Submit
                        </Text> 
                    </TouchableOpacity>
                    <View styles={styles.storeDetails}>
                        <Text style={[styles.storeText, {fontSize: 35}]}>{item.storeName}</Text>
                        <Text style={[styles.storeText, {fontSize: 25}]}>{item.storeAddress}</Text>
                        <Text style={[styles.storeText, {fontSize: 20}]}>{item.storePhoneNum}</Text>
                    </View>
                    <View style={styles.storeImageContainer}>
                        <CustomImagePicker receiveImage={receiveImage} width={450} height={190}>{item.coverImage}</CustomImagePicker>
                    </View>
                    <TouchableOpacity style={[styles.storeButton, {marginLeft: 70, marginTop: 5}]}>
                        <Text style={styles.buttonText}>
                            Contact
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.storeButton, {marginLeft: 225, marginTop: -35}]}>
                        <Text style={styles.buttonText}>
                            Menu
                        </Text> 
                    </TouchableOpacity>
                    <View style={[styles.itemImageContainer, {marginLeft: 60, marginTop: 15}]}>
                        <CustomImagePicker receiveImage={receiveItemImage} width={200} height={150}>{item.itemCoverImage}</CustomImagePicker>
                    </View>
                    <View styles={styles.itemContainer}>
                        <TextInput style={[styles.itemNameText, {marginLeft: 25}]} placeholder={"Name"} onChangeText={(item) => setInputItemName(item)}/>
                        <TextInput style={[styles.itemPriceText, {marginLeft: 130}]} placeholder={"Price"} onChangeText={(item) => setInputItemPrice(item)}/>
                    </View>
                    <View style={[styles.itemImageContainer, {marginLeft: 240, marginTop: -195}]}>
                        <CustomImagePicker receiveImage={receiveItemImage} width={200} height={150}>{item.itemCoverImage}</CustomImagePicker>
                    </View>
                    <View styles={styles.itemContainer}>
                        <TextInput style={[styles.itemNameText, {marginLeft: 205}]} placeholder={"Name"} onChangeText={(item) => setInputItemName(item)}/>
                        <TextInput style={[styles.itemPriceText, {marginLeft: 315}]} placeholder={"Price"} onChangeText={(item) => setInputItemPrice(item)}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const receiveImage = (image) => {
        setInputCoverImage({...inputCoverImage, ['image'] : image});
    }

    const receiveItemImage = (image) => {
        setInputItemCoverImage({...inputItemCoverImage, ['image'] : image});
    }

    const handleChangeStoreData = (changeStoreData) => {
        const newData = storeData.map(item => {
            if(item.id == changeStoreData) {
                item.storeName = inputStoreName;
                item.storeAddress = inputStoreAddress;
                item.storePhoneNum = inputStorePhoneNum;
                item.coverImage = inputCoverImage;
                item.itemName = inputItemName;
                item.itemPrice = inputItemPrice;
                item.itemCoverImage = inputItemCoverImage;
                return item;
            }
            return item;
        })
        setStoreData(newData);
        setisRender(!isRender);
        console.log(newData);
    }
    

    const onPressSaveChanges = () => {
        handleChangeStoreData(changeStoreData);
        setOpenEditStoreModal(false);
    }

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
            <FlatList
                data={storeData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={isRender}
            />
            <Modal visible={openEditStoreModal} onRequestClose={() => setOpenEditStoreModal(false)} animationType='slide'>
                <View style={styles.modalView}>
                    <Text style={styles.text}>Edit Store Details: </Text>
                    <TextInput
                        style={styles.modalTextInput}
                        onChangeText={(text) => setInputStoreName(text)}
                        placeholder='Store name'
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.modalTextInput}
                        onChangeText={(text) => setInputStoreAddress(text)}
                        placeholder='Store address'
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.modalTextInput}
                        onChangeText={(text) => setInputStorePhoneNum(text)}
                        placeholder='Store phone number'
                        maxLength={70}
                    />
                    <View styles={styles.modalButton}>
                        <TouchableOpacity style={[styles.storeDetailsButton, {backgroundColor: '#25a2af'}]}>
                            <Text style={styles.buttonText} onPress={() => onPressSaveChanges()}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.storeDetailsButton, {backgroundColor: 'red'}]}>
                            <Text style={styles.buttonText} onPress={() => setOpenEditStoreModal(false)}>
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
    submitButton: {
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
        marginHorizontal: 16
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
