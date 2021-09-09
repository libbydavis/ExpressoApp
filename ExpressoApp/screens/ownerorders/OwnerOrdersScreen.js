import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView, TouchableOpacity,
} from 'react-native';
import Order from './Order';
import {firebaseDB} from '../../firebase/FirebaseConfig';
import * as Animatable from 'react-native-animatable';
import 'firebase/auth';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function OwnerOrdersScreen({navigation}) {
  const [orderList, setOrderList] = useState('');
  const userBusinessID = 'WeBsW6eDlpZmTl9muQkgFcpv2kE2'; // get this from firebase user's auth.id
  const dbRef = firebaseDB.ref();

  useEffect(() => {
    dbRef.child('Orders')
        .orderByChild('business')
        .equalTo(userBusinessID)
        .get().then((snapshot) => {
          if (snapshot.exists()) {
            if (!orderList) {
              setOrderList(iterateOrders(snapshot.val()));
            }
          } else {
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
            const props = {
              transactionID: currentID,
              menuItems: menuItems,
              orderTime: orderTime,
            };

            orders.push(
                // eslint-disable-next-line max-len
                <Order Key={currentID} props={props}/>,
            );
          }
          menuItems = [];
          orderTime = '';
        }
      });
      return orders;
    };
  });

  return (
    <View style={styles.mainView}>
      <TouchableOpacity style={styles.navBar}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Image
          source={require('../../assets/ExpressoLogo.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.mainTitle}>Orders</Text>
        <Animatable.View animation="fadeInLeft" duration={500} style={styles.orders}>
          { // If the orderList has objects then return the list of Orders else show nothing
            orderList ? orderList : <Text>There are no orders at the moment!</Text>}
        </Animatable.View>
      </ScrollView>
    </View>
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
    fontSize: 36,
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
    marginLeft: 15,
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
