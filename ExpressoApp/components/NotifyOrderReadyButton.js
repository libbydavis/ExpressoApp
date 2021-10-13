import React, {Component, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import messaging from "@react-native-firebase/messaging";
import Config from "react-native-config";


class NotifyOrderReadyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registration_ids: [
                "fSnZ0xl2TsW9oO_gvDaLga:APA91bHuqngVZquDTa_Vt62yfxLNCZi-So__IzhP4NT-LtoFvaZx3iYxzDaWC-sx072KHh_dwgxhc7M20zkDb8W5xC1wJO16vJvNWtx__CZw1Pn_n0pBv2FdwEJL7RJevR0n76X6xTqK",
            ],
            notification: {
                title: "Order Ready",
                body: "Bobby your order is ready for pickup",
                vibrate: 1,
                sound: 1,
                show_in_foreground: true,
                priority: "high",
                content_available: true,
            },
        }
    }

    updateItem() {
        console.log("dog")
        let updatedItem = this.props.onClick();
        this.setState({...this.state, ['orderName']: updatedItem.orderName, ['orderNo']: updatedItem.orderNo, ['token']: updatedItem.token});
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
