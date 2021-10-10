import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert,
    Image,
    ToastAndroid
} from 'react-native';
import {firebaseDB} from '../../firebase/FirebaseConfig';
import '../../assets/orderTick.png';
import '../../assets/orderTickFilled.png';

function Order(props) {
    const menuItemList = [];
    const menuItems = props.order.menuItems;
    const orderId = props.order.orderId;
    const orderTime = props.order.orderTime;
    const objectId = props.order.objectId;
    const customer = props.order.customer;
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

    const completeOrder = () =>
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
        ref.child('orders/' + objectId).remove()
            .then(() => {
                ToastAndroid.show('Order completed!', ToastAndroid.SHORT);
            }).catch((error) => {
            console.log(error.message);
            ToastAndroid.show('Order could not be completed', ToastAndroid.SHORT);
        });
    };

    return (
        <View style={styles.order}>
            <View style={styles.column}>
                <Text style={styles.title}>ID: {orderId}</Text>
                {menuItemList}
                <Text style={styles.list}>Customer: {customer}</Text>
                <Text style={styles.list}>Time: {orderTime}</Text>
            </View>
            <TouchableOpacity style={styles.tickButton} onPress={() => {
                completeOrder();
            }}>
                <Image
                    source={require('../../assets/orderTick.png')}
                    style={styles.tick}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    order: {
        borderRadius: 10,
        padding: 10,
        margin: 7,
        flexGrow: 2,
        backgroundColor: '#29b79c',
        alignSelf: 'stretch',
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

export default Order;
