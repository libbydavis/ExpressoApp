import React, {Component, useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet, ToastAndroid, Alert} from "react-native";
import {firebaseDB} from "../firebase/FirebaseConfig";


class NotifyOrderReadyButton extends Component {
    constructor(props) {
        super(props);
    }

    async notifyCustomer() {
        let updatedItem = this.props.onClick();
        Alert.alert(
            'Complete and Remove Order',
            `Are you sure order ${updatedItem.orderNumber} is complete?`,
            [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
                {
                    text: 'Complete',
                    onPress: () => {
                        let messageRef = firebaseDB.ref('users/' + updatedItem.recipient).child('orderNum').set(updatedItem.orderNumber)
                            .then(r => console.log(messageRef));
                        this.deleteOrder(updatedItem.objectId);
                    },
                },
            ],)
    }

    deleteOrder = (objectId) => {
        firebaseDB.ref().child('orders/' + objectId).remove()
            .then(() => {
                ToastAndroid.show('Order completed!', ToastAndroid.SHORT);
            }).catch((error) => {
            console.log(error.message);
            ToastAndroid.show('Order could not be completed', ToastAndroid.SHORT);
        });
    };

    render() {
        return (
            <TouchableOpacity onPress={() => this.notifyCustomer()} style={styles.tickButton}>
                <Image
                    source={require('../assets/orderTick.png')}
                    style={styles.tick}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tick: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
    tickButton: {
        flex: 1,
        alignSelf: 'flex-end',
    },
})

export default NotifyOrderReadyButton;
