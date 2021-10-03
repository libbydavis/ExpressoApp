import React from 'react';
import {View} from "react-native";
import Button from "./Button";
import notifee from '@notifee/react-native';

class NotifyOrderReadyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: 0
        }

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
