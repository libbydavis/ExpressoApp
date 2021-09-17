import React, {useEffect, useState} from 'react';
import {TOKEN_KEY} from '@env';
import {firebaseAuth} from "../../firebase/FirebaseConfig";
import {requestOneTimePayment} from "react-native-paypal";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


const PaymentButton = (props) => {
    /*
    const braintree = require("braintree");
    const [clientToken, setClientToken] = useState();

    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: {MERCHANT_ID},
        publicKey: {PUBLIC_KEY},
        privateKey: {PRIVATE_KEY}
    });

    gateway.clientToken.generate({
        customerId: firebaseAuth.currentUser
    }).then(response => {
        // pass clientToken to your front-end
        useEffect(() => {
            setClientToken(response.clientToken);
        });
    });

     */

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


