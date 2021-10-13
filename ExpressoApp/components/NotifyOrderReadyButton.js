import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {firebaseDB} from "../firebase/FirebaseConfig";


class NotifyOrderReadyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            message: '',
        }
    }

    updateItem() {
        console.log("dog")
        let updatedItem = this.props.onClick();
        let message = 'Your order is ready: ' + updatedItem.orderNumber;
        this.setState({...this.state, ['recipient']: updatedItem.recipient, ['message']: message});
    }

    async notifyCustomer() {
        this.updateItem();
        let messageRef = firebaseDB.ref().child(`users/${this.state.recipient}/message`).push();
        messageRef.set({
            'message': this.state.message
        }).then(r => console.log("pushed message"));
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
