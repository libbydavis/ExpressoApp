import {
    KeyboardAvoidingView,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Alert,
} from "react-native";
import React, {useState} from "react";
import ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";
import CheckListTask from "./ChecklistTask";
import ExpressoButton from "../../customComponents/ExpressoButton";

const CreateOptionListModal = (props) => {
    const [checklistTitle, setChecklistTitle] = useState();
    const [checklistItems, setChecklistItems] = useState([]);
    const [checklistTask, setChecklistTask] = useState();

    const handleDeleteItem = (index) => {
        const checklistItemsCopy = [...checklistItems];
        checklistItemsCopy.splice(index, 1);
        setChecklistItems(checklistItemsCopy);
        console.log(checklistItems);
    };

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
            props.saveChecklist({title: checklistTitle, items: checklistItems});
            setChecklistTitle(null);
            setChecklistItems([]);
            props.toggle();
        } else if (checklistTitle == undefined) {
            Alert.alert('Enter a checklist title to continue');
        } else if (checklistItems == 0) {
            Alert.alert('Enter at least one option to continue');
        }
    };

    const discardNewChecklist = () => {
        setChecklistTitle(null);
        setChecklistItems([]);
        props.toggle();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.seeModal}
            onRequestClose={() => {props.toggle()}}
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
                            <ExpressoButton title={"add"} onPress={handleChecklistTaskAdd}></ExpressoButton>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.optionBottomButtons}>
                    <ExpressoButton title={"add option list"} onPress={handleNewChecklist}></ExpressoButton>
                    <TouchableOpacity
                        style={styles.discardButton}
                        onPress={() => discardNewChecklist()}
                    >
                        <Text style={styles.expressoButtonText}>discard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
    optionBottomButtons: {
        flexDirection: 'row',
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
})

export default CreateOptionListModal;
