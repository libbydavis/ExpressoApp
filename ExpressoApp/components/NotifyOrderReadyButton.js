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
        messaging().requestPermission().then(r => console.log("permitted to send"))
        //this.updateItem()
        //messaging().sendMessage(this.state).then(r => console.log("done"));

        let headers = new Headers({
            "Content-Type": "application/json",
            Authorization: "key=" + Config.FIREBASE_API,
        })

        let response = await fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers,
            body: JSON.stringify(this.state),
        });
        response = await response.json()
        console.log(response)
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
