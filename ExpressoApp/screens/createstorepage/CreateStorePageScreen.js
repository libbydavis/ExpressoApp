import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, FlatList, Text, Modal, TextInput} from "react-native";
import CustomImagePicker from '../addmenuitem/CustomImagePicker';

const CreateStorePageScreen = ( {navigation} ) => {
    const [storeData, setStoreData] = useState([ {
        id: 1,
        storeName: "",
        storeAddress: "",
        storePhoneNum: "",
        coverImage: "",
    }]);
    const [isRender, setisRender] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputStoreName, setInputStoreName] = useState();
    const [inputStoreAddress, setInputStoreAddress] = useState();
    const [inputStorePhoneNum, setInputStorePhoneNum] = useState();
    const [inputCoverImage, setInputCoverImage] = useState();
    const [changeStoreData, setChangeStoreData] = useState();

    const onPressEditButton = (item) => {
        setOpenModal(true);
        setInputStoreName(item.storeName);
        setInputStoreAddress(item.storeAddress);
        setInputStorePhoneNum(item.storePhoneNum);
        setInputCoverImage(item.coverImage);
        setChangeStoreData(item.id);
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.createStorePageButton}  onPress={() => onPressEditButton(item)}>
                    <Text style={styles.modalButtonText}>
                        Edit
                    </Text> 
                </TouchableOpacity>
                <View styles={styles.storeDetails}>
                    <Text style={styles.storeNameText}>{item.storeName}</Text>
                    <Text style={styles.storeAddressText}>{item.storeAddress}</Text>
                    <Text style={styles.storePhoneNumText}>{item.storePhoneNum}</Text>
                </View>
                <View style={styles.storeCoverImageContainer}>
                     <CustomImagePicker receiveImage={receiveImage} width={450} height={190}>{item.coverImage}</CustomImagePicker>
                </View>
            </View>
        )
    }

    const receiveImage = (image) => {
        setInputCoverImage({...inputCoverImage, ['image'] : image});
    }
    

    const handleChangeStoreData = (changeStoreData) => {
        const newData = storeData.map(item => {
            if(item.id == changeStoreData) {
                item.storeName = inputStoreName;
                item.storeAddress = inputStoreAddress;
                item.storePhoneNum = inputStorePhoneNum;
                item.coverImage = inputCoverImage;
                return item;
            } 
            return item;
        })
        setStoreData(newData);
        setisRender(!isRender);
    }

    const onPressSaveChanges = () => {
        handleChangeStoreData(changeStoreData);
        setOpenModal(false);
    }

   
    return (
        <View>
            <View style={styles.navBar}>
                <Image
                    source={require('../../assets/ExpressoLogo.png')}
                    style={styles.headerIcon}
                />
            </View>
            <FlatList  
                data={storeData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={isRender}
            />
            <Modal visible={openModal} onRequestClose={() => setOpenModal(false)} animationType='slide'>
                <View style={styles.modalView}>
                    <Text style={styles.text}>Edit Store Details: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setInputStoreName(text)}
                        placeholder='Store name'
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setInputStoreAddress(text)}
                        placeholder='Store address'
                        maxLength={70}
                    />
                    <TextInput
                        style={styles.textInput}
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
                            <Text style={styles.modalButtonText} onPress={() => setOpenModal(false)}>
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
    navBar: {
        marginBottom: 15,
        marginTop: 8,
    },
    headerIcon: {
        width: 200,
        height: 50,
        marginLeft: 15,
    },
    container: {
        flex: 1,
    },
    createStorePageButton: {
        backgroundColor: '#25a2af',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        width: '50%',
        marginVertical: 10,
        marginLeft: 100,
    },
    storeDetails: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 16
    },
    storeCoverImageContainer: {
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        height: '50%',

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
    text: {
        fontFamily: 'Monserrat-Bold',
        fontSize: 25,
        color: '#25a2af',
        marginVertical: 25,
    },
    textInput: {
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
