import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';

export default function PickupTimePicker({
    handleOrderTime,
    hidePickerVisibility,
    openingHours,
    closingHours,
}) {
    const [currentTime, setCurrentTime] = useState(
        new Date('October 13, 2021 19:25:30'),
    );

    const openingTime = openingHours
        ? openingHours
        : new Date().setHours(15, 0, 0);
    const closingTime = closingHours
        ? closingHours
        : new Date().setHours(21, 0, 0);

    const getTwelveHourString = time => {
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
                ToastAndroid.SHORT,
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
                ToastAndroid.SHORT,
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
