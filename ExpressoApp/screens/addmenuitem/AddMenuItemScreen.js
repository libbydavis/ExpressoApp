import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    Modal,
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import QuantityInput from '../../components/QuantityInput';
import CustomImagePicker from '../../components/CustomImagePicker';
import CheckListTask from '../../components/ChecklistTask';
import ToastAndroid from 'react-native/Libraries/Components/ToastAndroid/ToastAndroid';
import {firebaseDB} from "../../firebase/FirebaseConfig";
import CreateOptionListModal from "./CreateOptionListModal";
import Button from "../../components/Button";
import Header from "../../components/Header";
import NotifyOrderReadyButton from "../../components/NotifyOrderReadyButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddMenuItemScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const dbRef = firebaseDB.ref();
    const menuID = route.params;

    const [itemData, setItemData] = useState({
        title: '',
        image: '',
        description: '',
        price: 0.0,
        quantity: 5,
        optionLists: [],
        itemCategory: ''
    });

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const saveChecklist = (checklist) => {
        itemData.optionLists.push({title: checklist.title, items: checklist.items});
    }

    const receiveQuantity = (value) => {
        setItemData({...itemData, ['quantity']: value});
    };

    const receiveImage = (itemDataWithImage) => {
        setItemData(itemDataWithImage);
    }

    const setTitle = (titleText) => {
        setItemData({...itemData, ['title']: titleText});
    }

    const setDescription = (descriptionText) => {
        setItemData({...itemData, ['description']: descriptionText});
    }

    const setPrice = (priceText) => {
        setItemData({...itemData, ['price']: parseFloat(priceText)});
    }

    const setItemCategory = (category) => {
        setItemData({... itemData, ['itemCategory']: category});
    }

    const onClickAddItem = () => {
        let menuRef = dbRef.child(`Menus/${menuID}/menuItems`).push();
        if (menuID) {
            if (!itemData.title) {
                console.error("You must add a title for the item!")
            } else if (!itemData.price) {
                console.error("You must add a price for the item!")
            } else if (!itemData.itemCategory) {
                console.error("You must add a category for the item!")
            } else {
                menuRef.set({
                    'title': itemData.title,
                    'image': itemData.image,
                    'description': itemData.description,
                    'price': itemData.price,
                    'quantity': itemData.quantity,
                    'optionLists': itemData.optionLists,
                    'itemCategory': itemData.itemCategory

                });
                console.log(itemData.title + " pushed to the menu")
                navigation.goBack();
            }
        } else {
            console.error("Invalid menuID!")
        }

    }

    return (
        <View>
            <Header navigation={navigation} rightOption='profile'></Header>
            <Button title={"press"} onPress={() => navigation.navigate('ReviewMenuItem', {title: 'hotdog', price: 10.5, description: 'tasty hotdog', optionLists: [], businessID: 'fake ID'})}></Button>

            <View style={styles.mainView}>
                <Text style={styles.title}>Add Item</Text>
                <CustomImagePicker receiveImage={receiveImage} itemData={itemData} width={200} height={180}/>
                <View style={styles.rowView}>
                    <View style={styles.columnView}>
                        <TextInput style={styles.textInput} placeholder="title" onChangeText={(text) => setTitle(text)}/>
                        <TextInput
                            style={styles.textInput}
                            placeholder="description"
                            multiline={true}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="price"
                            keyboardType='decimal-pad'
                            onChangeText={(text) => setPrice(text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="category"
                            onChangeText={(text) => setItemCategory(text)}
                        />
                    </View>
                    <View style={styles.columnView}>
                        <View style={styles.quantityElements}>
                            <Text style={styles.expressoLabel}>quantity</Text>
                            <View style={styles.rowView}>
                                <QuantityInput receiveValue={receiveQuantity} initialQuantity={5}></QuantityInput>
                            </View>
                        </View>
                        <CreateOptionListModal saveChecklist={saveChecklist} seeModal={modalVisible} toggle={toggleModal}></CreateOptionListModal>
                        <View>
                            <Text style={styles.expressoLabel}>Option Lists</Text>
                            {
                                itemData.optionLists.map((item, index) => {
                                    console.log(item);
                                    return <Text key={index}>- {item.title}</Text>;
                                })
                            }
                        </View>
                        <Button title={"add option list"} onPress={toggleModal}></Button>
                    </View>
                </View>
                <TouchableOpacity
                    style = {styles.expressoButton}
                    title = {"Add Item"}
                    onPress={onClickAddItem}
                    >
                    <Text>Add Item to Menu</Text>
                </TouchableOpacity>
                {/*<View>*/}
                {/*    <Button title={"Add Item"} onPress={onClickAddItem}></Button>*/}
                {/*</View>*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 50,
        marginBottom: 20,
        maxWidth: 140,
        minWidth: 140,
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
    quantityElements: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
});


export default AddMenuItemScreen;
