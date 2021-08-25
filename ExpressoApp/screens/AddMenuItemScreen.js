import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Modal,
    KeyboardAvoidingView,
    Alert, FlatList,
} from "react-native";
import QuantityInput from '../components/QuantityInput';
import CustomImagePicker from "../components/CustomImagePicker";
import firebase from 'firebase';
import CheckListTask from "../components/ChecklistTask";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

const AddMenuItemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [checklistTask, setChecklistTask] = useState();
    const [checklistItems, setChecklistItems] = useState([]);
    const [checklistTitle, setChecklistTitle] = useState();
    const [optionChecklists, setOptionChecklists] = useState([]);

    const handleChecklistTaskAdd = () => {
        if (checklistTask != undefined) {
            setChecklistItems([...checklistItems, checklistTask]);
            setChecklistTask(null);
        }
        else {
            ToastAndroid.show("Type an option to add to the list", ToastAndroid.SHORT);
        }
    }

    const handleNewChecklist = () => {
        if (checklistTitle != undefined && checklistItems.length > 0) {
            setModalVisible(!modalVisible);
            setOptionChecklists([...optionChecklists, {title: checklistTitle, items: checklistItems}]);
            console.log(optionChecklists);
            setChecklistTitle(null);
            setChecklistItems([]);
        }
        else if (checklistTitle == undefined) {
            Alert.alert("Enter a checklist title to continue");
        }
        else if (checklistItems == 0) {
            Alert.alert("Enter at least one option to continue");
        }
    }

    const discardNewChecklist = () => {
        setModalVisible(!modalVisible);
        setChecklistTitle(null);
        setChecklistItems([]);
    }

    const handleDeleteItem = (index) => {
        let checklistItemsCopy = [...checklistItems];
        checklistItemsCopy.splice(index, 1);
        setChecklistItems(checklistItemsCopy)
        console.log(checklistItems);
    }

    return(
        <View>
            <View style={styles.navBar}>
                <Image source={require('../assets/ExpressoLogo.png')} style={styles.headerIcon}></Image>
            </View>
            <View style={styles.mainView}>
                <Text style={styles.title}>Add Item</Text>
                <CustomImagePicker style={styles.imagePicker}/>
                <View style={styles.rowView}>
                    <View style={styles.columnView}>
                        <TextInput style={styles.textInput} placeholder="title" />
                        <TextInput style={styles.textInput} placeholder="description" multiline={true}/>
                        <TextInput style={styles.textInput} placeholder="price" keyboardType='decimal-pad' />
                    </View>
                    <View style={styles.columnView}>
                        <View style={styles.quantityElements}>
                            <Text style={styles.expressoLabel}>quantity</Text>
                            <View style={styles.rowView}>
                                <QuantityInput></QuantityInput>
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
                                <TextInput style={styles.enterOptionTitle} value={checklistTitle} placeholder="option title" onChangeText={(text) => setChecklistTitle(text)}></TextInput>
                                <View>
                                    <View>
                                        {
                                            checklistItems.map((item, index) => {
                                                return <TouchableOpacity key={index} onPress={() => handleDeleteItem(index)}>
                                                    <CheckListTask key={index} text={item}/>
                                                </TouchableOpacity>
                                            })
                                        }
                                    </View>
                                    <KeyboardAvoidingView>
                                        <View style={styles.inputChecklist}>
                                            <TextInput placeholder="Enter option" value={checklistTask} onChangeText={text => setChecklistTask(text)} style={styles.enterOptionText}/>
                                            <TouchableOpacity onPress={() =>handleChecklistTaskAdd()} style={styles.expressoButton}>
                                                <Text style={styles.expressoButtonText}>add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </KeyboardAvoidingView>
                                </View>
                                <View style={styles.optionBottomButtons}>
                                    <TouchableOpacity style={styles.expressoButton} onPress={() => handleNewChecklist()}>
                                        <Text style={styles.expressoButtonText}>add option list</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.discardButton} onPress={() => discardNewChecklist()}>
                                        <Text style={styles.expressoButtonText}>discard</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <View>
                            <Text style={styles.expressoLabel}>Option Lists</Text>
                            {
                                optionChecklists.map((item, index) => {
                                    return <Text key={index}>- {item.title}</Text>

                                })
                            }
                        </View>
                        <TouchableOpacity style={styles.expressoButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.expressoButtonText}>add option list</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.expressoButton}>
                        <Text style={styles.expressoButtonText}>Add Item</Text>
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
    },
    headerIcon: {
        width: 200,
        height: 50,
        marginLeft: 15,
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    rowView: {
        flexDirection: "row",
        marginTop: 20,
    },
    columnView: {
        flexDirection: "column",
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
    imagePicker: {
      backgroundColor: 'red',
    },
    inputChecklist: {
      flexDirection: "row",
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
        flexDirection: "row",
        marginTop: 10,
    },
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
})


export default AddMenuItemScreen;
