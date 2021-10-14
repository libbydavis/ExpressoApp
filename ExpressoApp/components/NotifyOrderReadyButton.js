import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {firebaseDB} from "../firebase/FirebaseConfig";


class NotifyOrderReadyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    updateItem() {
        let updatedItem = this.props.onClick();
        this.setState({recipient: updatedItem.recipient, orderNum: updatedItem.orderNumber});
    }

    async notifyCustomer() {
        this.updateItem();
        console.log(this.state.recipient);
        let messageRef = firebaseDB.ref('users/' + this.state.recipient).child('orderNum').set(this.state.orderNum)
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
