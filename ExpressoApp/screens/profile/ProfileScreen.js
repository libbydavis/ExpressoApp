import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {firebase, firebaseDB} from "../../firebase/FirebaseConfig";
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import { Divider} from 'react-native-paper';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const ProfileScreen = () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const navigate = useNavigation();
    const [firstName, setFirstName] =  useState('');
    const [lastName, setLastName] =  useState('');
    const [email, setEmail] =  useState('');
    const [isBusiness, setIsBusiness] = useState(false)
    const [businessTitle, setBusinessTitle] = useState('');

    useEffect(() => {
        firebaseDB.ref('users/'+uid+'/').once('value').then(snapshot=>{
            setFirstName(snapshot.val().firstName)
            setLastName(snapshot.val().lastName)
            setEmail(snapshot.val().email)
        })

        firebaseDB.ref('businesses/'+uid+'/').once('value').then(snapshot=>{
            setIsBusiness(true)
            setBusinessTitle(snapshot.val().title)
        })

    }, []);

    return (
        <View style={styles.mainView}>
            <Header navigation={navigate} rightOption={'profile'}/>
            <View style={styles.titleView}>
                <Text style={styles.title}>Profile</Text>
            </View>
            <View style={styles.detailsView}>
                <Text style={styles.heading}>Name</Text>
                <Text style={styles.details}>{firstName} {lastName}</Text>
                <Divider />
            </View>
            <View style={styles.detailsView}>
                <Text style={styles.heading}>Email</Text>
                <Text style={styles.details}>{email}</Text>
                <Divider />
            </View>
            { isBusiness === true ?
                <View style={styles.detailsView}>
                    <Text style={styles.heading}>Business</Text>
                    <Text style={styles.details}>{businessTitle}</Text>
                    <Divider/>
                </View> :
                null
            }
            <View style={styles.functionView}>
                <TouchableOpacity style={styles.expressoButton}>
                    <Text style={styles.expressoButtonText}>Change Password</Text>
                </TouchableOpacity>
                { isBusiness === true ?
                    <TouchableOpacity style={styles.expressoButton} onPress={()=>navigate.navigate('EditOpeningHours')}>
                        <Text style={styles.expressoButtonText}>Edit Opening Hours</Text>
                    </TouchableOpacity> :
                    null
                }
                { isBusiness === true ?
                    <TouchableOpacity style={styles.expressoButton} onPress={()=>navigate.navigate('DeleteMenuItemScreen')}>
                        <Text style={styles.expressoButtonText}>Delete Menu Items</Text>
                    </TouchableOpacity> :
                    null
                }
            </View>
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
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '90%',
        justifyContent: 'center',
    },
    expressoButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    heading: {
        color: '#25a2af',
        fontWeight: 'bold',
        fontSize: 20,
    },
    detailsView: {
        margin: 15,
        borderBottomColor: 'black',
    },
    details: {
        fontSize: 18,
        margin: 6,
    },
    functionView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProfileScreen;
