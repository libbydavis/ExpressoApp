import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import {firebaseDB} from '../../firebase/FirebaseConfig';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const openingHours = (props) => {
    const [openingHours, setOpeningHours] = useState([])

    useEffect(() => {
        firebaseDB.ref('businesses/'+props.id+'/openingHours').once('value').then(snapshot=>{
            var o = [];
            o.push({day: 'Monday', hours:  snapshot.val().Monday})
            o.push({day: 'Tuesday', hours:  snapshot.val().Tuesday})
            o.push({day: 'Wednesday', hours:  snapshot.val().Wednesday})
            o.push({day: 'Thursday', hours:  snapshot.val().Thursday})
            o.push({day: 'Friday', hours:  snapshot.val().Friday})
            o.push({day: 'Saturday', hours:  snapshot.val().Saturday})
            o.push({day: 'Sunday', hours:  snapshot.val().Sunday})
            setOpeningHours(o);
        })
    }, []);

    const hourView = ({item}) => {
        return (
            // Flat List Item
            <View style={styles.listView}>
                <Text>{item.hours}</Text>
            </View>
        );
    };

    const dayView = ({item}) => {
        return (
            // Flat List Item
            <View style={styles.listView}>
                <Text style={styles.day}>{item.day}:</Text>
            </View>
        );
    };

    return (
        <View style={styles.mainView}>
            <Image source={require('../../assets/openHours.png')} style={styles.clockIcon}/>
            <View style={styles.listView}>
            <FlatList
                data={openingHours}
                renderItem={dayView}
                keyExtractor={(item, index) => index}
            />
            </View>
            <View style={styles.listView}>
            <FlatList
                data={openingHours}
                renderItem={hourView}
                keyExtractor={(item, index) => index}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        margin: 2,
        flex: 1,
    },
    day: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Monserrat-Regular',
        fontWeight: 'bold',
    },
    clockIcon : {
        height: 30,
        width: 30,
        padding: 20,
        margin: 15 ,
        marginTop: 5
    },
    listView: {
        padding: 4,
    }
});

export default openingHours;
