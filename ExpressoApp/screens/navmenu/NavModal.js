import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity} from "react-native";

const NavModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            style={styles.modal}
        >
           <TouchableOpacity>
               <Text style={styles.text}>Cart</Text>
           </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modal: {
        width: 100,
        height: 200,
        alignContent: 'center'
    },
    text: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
    }
})

export default NavModal;
