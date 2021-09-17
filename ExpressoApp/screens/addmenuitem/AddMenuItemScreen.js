import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import QuantityInput from './QuantityInput';
import CustomImagePicker from './CustomImagePicker';
import CheckListTask from './ChecklistTask';
import ToastAndroid from 'react-native/Libraries/Components/ToastAndroid/ToastAndroid';
import {firebaseDB} from "../../firebase/FirebaseConfig";

const AddMenuItemScreen = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [checklistTask, setChecklistTask] = useState();
    const [checklistItems, setChecklistItems] = useState([]);
    const [checklistTitle, setChecklistTitle] = useState();
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

    const handleChecklistTaskAdd = () => {
        if (checklistTask != undefined) {
            setChecklistItems([...checklistItems, checklistTask]);
            setChecklistTask(null);
        } else {
            ToastAndroid.show('Type an option to add to the list',
                ToastAndroid.SHORT);
        }
    };

    const handleNewChecklist = () => {
        if (checklistTitle != undefined && checklistItems.length > 0) {
            setModalVisible(!modalVisible);
            menuItemObject.optionLists.push({title: checklistTitle, items: checklistItems});
            setChecklistTitle(null);
            setChecklistItems([]);
        } else if (checklistTitle == undefined) {
            Alert.alert('Enter a checklist title to continue');
        } else if (checklistItems == 0) {
            Alert.alert('Enter at least one option to continue');
        }
    };

    const discardNewChecklist = () => {
        setModalVisible(!modalVisible);
        setChecklistTitle(null);
        setChecklistItems([]);
    };

    const handleDeleteItem = (index) => {
        const checklistItemsCopy = [...checklistItems];
        checklistItemsCopy.splice(index, 1);
        setChecklistItems(checklistItemsCopy);
        console.log(checklistItems);
    };

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
      <View style={styles.navBar}>
        <Image
          source={require('../../assets/ExpressoLogo.png')}
          style={styles.headerIcon}
        />
        <TouchableOpacity onPress={() => {navigation.navigate('Cart')}}>
          <Image source={require('../../assets/carticon.png')} style={styles.cartIcon}/>
        </TouchableOpacity>
      </View>
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <TextInput
                  style={styles.enterOptionTitle}
                  value={checklistTitle}
                  placeholder="option title"
                  onChangeText={(text) => setChecklistTitle(text)}/>
                <View>
                  <View>
                    {
                      checklistItems.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => handleDeleteItem(index)}
                          >
                            <CheckListTask key={index} text={item}/>
                          </TouchableOpacity>
                        );
                      })
                    }
                  </View>
                  <KeyboardAvoidingView>
                    <View style={styles.inputChecklist}>
                      <TextInput
                        placeholder="Enter option"
                        value={checklistTask}
                        onChangeText={(text) => setChecklistTask(text)}
                        style={styles.enterOptionText}
                      />
                      <TouchableOpacity
                        onPress={() =>handleChecklistTaskAdd()}
                        style={styles.expressoButton}
                      >
                        <Text style={styles.expressoButtonText}>add</Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.optionBottomButtons}>
                  <TouchableOpacity
                    style={styles.expressoButton}
                    onPress={() => handleNewChecklist()}
                  >
                    <Text style={styles.expressoButtonText}>
                        add option list
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.discardButton}
                    onPress={() => discardNewChecklist()}
                  >
                    <Text style={styles.expressoButtonText}>discard</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View>
              <Text style={styles.expressoLabel}>Option Lists</Text>
              {
                menuItemObject.optionLists.map((item, index) => {
                  console.log(item);
                  return <Text key={index}>- {item.title}</Text>;
                })
              }
            </View>
            <TouchableOpacity
              style={styles.expressoButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.expressoButtonText}>add option list</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
            <TouchableOpacity style={styles.expressoButton}>
                <Text style={styles.expressoButtonText} onPress={() => onClickAddItem()}>Add Item</Text>
            </TouchableOpacity>
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
    navBar: {
        marginBottom: 15,
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        width: 200,
        height: 50,
        marginLeft: 15,
    },
    cartIcon: {
        width: 40,
        height: 40,
        marginTop: 8,
        marginRight: 10,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
    discardButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
    imagePicker: {},
    inputChecklist: {
        flexDirection: 'row',
        marginTop: 10,
    },
    enterOptionText: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 100,
        marginRight: 15,
    },
    enterOptionTitle: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        position: 'absolute',
        top: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    quantityElements: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBottomButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
});


export default AddMenuItemScreen;
