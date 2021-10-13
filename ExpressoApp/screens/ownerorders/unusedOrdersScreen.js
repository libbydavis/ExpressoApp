import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import Order from './Order';
import {firebaseDB, firebaseAuth} from '../../firebase/FirebaseConfig';
import * as Animatable from 'react-native-animatable';
import 'firebase/auth';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function OwnerOrdersScreen({navigation}) {
    const [returnedOrderID, setReturnedOrderID] = useState('');
    const [orderList, setOrderList] = useState('');
    const [userBusinessID, setUserBusinessID] = useState(firebaseAuth.currentUser.uid); // get this from firebase user's auth.id
    const [errorText, setErrorText] = useState('');
    const dbRef = firebaseDB.ref();
    const rightNow = new Date();
    const [refreshing, setRefreshing] = React.useState(false);
    const [orderId, setOrderId] = useState(() => getInitialOrderId());

    function getInitialOrderId() {
        let initialId = 500;
        //get from firebase once
        return initialId;
    }

    function setNextOrderId() {
        setOrderId(prevOrderId => prevOrderId + 1);
    }

    const onRefresh = React.useCallback(() => {
        setOrderList('');
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function createOrderId() {
        const orderID = 'XXD127';

        dbRef.child('orders').get().then((snapshot) => {
            if (snapshot.exists()) {
                setReturnedOrderID(snapshot.val().key);
            } else {
                setErrorText('No orders at the moment :(');
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });

        setReturnedOrderID(orderID);
        return orderID;
    }

    useEffect((orderList) => {
        // if (returnedOrderID) {
        //   setReturnedOrderID();
        // }

        dbRef.child('orders')
            .orderByChild('business')
            .equalTo(firebaseAuth.currentUser.uid)
            .get().then((snapshot) => {
            if (snapshot.exists()) {
                if (!orderList) {
                    setOrderList(iterateOrders(snapshot.val()));
                }
            } else {
                setErrorText('No orders at the moment :(');
                console.log('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });

        let currentID = '';
        let menuItems = [];
        let orderTime = '';
        const orders = [];
        const iterateOrders = (obj) => {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] != 'object') {
                    if (key === 'orderTime') {
                        orderTime = obj[key];
                    } else {
                        menuItems.push({title: key, quantity: obj[key]});
                    }
                } else {
                    currentID = key;
                    iterateOrders(obj[key]);

                    if (menuItems) {
                        const order = {
                            orderId: orderId,
                            objectId: key,
                            menuItems: menuItems,
                            orderTime: orderTime,
                        };

                        orders.push(<Order key={currentID} order={order}/>);
                        setNextOrderId();
                    }
                    menuItems = [];
                    orderTime = '';
                }
            });
            return orders;
        };
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
            <TouchableOpacity style={styles.navBar}
                              onPress={() => navigation.navigate('SearchScreen')}>
                <Image
                    source={require('../../assets/ExpressoLogo.png')}
                    style={styles.headerIcon}
                />
            </TouchableOpacity>

            <View>
                <Text style={styles.mainTitle}>Orders</Text>
            </View>


            <Animatable.View animation="fadeInLeft"
                             duration={500} style={styles.orders}>
                {
                    // If the orderList has objects then
                    // return the list of Orders else show nothing
                    orderList ? orderList :
                        <View>
                            <Text>There are no orders at the moment!</Text>
                            <Text>Check back later.</Text>
                        </View>
                }
            </Animatable.View>

            <TouchableOpacity style={styles.expressoButton} onPress={() => {
                createOrderId();
                firebaseDB.ref('orders/' + createOrderId())
                    .push({
                        Burger: 12,
                        Fries: 12,
                        Soda: 12,
                        Hotdog: 12,
                        business: firebaseAuth.currentUser.uid,
                        orderTime: rightNow.toLocaleTimeString('en-US'),
                    })
                    .then(() => {
                        // Data saved successfully!
                        console.log(`Order was added.`);
                    })
                    .catch((error) => {
                        // The write failed...
                        setErrorText('Order was not added :(');
                        console.log(`Order was not added. ` +
                            error.message);
                    });
            }}>
                <Text style={styles.expressoButtonText}>Add new Order</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{errorText}</Text>
        </ScrollView>
    );
};

export default OwnerOrdersScreen;

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
        backgroundColor: 'red',
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
