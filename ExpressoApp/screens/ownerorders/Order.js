import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import '../../assets/orderTick.png';
import '../../assets/orderTickFilled.png';
import NotifyOrderReadyButton from "../../components/NotifyOrderReadyButton";

function Order(props) {

    const menuItemList = [];
    const menuItems = props.order.menuItems;
    const orderId = props.order.orderId;
    const orderTime = props.order.orderTime;
    const customer = props.order.customer;

    const [orderNotifInfo, setOrderNotifInfo] = useState({
        recipient: props.order.customer,
        orderNumber: props.order.orderId,
        objectId: props.order.objectId
    });

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

    const returnOrderNotifInfo = () => {
        return orderNotifInfo;
    }

    return (
        <View style={styles.order}>
            <View style={styles.column}>
                <Text style={styles.title}>ID: {orderId}</Text>
                {menuItemList}
                <Text style={styles.list}>Customer: {customer}</Text>
                <Text style={styles.list}>Time: {orderTime}</Text>
            </View>
            <NotifyOrderReadyButton onClick={returnOrderNotifInfo}></NotifyOrderReadyButton>
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

    column: {
        flexDirection: 'column',
    },
});

export default Order;
