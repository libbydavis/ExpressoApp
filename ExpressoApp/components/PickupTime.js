import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';

export const getTwelveHourString = time => {
    let pm = time.getHours() > 12;
    let hours = pm ? time.getHours() - 12 : time.getHours();
    console.log(
        'minutes length for ' +
        time.toLocaleTimeString('en-US') +
        ' : ' +
        time.getMinutes().toString().length ===
        1,
    );
    let mins =
        time.getMinutes().toString().length === 1
        ? '0' + time.getMinutes().toString()
        : time.getMinutes();
    let half = pm ? 'pm' : 'am';

    return hours + ':' + mins + half;
};

export default function PickupTimePicker({
    handleOrderTime,
    hidePickerVisibility,
    openingHours,
    closingHours,
    }) {

    const openingTime = openingHours
        ? openingHours
        : new Date().setHours(15, 0, 0);
    const closingTime = closingHours
        ? closingHours
        : new Date().setHours(21, 0, 0);

    return (
        <DateTimePicker
        testID="PickUpTimePicker"
        value={new Date()}
        mode={'time'}
        display={'clock'}
        onChange={(e, selectedTime) => {
            if (selectedTime >= openingTime && selectedTime < closingTime) {
            ToastAndroid.show(
                `Pickup set for ${getTwelveHourString(new Date(selectedTime))}`,
                ToastAndroid.LONG,
            );
            console.log(
                'selected: ' + new Date(selectedTime).toLocaleTimeString('en-US'),
            );
            console.log(
                'current time: ' + new Date().toLocaleTimeString('en-US'),
            );
            handleOrderTime(selectedTime);
            hidePickerVisibility();
            } else {
            ToastAndroid.show(
                `Please select a pickup time within hours
                        ${getTwelveHourString(
                        new Date(openingTime),
                        )} and ${getTwelveHourString(new Date(closingTime))}`,
                ToastAndroid.LONG,
            );
            handleOrderTime(new Date());
            hidePickerVisibility();
            }
        }}
        />
    );
}

PickupTimePicker.propTypes = {
    setOrderTime: PropTypes.func,
    handlePickerVisibility: PropTypes.func,
    pickerVisible: PropTypes.bool,
};
