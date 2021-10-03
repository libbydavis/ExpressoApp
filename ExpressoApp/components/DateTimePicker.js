import React, {useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExpressoButton from "./Button";

export default function DateTime() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View style={styles.container}>
            <View>
                <ExpressoButton onPress={showDatepicker} title={'Show date picker!'}/>
            </View>
            <View>
                <ExpressoButton onPress={showTimepicker} title={'Show time picker!'}/>
            </View>
            <View>
                <Text style={styles.text}>{'   '}{date.toLocaleTimeString()}</Text>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
       
    },
});
