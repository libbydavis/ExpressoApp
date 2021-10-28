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
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ExpressoButton from '../../components/Button';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import Order from './Order';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from "../../components/Header";
//Refreshing Timer
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const OrdersScreen = props => {
  const uid = firebaseAuth.currentUser.uid;
  const navigation = props.navigation;
  const [orderTime, setOrderTime] = useState(() => new Date().toLocaleString());
  const [showTimePicker, setShowTimePicker] = useState(() => false);
  const [orderList, setOrderList] = useState(() =>
    getInitialOrdersFromFirebase(),
  );

  useEffect(() => {
    setOrdersFromFirebase();
  }, []);

  //get initial orders[] from Firebase
  function getInitialOrdersFromFirebase() {
    let orders = [];
    firebaseDB
      .ref()
      .child('orders')
      .orderByChild('business')
      .equalTo(uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          orders = iterateOrders(snapshot.val());
          if (typeof orders !== 'undefined') {
            return orders;
          }
        } else {
          console.log('No data available');
          return orders;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Sets orderList as latest firebase orders
  function setOrdersFromFirebase() {
    let orders = [];
    firebaseDB
      .ref()
      .child('orders')
      .orderByChild('business')
      .equalTo(uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          orders = iterateOrders(snapshot.val());
          if (typeof orders !== 'undefined') {
            setOrderList(orders);
          }
        } else {
          console.log('No data available');
          setOrderList([]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Loops through JSON objects and returns an array of objects (orders)
  const iterateOrders = snapshot => {
    //Mutable variables used to temporarily store incoming details
    let objectID = '';
    let orderID = '';
    let business = '';
    let orderTime = '';
    let customer = '';
    let menuItems = [];
    let orders = [];
    console.log('iterateOrders');

    //incoming parameter snapshot is snapshot of orders from /orders for this user
    Object.keys(snapshot).forEach(key => {
      //push id of one order (starts with '-Masjdassd' something long and wild)
      objectID = key;
      console.log(key + ' : ' + snapshot[key]);

      //Save orderDetails (The details of one order)
      let orderDetails = snapshot[key];
      Object.keys(orderDetails).forEach(orderKey => {
        //Save details that are stored
        console.log('second loop');
        console.log(orderKey + ' : ' + orderDetails[orderKey]);
        if (typeof orderDetails[orderKey] === 'object') {
          //orderDetails contains menuItems which is another object so we save and loop the menuItemsObject
          let menuItemsObject = orderDetails[orderKey];
          Object.keys(menuItemsObject).forEach(menuItemsKey => {
            //Push menuItems to the menuItems[]
            console.log(menuItemsKey + ' : ' + menuItemsObject[menuItemsKey]);
            menuItems.push({
              title: menuItemsKey,
              quantity: menuItemsObject[menuItemsKey],
            });
          });
        } else {
          //Non objects are our other key values, orderTime, orderID, and Business(userid)
          if (orderKey === 'orderTime') {
            orderTime = orderDetails[orderKey];
            orderTime = orderTime.slice(11, 16);
          } else if (orderKey === 'orderId') {
            orderID = orderDetails[orderKey];
          } else if (orderKey === 'business') {
            business = orderDetails[orderKey];
          } else if (orderKey === 'customer') {
            customer = orderDetails[orderKey];
          }
        }
      });

      //Given we found menuItems while looping, add the order to the orders[]
      if (menuItems.length > 0) {
        let order = {
          customer: customer,
          orderId: orderID,
          menuItems: menuItems,
          business: firebaseAuth.currentUser.uid,
          objectId: objectID,
          orderTime: orderTime,
        };
        orders.push(order);
      }
      //End of snapshot loop, reset tempVariables and loop again.
      console.log(
        `Menu Items: ${menuItems}\n objectID: ${objectID}\n orderID:  ${orderID}`,
      );
      //Set for adding order
      // ToastAndroid.show('Set Order ', ToastAndroid.SHORT);
      setNextOrderId(orderID);
      menuItems = [];
      orderTime = '';
      objectID = '';
      orderID = '';
      business = '';
      customer = '';
    });
    console.log(orders);
    return orders;
  };

  //Refresh Control - refreshing is set as true when refreshing false when it stops
  // The refresh setsOrderList as the latest firebase orders
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setOrdersFromFirebase();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const shouldResetOrderList = refreshing && orderList.length > 0;
  // useEffect(() => {
  //     console.log('test length: ' + orderList.length);
  //     if (shouldResetOrderList) setRefreshing(false);
  // }, [shouldResetOrderList]);


  //Return rendered OrdersScreen component
  return (
    <View>
      <Header></Header>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Text style={styles.title}>Orders</Text>
        </View>
        {
          //Displays user's orderList or default text
          typeof orderList !== 'undefined' && orderList.length > 0 ? (
            orderList.map((order, index) => {
              return <Order key={index} order={order} />;
            })
          ) : (
            <Text>No orders at the moment!</Text>
          )
        }

        <ExpressoButton
          onPress={() => setShowTimePicker(true)}
          title={'Pickup Time'}
        />
        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'time'}
            display={'clock'}
            minuteInterval={10}
            onChange={(e, selectedTime) => {
              console.log(selectedTime);
              setOrderTime(selectedTime);
              setShowTimePicker(false);
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

//Custom Styles
const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  title: {
    fontFamily: 'Monserrat-Bold',
    color: '#25a2af',
    fontSize: 35,
    margin: 10,
  },
  expressoButton: {
    backgroundColor: '#25a2af',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  expressoButtonText: {
    color: '#ffffff',
  },
});
