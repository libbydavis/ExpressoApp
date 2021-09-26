import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Modal, TextInput, KeyboardAvoidingView, Alert} from "react-native";
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
                <View>
                    <TouchableOpacity style={styles.editStorePageButton}>
                        <Text style={styles.modalButtonText} onPress={() => onPressEditStoreButton(item)}>
                            Edit Store
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addMenuButton}>
                        <Text style={styles.modalButtonText} onPress={() => onPressSubmitPageButton(item)}>
                            Submit
                        </Text> 
                    </TouchableOpacity>
                    <View styles={styles.storeDetails}>
                        <Text style={styles.storeNameText}>{item.storeName}</Text>
                        <Text style={styles.storeAddressText}>{item.storeAddress}</Text>
                        <Text style={styles.storePhoneNumText}>{item.storePhoneNum}</Text>
                    </View>
                    <View style={styles.storeImageContainer}>
                        <CustomImagePicker receiveImage={receiveImage} width={450} height={200}>{item.coverImage}</CustomImagePicker>
                    </View>
                    <View style={styles.itemImageContainerLeft}>
                        <CustomImagePicker receiveImage={receiveItemImage} width={200} height={150}>{item.itemCoverImage}</CustomImagePicker>
                    </View>
                    <View styles={styles.itemContainer}>
                        <TextInput style={styles.itemNameTextLeft} placeholder={"Name"} onChangeText={(item) => setInputItemName(item)}/>
                        <TextInput style={styles.itemPriceTextLeft} placeholder={"Price"} onChangeText={(item) => setInputItemPrice(item)}/>
                    </View>
                    <View style={styles.itemImageContainerRight}>
                        <CustomImagePicker receiveImage={receiveItemImage} width={200} height={150}>{item.itemCoverImage}</CustomImagePicker>
                    </View>
                    <View styles={styles.itemContainer}>
                        <TextInput style={styles.itemNameTextRight} placeholder={"Name"} onChangeText={(item) => setInputItemName(item)}/>
                        <TextInput style={styles.itemPriceTextRight} placeholder={"Price"} onChangeText={(item) => setInputItemPrice(item)}/>
                    </View>
                </View>
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
                        <TouchableOpacity style={styles.saveStoreDetailsButton}>
                            <Text style={styles.modalButtonText} onPress={() => onPressSaveChanges()}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelStoreDetailsButton}>
                            <Text style={styles.modalButtonText} onPress={() => setOpenEditStoreModal(false)}>
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

export default CreateStorePageScreen;
