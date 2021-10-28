import React, {useEffect, useState} from 'react';
import {TOKEN_KEY} from '@env';
import {firebaseAuth, firebaseDB} from "../firebase/FirebaseConfig";
import {requestOneTimePayment} from "react-native-paypal";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


const PaymentButton = (props) => {
    const [orderId, setOrderId] = useState(() => getInitialOrderId());

    //get
    function getInitialOrderId() {
        let initialId = 500;
        /*
        firebaseDB.ref('businesses/').once('value', (snapshot)=>{

        });

         */
        //get from firebase once
        return initialId;
    }

    //Increment orderID
    function setNextOrderId(orderID) {
        if (orderID) {
            setOrderId(orderID + 1);
        } else {
            setOrderId(prevOrderId => prevOrderId + 1);
        }
    }

    function addOrderToDatabase() {
        let menuItems = props.menuItems; //replace with the input order when using elsewhere
        firebaseDB
            .ref('orders/')
            .push({
                customer: firebaseAuth.currentUser.uid,
                customerName: firebaseAuth.currentUser.displayName,
                orderId: orderId,
                menuItems,
                business: props.businessID,
                orderTime: props.orderTime.toString(),
            })

            .then(() => {
                console.log('addOrderToDatabase resolve');
                setNextOrderId();
            })
            .catch(error => {
                console.log('Was not added' + error.message);
            });
    }

    const payNow = async () => {
        // For one time payments
        const {
            nonce,
            payerId,
            email,
            firstName,
            lastName,
            phone
        } = await requestOneTimePayment(
            TOKEN_KEY,
            {
                amount: props.amount.toString(), // required
                // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
                currency: 'NZD',
                // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
                localeCode: 'en_US',
                shippingAddressRequired: false,
                userAction: 'commit', // display 'Pay Now' on the PayPal review page
                // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
                intent: 'authorize',
            }
        ).then(r => {
            console.log("payment made")
        }).catch(e => {
            console.log(e);
        })
    }

    return(
        <TouchableOpacity style={styles.payButton} onPress={() => payNow()}>
            <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    payButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        paddingRight: 50,
        paddingLeft: 50,
        marginTop: 15,
    },
    payButtonText: {
        color: '#ffffff',
    },
})

export default PaymentButton;


