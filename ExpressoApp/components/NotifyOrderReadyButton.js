import React from 'react';
import {View} from "react-native";
import Button from "./Button";


class NotifyOrderReadyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: 0
        }

    }

    initialise() {
        // Node.js
        var admin = require('firebase-admin');

        // Initialize Firebase
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
        });

        async function sendMessage() {
            // Fetch the tokens from an external datastore (e.g. database)
            const tokens = await getTokensFromDatastore();

            // Send a message to devices with the registered tokens
            await admin.messaging().sendMulticast({
                tokens, // ['token_1', 'token_2', ...]
                data: { hello: 'world!' },
            });
        }

        // Send messages to our users
        sendMessage();
    }

    async notifyCustomer() {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Order #' + this.state.orderNo,
            body: 'Main body content of the notification',
            android: {
                channelId,
                smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            },
        });
    }

    render() {
        return (
            <View>
                <Button title={"order ready"} onPress={this.notifyCustomer}></Button>
            </View>
        );
    }
}

export default NotifyOrderReadyButton;
