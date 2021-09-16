import React, {useState, useEffect} from 'react';
import {
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ToastAndroid,
    Button
} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import Order from './Order';
//Refreshing Timer
const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OrdersScreen = (props) => {
    const uid = firebaseAuth.currentUser.uid;
    const navigation = props.navigation;
    const rightNow = new Date();
    const [orderList, setOrderList] = useState(() => getInitialOrdersFromFirebase());
    const [orderId, setOrderId] = useState(() => getInitialOrderId());

    useEffect(() => {
    }, []);

    function getInitialOrderId() {
        let initialId = 500;
        //get from firebase once
        return initialId;
    }

    function setNextOrderId() {
        setOrderId(prevOrderId => prevOrderId + 1);
    }

    function getInitialOrdersFromFirebase() {

        let orders = [];
        firebaseDB.ref().child('orders')
            .orderByChild('business')
            .equalTo(uid)
            .get().then((snapshot) => {
            if (snapshot.exists()) {
                orders = iterateOrders(snapshot.val());
                if (typeof orders !== 'undefined') {
                    return (orders);
                } else {
                    return ([]);
                }
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    function setOrdersFromFirebase() {
        let orders = [];
        firebaseDB.ref().child('orders')
            .orderByChild('business')
            .equalTo(uid)
            .get().then((snapshot) => {
            if (snapshot.exists()) {
                orders = iterateOrders(snapshot.val());
                if (typeof orders !== 'undefined') {
                    setOrderList(orders);
                } else {
                    setOrderList([]);
                }
            } else {
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    const iterateOrders = (obj) => {
        let objectID = '';
        let orderID = '';
        let business = '';
        let orderTime = '';
        let menuItems = [];
        let orders = [];

        Object.keys(obj).forEach((key) => {

                console.log(key + ' : ' + obj[key]);

                if (typeof obj[key] != 'object') {
                    if (key === 'orderTime') {
                        orderTime = obj[key];
                    } else if (key === 'orderId') {
                        orderID = obj[key];
                    } else if (key === 'business') {
                        business = obj[key];
                    }
                } else {
                    if (key === 'menuItems') {
                        Object.keys(obj).forEach((key) => (menuItems.push({title: key, quantity: obj[key]})));
                    }
                    objectID = key;

                    if (menuItems.length > 0) {
                        // console.log('objectID: ' + objectID);
                        // console.log('orderID: ' + orderID);
                        // console.log('key: ' + key);
                        let order = {
                            orderId: orderID,
                            menuItems: menuItems,
                            business: firebaseAuth.currentUser.uid,
                            objectId: objectID,
                            orderTime: orderTime,
                        };
                        orders.push(order);
                        menuItems = [];
                        orderTime = '';
                        objectID = '';
                        orderID = '';
                    } else console.log(`Menu Items: ${menuItems}\n objectID: ${objectID}\n orderID:  ${orderID}`);
                }
            }
        );
        console.log(orders);
        return orders;
    };

//Refresh Control
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setOrdersFromFirebase();
        if (orderList) {
            console.log('!orderlist 112');
            wait(2000).then(() => setRefreshing(false));
        } else {
            ToastAndroid.show('No new orders', ToastAndroid.SHORT);
            wait(1000).then(() => setRefreshing(false));
        }
        if (!refreshing) {
            console.log('!refreshing 119');
            wait(2000).then(() => setRefreshing(false));
        }
    }, []);

    // const shouldResetOrderList = refreshing && orderList.length > 0;
    // useEffect(() => {
    //     console.log('test length: ' + orderList.length);
    //     if (shouldResetOrderList) setRefreshing(false);
    // }, [shouldResetOrderList]);

    function addOrderToDatabase() {
        let myMenuItems = {burger: 2, Coke: 3};
        firebaseDB.ref('orders/').push({
            orderId: orderId,
            myMenuItems,
            business: firebaseAuth.currentUser.uid,
            orderTime: rightNow.toLocaleString('en-US'),
        }).then(() => {
            console.log('addOrderToDatabase resolve');
            setNextOrderId();
        }).catch((error) => {
            console.log('Was not added' + error.message);
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <TouchableOpacity style={styles.navBar} onPress={() => navigation.navigate('SearchScreen')}>
                <Image source={require('../../assets/ExpressoLogo.png')} style={styles.headerIcon}/>
            </TouchableOpacity>

            <View>
                <Text style={styles.mainTitle}>Orders</Text>
            </View>
            <>
                {
                    typeof orderList !== 'undefined' && orderList.length > 0 ?
                        orderList.map((order, index) => {
                            return (<Order key={index} order={order}></Order>)
                        }) : () => {
                            return (<Text>No orders at the moment!</Text>)
                        }
                }
            </>

            <TouchableOpacity style={styles.expressoButton} onPress={addOrderToDatabase}>
                <Text>Add New Order</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

export default OrdersScreen;

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    mainTitle: {
        fontFamily: 'Monserrat-Regular',
        color: '#25a2af',
        fontSize: 35,
    },
    scrollView: {
        marginHorizontal: 20,
        // backgroundColor: '#ffffff',
        marginBottom: 30,
        paddingBottom: 100,
        alignItems: 'center',
    },
    orders: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    navBar: {
        marginBottom: 15,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    headerIcon: {
        width: 200,
        height: 50,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 50,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    discardButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
    imagePicker: {
        backgroundColor: '#FF0000',
    },
    inputChecklist: {
        flexDirection: 'row',
        marginTop: 10,
    },
    enterOptionText: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 100,
        marginRight: 15,
    },
    enterOptionTitle: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        position: 'absolute',
        top: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    quantityElements: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBottomButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
});
