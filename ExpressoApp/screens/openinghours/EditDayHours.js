import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    ImageBackground,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const editDayHours = (props) => {
    const [openingOpen, setOpeningOpen] = useState(false);
    const [openingValue, setOpeningValue] = useState();
    const [closingOpen, setClosingOpen] = useState(false);
    const [closingValue, setClosingValue] = useState();

    const [items, setItems] = useState([
        {label: 'closed', value: 'closed'},
        {label: '00:00', value: '00:00'},
        {label: '00:30', value: '00:30'},
        {label: '01:00', value: '01:00'},
        {label: '01:30', value: '01:30'},
        {label: '02:00', value: '02:00'},
        {label: '02:30', value: '02:30'},
        {label: '03:00', value: '03:00'},
        {label: '03:30', value: '03:30'},
        {label: '04:00', value: '04:00'},
        {label: '04:30', value: '04:30'},
        {label: '05:00', value: '05:00'},
        {label: '05:30', value: '05:30'},
        {label: '06:00', value: '06:00'},
        {label: '06:30', value: '06:30'},
        {label: '07:00', value: '07:00'},
        {label: '07:30', value: '07:30'},
        {label: '08:00', value: '08:00'},
        {label: '08:30', value: '08:30'},
        {label: '09:00', value: '09:00'},
        {label: '09:30', value: '09:30'},
        {label: '10:00', value: '10:00'},
        {label: '10:30', value: '10:30'},
        {label: '11:00', value: '11:00'},
        {label: '11:30', value: '11:30'},
        {label: '12:00', value: '12:00'},
        {label: '12:30', value: '12:30'},
        {label: '13:00', value: '13:00'},
        {label: '13:30', value: '13:30'},
        {label: '14:00', value: '14:00'},
        {label: '14:30', value: '14:30'},
        {label: '15:00', value: '15:00'},
        {label: '15:30', value: '15:30'},
        {label: '16:00', value: '16:00'},
        {label: '16:30', value: '16:30'},
        {label: '17:00', value: '17:00'},
        {label: '17:30', value: '17:30'},
        {label: '18:00', value: '18:00'},
        {label: '18:30', value: '18:30'},
        {label: '19:00', value: '19:00'},
        {label: '19:30', value: '19:30'},
        {label: '20:00', value: '20:00'},
        {label: '20:30', value: '20:30'},
        {label: '21:00', value: '21:00'},
        {label: '21:30', value: '21:30'},
        {label: '22:00', value: '22:00'},
        {label: '22:30', value: '22:30'},
        {label: '23:00', value: '23:00'},
        {label: '23:30', value: '23:30'},
    ]);

    const onOpeningOpen = useCallback(() => {
        setClosingOpen(false);
    }, []);

    const onClosingOpen = useCallback(() => {
        setOpeningOpen(false);
    }, []);

    return (
        <View style={styles.dayView}>
            <Text style={styles.day}>{props.day}:</Text>
            <DropDownPicker
                open={openingOpen}
                onOpen={onOpeningOpen}
                value={openingValue}
                items={items}
                setOpen={setOpeningOpen}
                setValue={setOpeningValue}
                setItems={setItems}
                onChangeValue={props.openSet}
                style={styles.dropDownPicker}
                dropDownStyle={styles.dropDownItem}
                dropDownContainerStyle={{width: 100,position: 'absolute',}}
                containerStyle={{width: 100}}
                textStyle={{fontSize: 12}}
                labelStyle={{fontSize: 12, fontWeight: "bold"}}
                maxHeight={100}
                placeholder={'opens'}
                zIndex={1000}
                zIndexInverse={2000}
            />
            <Text style={styles.day}>to</Text>
            <DropDownPicker
                open={closingOpen}
                onOpen={onClosingOpen}
                value={closingValue}
                items={items}
                setOpen={setClosingOpen}
                setValue={setClosingValue}
                setItems={setItems}
                onChangeValue={props.closeSet}
                style={styles.dropDownPicker}
                dropDownStyle={styles.dropDownItem}
                dropDownContainerStyle={{width: 100}}
                containerStyle={{width: 100}}
                textStyle={{fontSize: 12}}
                labelStyle={{fontSize: 12, fontWeight: "bold"}}
                maxHeight={100}
                placeholder={'closes'}
                zIndex={2000}
                zIndexInverse={1000}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    day: {
        color: 'rgba(37, 162, 175,.8)',
        fontSize: 20,
        margin: 15,
        padding: 5,
        fontWeight: 'bold',
    },
    dayView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropDownPicker: {
        fontFamily: 'Monserrat-Regular',
        backgroundColor: '#fafafa',
        width: 95,
        height: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 0,
        padding: 0,
        margin: 0,
        zIndex: 1,
    },
    dropDownItem: {
        flex: 1,
        fontFamily: 'Monserrat-Regular',
        backgroundColor: '#fafafa',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 0,
        margin: 0,
        position: 'absolute',
    },
});

export default editDayHours;

