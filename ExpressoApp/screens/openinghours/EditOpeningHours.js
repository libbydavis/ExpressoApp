import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity, Alert
} from 'react-native';
import EditDayHours from "./EditDayHours";
import {firebaseAuth, firebaseDB} from "../../firebase/FirebaseConfig";
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const editOpeningHours = () => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const navigate = useNavigation();

    const [monday, setMonday] = useState({
        day: 'Monday',
        open: '',
        close: ''
    })
    const [tuesday, setTuesday] = useState({
        day: 'Tuesday',
        open: '',
        close: ''
    })
    const [wednesday, setWednesday] = useState({
        day: 'Wednesday',
        open: '',
        close: ''
    })
    const [thursday, setThursday] = useState({
        day: 'Thursday',
        open: '',
        close: ''
    })
    const [friday, setFriday] = useState({
        day: 'Friday',
        open: '',
        close: ''
    })
    const [saturday, setSaturday] = useState({
        day: 'Saturday',
        open: '',
        close: ''
    })
    const [sunday, setSunday] = useState({
        day: 'Sunday',
        open: '',
        close: ''
    })

    const writeOpeningHours = () => {
        writeDayHours(monday)
        writeDayHours(tuesday)
        writeDayHours(wednesday)
        writeDayHours(thursday)
        writeDayHours(friday)
        writeDayHours(saturday)
        writeDayHours(sunday)
        Alert.alert("Saved", "Opening hours have been saved", [
            {text: "ok", onPress: () => {navigate.navigate('ProfileScreen')}}
        ]);

    }

    const writeDayHours = (day) => {
        if (validateDay(day)) {
            firebaseDB.ref('businesses/' + uid + '/openingHours')
                .update({
                    [day.day]: writeDay(day)
                })
                .then(() => {
                    // Data saved successfully!
                    console.log(`Opening hours for business ${uid} added to business collection successfully!`);
                })
                .catch((error) => {
                    // The write failed...
                    console.log(`Opening hours for business ${uid} could not be added to the business collection.` +
                        error.message());
                });
        }
        else {
            console.log(day.day + ' hours not added to collection')
        }
    }

    const writeDay = (day) => {
        if (day.open == 'closed' || day.close == 'closed') {
            return ('closed')
        }
        else {
            return (day.open + ' to ' + day.close)
        }
    }

    const validateDay = (day) => {
        if (day.open == 'closed' || day.close == 'closed')
        {
            return true
        }
        else if (day.open == '' || day.close == '') {
            console.log('unchanged timings')
            return false
        }
        else if (day.close <= day.open) {
            console.log('store can\'t close before or when it opens!')
            return false
        }
        return true
    }

    return (
        <View style={styles.mainView} testID={'Opening_Hours_Editor_Screen'}>
            <Header navigation={navigate} rightOption={'profile'}/>
            <View style={styles.titleView}>
                <Text style={styles.title}>Edit Opening Hours</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <EditDayHours
                    day={'MON'}
                    openSet={(openingValue)=> setMonday({...monday, open : openingValue})}
                    closeSet={(closingValue)=> setMonday({...monday, close : closingValue})}
                />
                <EditDayHours
                    day={'TUE'}
                    openSet={(openingValue)=> setTuesday({...tuesday, open : openingValue})}
                    closeSet={(closingValue)=> setTuesday({...tuesday, close : closingValue})}
                />
                <EditDayHours
                    day={'WED'}
                    openSet={(openingValue)=> setWednesday({...wednesday, open : openingValue})}
                    closeSet={(closingValue)=> setWednesday({...wednesday, close : closingValue})}
                />
                <EditDayHours
                    day={'THU'}
                    openSet={(openingValue)=> setThursday({...thursday, open : openingValue})}
                    closeSet={(closingValue)=> setThursday({...thursday, close : closingValue})}
                />
                <EditDayHours
                    day={'FRI'}
                    openSet={(openingValue)=> setFriday({...friday, open : openingValue})}
                    closeSet={(closingValue)=> setFriday({...friday, close : closingValue})}
                />
                <EditDayHours
                    day={'SAT'}
                    openSet={(openingValue)=> setSaturday({...saturday, open : openingValue})}
                    closeSet={(closingValue)=> setSaturday({...saturday, close : closingValue})}
                />
                <EditDayHours
                    day={'SUN'}
                    openSet={(openingValue)=> setSunday({...sunday, open : openingValue})}
                    closeSet={(closingValue)=> setSunday({...sunday, close : closingValue})}
                />
                <TouchableOpacity style={styles.expressoButton} onPress={writeOpeningHours}>
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
