import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ScrollView,
  PlatformConstants,
} from 'react-native';
import Order from './Order';
import {firebaseDB, firebaseAuth} from '../../firebase/FirebaseConfig';
import firebase from 'firebase';
import {ref} from '@react-native-firebase/database';
import 'firebase/auth';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function OwnerOrdersScreen({navigation}) {
  const [orderList, setOrderList] = useState([]);

  const dbRef = firebaseDB.ref();
  dbRef.child('businesses').child('awGVAfo69qcL4uBMsxBtWuL0Ml52')
      .get().then((snapshot) => {
        if (snapshot.exists()) {
          const orders = snapshot.val().orders;
          console.log(orders);
          iterateOrders(orders);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error(error);
      });

  // https://stackoverflow.com/questions/8085004/iterate-through-nested-javascript-objects
  let currentID;
  const orders = [];
  const items = {items: []};
  const iterateOrders = (obj) => {
    Object.keys(obj).forEach((key) => {
      // console.log(`key: ${key}, value: ${obj[key]}`);

      if (typeof obj[key] != 'object') {
        items.items.push({title: key, quantity: obj[key]});
      } else {
        currentID = key;
        iterateOrders(obj[key]);
        if (items.items) {
          orders.push(<Order props=
            {
              {
                title: currentID,
                items: items,
              }
            }>
          </Order>,
          );
        }
        items.items = [];
      }
    });
  };
  console.log(orders);
  // setOrderList(orders);
  // const createOrders = (orders) => {
  //   for (const property in orders) {
  //     orderList.push(<Order key={index} props=
  //       {
  //         {
  //           title: property,
  //           items: [
  //             {
  //               title: orders[property].property, quantity: orders[property].property[i],
  //             },
  //             {
  //               title: 'Fries', quantity: Math.round((Math.random() * 2 )+ 1),
  //             },
  //           ],
  //           time: '11:' + Math.round((Math.random() * 2 )+ 10) + 'pm',
  //         }
  //       }>
  //     </Order>,
  //     );
  //   }
  // };

  return (
    <View style={styles.mainView}>
      <View style={styles.navBar}>
        <Image
          source={require('../../assets/ExpressoLogo.png')}
          style={styles.headerIcon}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.mainTitle}>Current Orders</Text>
        <View style={styles.orders}>
          { orderList }
        </View>
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
