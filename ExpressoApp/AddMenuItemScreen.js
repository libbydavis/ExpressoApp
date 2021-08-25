import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal } from "react-native";
import QuantityInput from './QuantityInput';
import CustomImagePicker from "./CustomImagePicker";
import firebase from 'firebase';

const AddMenuItemScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <Image source={require('./assets/ExpressoLogo.png')} style={styles.headerIcon}></Image>
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
                                <TextInput placeholder="option title"></TextInput>
                                <TouchableOpacity style={styles.expressoButton} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.expressoButtonText}>add</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <TouchableOpacity style={styles.expressoButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.expressoButtonText}>add options</Text>
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
})


export default AddMenuItemScreen;
