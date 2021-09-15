import React, {useState, useRef, useEffect} from 'react';
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
import EditDayHours from "./EditDayHours";

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const editOpeningHours = () => {

    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Image
                    source={require('../../assets/ExpressoLogo.png')}
                    style={styles.logoIcon}
                />
                <Image
                    source={require('../../assets/profileIcon.png')}
                    style={styles.profileIcon}
                />
            </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Edit Opening Hours</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <EditDayHours day={'MON'}></EditDayHours>
                <EditDayHours day={'TUE'}></EditDayHours>
                <EditDayHours day={'WED'}></EditDayHours>
                <EditDayHours day={'THU'}></EditDayHours>
                <EditDayHours day={'FRI'}></EditDayHours>
                <EditDayHours day={'SAT'}></EditDayHours>
                <EditDayHours day={'SUN'}></EditDayHours>
                <TouchableOpacity style={styles.expressoButton}>
                    <Text style={styles.expressoButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView : {
        height: '100%',
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoIcon: {
        width: 200,
        height: 50,
        marginTop: 5,
        marginBottom: 20,
    },
    profileIcon: {
        width: 40,
        height: 40,
        margin: 15,
    },
    titleView: {
        width: '100%',
        backgroundColor: 'rgba(37, 162, 175,.9)',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ffffff',
        fontFamily: 'Monserrat-Bold',
        fontSize: 30,
        margin: 10,
        padding: 5,
        fontWeight: 'bold',
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '25%',
    },
    expressoButtonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
});

export default editOpeningHours;
