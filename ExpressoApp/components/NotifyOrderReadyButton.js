import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {firebaseDB} from "../firebase/FirebaseConfig";


class NotifyOrderReadyButton extends Component {
    constructor(props) {
        super(props);
    }

    async notifyCustomer() {
        let updatedItem = this.props.onClick();
        let messageRef = firebaseDB.ref('users/' + updatedItem.recipient).child('orderNum').set(updatedItem.orderNumber)
            .then(r => console.log(messageRef));
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.notifyCustomer()}>
                <Text>Order Ready</Text>
            </TouchableOpacity>
        );
    }
}

export default NotifyOrderReadyButton;
