/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import Config from "react-native-config";
import messaging from "@react-native-firebase/messaging";


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});

//TODO: add token to async storage, then push this to firebase when the user logs in

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);

        if (notification.foreground) {
            PushNotification.localNotification({
                channelId: "fcm_fallback_notification_channel",
                title: notification.title,
                message: notification.message
            })
        }

        // required on iOS only
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // Android only
    senderID: Config.SENDER_ID,
    // iOS only
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
});

AppRegistry.registerComponent(appName, () => App);

