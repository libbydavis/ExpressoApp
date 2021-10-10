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
import NotifyOrderButton from "../../components/NotifyOrderButton";

const AddMenuItemScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const dbRef = firebaseDB.ref();
    const menuID = route.params;

    const [menuItemObject, setMenuItemObject] = useState({
        title: '',
        image: '',
        description: '',
        price: 0.0,
        quantity: 5,
        optionLists: [],
    });

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const saveChecklist = (checklist) => {
        menuItemObject.optionLists.push({title: checklist.title, items: checklist.items});
    }

    const receiveQuantity = (value) => {
        setMenuItemObject({...menuItemObject, ['quantity']: value});
    };

    const receiveImage = (image) => {
        setMenuItemObject({...menuItemObject, ['image']: image});
    }

    const setTitle = (titleText) => {
        setMenuItemObject({...menuItemObject, ['title']: titleText});
        console.log(menuItemObject)
    }

    const setDescription = (descriptionText) => {
        setMenuItemObject({...menuItemObject, ['description']: descriptionText});
    }

    const setPrice = (priceText) => {
        setMenuItemObject({...menuItemObject, ['price']: parseFloat(priceText)});
    }

    const onClickAddItem = () => {
        let menuRef = dbRef.child(`Menus/${menuID}/menuItems`).push();
        menuRef.set({
            'title': menuItemObject.title,
            'image': menuItemObject.image,
            'description': menuItemObject.description,
            'price': menuItemObject.price,
            'quantity': menuItemObject.quantity,
            'optionLists': menuItemObject.optionLists
        });
        console.log(menuItemObject.title + ' pushed to the menu.');
        navigation.navigate('MenuScreen', {menuID: menuID});
    }

  return (
    <View>
        <Header></Header>
      <View style={styles.mainView}>
        <Text style={styles.title}>Add Item</Text>
        <CustomImagePicker receiveImage={receiveImage} width={200} height={180}/>
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
                menuItemObject.optionLists.map((item, index) => {
                  console.log(item);
                  return <Text key={index}>- {item.title}</Text>;
                })
              }
            </View>
              <Button title={"add option list"} onPress={toggleModal}></Button>
          </View>
        </View>
        <View>
            <Button title={"Add Item"} onPress={onClickAddItem}></Button>
        </View>
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
