import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert,
    Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {firebaseDB} from '../../firebase/FirebaseConfig';
import '../../assets/orderTick.png';
import '../../assets/orderTickFilled.png';

// eslint-disable-next-line react/prop-types
function Order(props) {
    const navigation = useNavigation();
    const menuItemList = [];
    const menuItems = props.order.menuItems;
    const orderId = props.order.orderId;
    const orderTime = props.order.orderTime;
    const objectId = props.order.objectId;
    const ref = firebaseDB.ref();

    if (menuItems.length > 0) {
        menuItems.map((menuItem, index) => {
            if (menuItem.title != 'business') {
                menuItemList.push(
                    <Text key={index} style={styles.list}>
                        {menuItem.title} x {menuItem.quantity}
                    </Text>,
                );
            }
        });
    }

    const createCompleteOrderAlert = () =>
        Alert.alert(
            'Complete and Remove Order',
            `Are you sure order ${orderId} is complete?`,
            [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
                {
                    text: 'Complete',
                    onPress: () => {
                        deleteOrder();
                    },
                },
            ],
        );

    const deleteOrder = () => {
        ref.child('Orders/' + objectId).remove()
            .then(() => {
                console.log('removed ' + objectId);
            }).catch((error) => {
            console.error('Something went wrong ' + error);
        });
    };

    return (

        <View style={styles.order}>
            {
                () => {
                    console.log('objectID internal: ' + objectId);
                    console.log('orderID internal: ' + orderId);
                }
            }
            <View style={styles.column}>
                <Text style={styles.title}>ID: {orderId}</Text>
                {menuItemList}
                <Text style={styles.list}>Time: {orderTime}</Text>
            </View>
            <TouchableOpacity style={styles.tickButton} onPress={() => {
                createCompleteOrderAlert();
            }}>
                <Image
                    source={require('../../assets/orderTick.png')}
                    style={styles.tick}
                />
            </TouchableOpacity>
        </View>
    )
        ;
};

export default Order;

const styles = StyleSheet.create({
    order: {
        borderRadius: 10,
        padding: 10,
        margin: 7,
        flexGrow: 2,
        backgroundColor: '#29b79c',
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        borderRadius: 10,
    },
    list: {
        color: '#ffffff',
        textAlign: 'left',
        fontSize: 18,
    },
    tickButton: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    tick: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
    column: {
        flexDirection: 'column',
    },
});


