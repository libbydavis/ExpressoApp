import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, KeyboardAvoidingView } from "react-native";
import QuantityInput from '../components/QuantityInput';
import CustomImagePicker from "../components/CustomImagePicker";
import firebase from 'firebase';
import CheckListTask from "../components/ChecklistTask";

const AddMenuItemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [checklistTask, setChecklistTask] = useState();
    const [checklistItems, setChecklistItems] = useState([]);
    const [checklistTitle, setChecklistTitle] = useState();
    let optionChecklists = [];

    const handleChecklistTaskAdd = () => {
        setChecklistItems([...checklistItems, checklistTask]);
        setChecklistTask(null);
    }

    const handleNewChecklist = () => {
        setModalVisible(!modalVisible);
        optionChecklists = [...optionChecklists, {title: checklistTitle, items: checklistItems}];
        console.log(optionChecklists);
        setChecklistTitle(null);
        setChecklistItems([]);
    }

    return(
        <View>
            <Image source={require('../assets/ExpressoLogo.png')} style={styles.headerIcon}></Image>
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
                        <View>
                            <Text>quantity</Text>
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
                                <TextInput style={styles.enterOptionText} value={checklistTitle} placeholder="option title" onChangeText={(text) => setChecklistTitle(text)}></TextInput>
                                <View>
                                    <View>
                                        {
                                            checklistItems.map((item, index) => {
                                                return <CheckListTask key={index} text={item}/>
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
                                <TouchableOpacity style={styles.expressoButton} onPress={() => handleNewChecklist()}>
                                    <Text style={styles.expressoButtonText}>add option list</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <View>
                            {
                                optionChecklists.map((item, index) => {
                                    return <Text key={index} text={item.title}/>
                                })
                            }
                        </View>
                        <TouchableOpacity style={styles.expressoButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.expressoButtonText}>add option</Text>
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
    headerIcon: {
        width: 200,
        height: 50,
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
    expressoButtonText: {
        color: '#ffffff',
    },
    imagePicker: {
      backgroundColor: 'red',
    },
    inputChecklist: {
      flexDirection: "row",
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
})


export default AddMenuItemScreen;
