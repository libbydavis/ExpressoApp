import React, {useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import Cart from './Cart';
import AddToCartButton from '../../components/AddToCartButton';
import PaymentButton from '../../components/PaymentButton';
import Header from '../../components/Header';
import ExpressoButton from '../../components/Button';
import PickupTimePicker from '../../components/PickupTime';
/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CartScreen = ({navigation}) => {
    const [amount, setAmount] = useState();
    const [orderTime, setOrderTime] = useState(() =>
        new Date().toLocaleString(),
    );
    const [showTimePicker, setShowTimePicker] = useState(() => false);
    const hidePickerVisibility = () => setShowTimePicker(false);
    const handleOrderTime = time => setOrderTime(time);

    const receiveAmount = value => {
        setAmount(value);
    };

    return (
        <ScrollView>
            <Header></Header>
            <View style={styles.cartView}>
                <Text style={styles.cartTitle}>Cart</Text>
                <Cart receiveValue={receiveAmount}></Cart>
                <ExpressoButton
                    onPress={() => setShowTimePicker(true)}
                    title={'Choose Pickup Time'}
                />
                {showTimePicker && (
                    <PickupTimePicker
                        hidePickerVisibility={hidePickerVisibility}
                        handleOrderTime={handleOrderTime}
                        openingHours={{openTime: '', closeTime: ''}}
                    />
                )}
                <PaymentButton amount={amount}></PaymentButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cartView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartTitle: {
        fontFamily: 'Monserrat-Regular',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
});

export default CartScreen;
