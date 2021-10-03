import React, {useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StatusBar,
    LogBox, ToastAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import validator from 'validator';
import {PLACES_API_KEY, GEOCODING_API_KEY} from '@env';
import Geocoder from 'react-native-geocoding';

Geocoder.init(GEOCODING_API_KEY);

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function RegisterUserScreen({navigation}) {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [owner, setOwner] = useState(false);
    const [businessTitle, setBusinessTitle] = useState(' ');
    const [businessAddress, setBusinessAddress] = useState(' ');
    const [latitude, setLatitude] = useState(' ');
    const [longitude, setLongitude] = useState(' ');
    const [isFirstName, setIsFirstName] = useState(true);
    const [isLastName, setIsLastName] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isEmail, setIsEmail] = useState(true);


    // const [initializing, setInitializing] = useState(true);
    // /**
    //  *
    //  * @param user
    //  * */
    // function onAuthStateChanged(user) {
    //   setUser(user);
    //   if (initializing) setInitializing(false);
    // }
    // useEffect(() => {
    //   const subscriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    //   return subscriber; // unsubscribe on unmount
    // }, []);

    /**
     *
     * @return {boolean}
     */
    function validateInput() {
        if (validator.isEmail(email) && password.length >= 6 && validator.isAlpha(firstName) && validator.isAlpha(lastName)) {
            return true;
        } else if (!isEmail) {
            ToastAndroid.show('Must use a valid email.', ToastAndroid.LONG);
            return false;
        } else if (!isFirstName) {
            ToastAndroid.show('First name must be only letters.', ToastAndroid.LONG);
            return false;
        } else if (!isLastName) {
            ToastAndroid.show('Last name must be only letters.', ToastAndroid.LONG);
            return false;
        } else if (!isPassword) {
            ToastAndroid.show('Password must be six characters long.', ToastAndroid.LONG);
            return false;
        } else {
            ToastAndroid.show('Make sure to fix your details.', ToastAndroid.LONG);
        }
    }

    /**
     *
     */
    function signUpNewUser() {
        firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('User account created & signed in!');
                writeUserData(user.user.uid);
                if (owner) {
                    writeBusinessData(user.user.uid);
                }
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error + ' ' + email + ' ' + firstName + ' ' + lastName);
            });
    }

    /**
     *
     * @param {string}userId
     */
    function writeUserData(userId) {
        firebaseDB.ref('users/' + userId)
            .set({
                firstName: firstName,
                lastName: lastName,
                email: email,
            })
            .then(() => {
                // Data saved successfully!
                console.log(`User ${userId} added to users collection successfully!`);
            })
            .catch((error) => {
                // The write failed...
                console.log(`User ${userId} could not be added to users collection.` +
                    error.message());
            });
    }

    /**
     *
     * @param {string}userId
     */
    function writeBusinessData(userId) {
        firebaseDB.ref('businesses/' + userId)
            .set({
                owner: userId,
                title: businessTitle,
                address: businessAddress,
                latitude: latitude,
                longitude: longitude,
            })
            .then(() => {
                // Data saved successfully!
                console.log(`Business for ${userId} added to businesses` +
                    ` collection successfully!`);
            })
            .catch((error) => {
                // The write failed...
                console.log(`Business for ${userId} could not be added to` +
                    ` businesses collection.` + error.message());
            });
    }

    const handleFirstName = (text) => {
        if (validator.isAlpha(text)) {
            setFirstName(text);
            setIsFirstName(true);
        } else {
            setIsFirstName(false);
        }
    };

    const handleLastName = (text) => {
        if (validator.isAlpha(text)) {
            setLastName(text);
            setIsLastName(true);
        } else {
            setIsLastName(false);
        }
    };

    const handleEmail = (text) => {
        if (validator.isEmail(text)) {
            setEmail(text);
            setIsEmail(true);
        } else {
            setIsEmail(false);
        }
    };

    const handlePassword = (text) => {
        if (text.length >= 6) {
            setPassword(text);
            setIsPassword(true);
        } else {
            setIsPassword(false);
        }
    };

    const handleOwner = (bool) => {
        setOwner(bool);
    };

    const handleBusinessTitle = (text) => {
        setBusinessTitle(text);
    }

    return (
        <View style={styles.mainView}>
            <Image source={require('../../assets/ExpressoLogo.png')}
                   style={styles.headerIcon}></Image>
            <ScrollView contentContainerStyle={styles.scrollView} nestedScrollEnabled={true}
                        keyboardShouldPersistTaps={'handled'}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.rowView}>
                    <View style={styles.columnView}>

                        {!isFirstName ?
                            <Animatable.Text style={styles.errorText} animation="fadeInLeft" duration={500}>
                                First name must be only letters.</Animatable.Text> : null
                        }
                        <TextInput style={styles.textInput} placeholder="First name"
                                   placeholderTextColor={'#40404040'}
                                   onChangeText={text => handleFirstName(text)}/>

                        {!isLastName ?
                            <Animatable.Text style={styles.errorText} animation="fadeInLeft" duration={500}>
                                Last name must be only letters.</Animatable.Text> : null
                        }
                        <TextInput style={styles.textInput} placeholder="Last name"
                                   placeholderTextColor={'#40404040'}
                                   onChangeText={text => handleLastName(text)}/>

                        {!isEmail ?
                            <Animatable.Text style={styles.errorText} animation="fadeInLeft" duration={500}>
                                Must use a valid email!</Animatable.Text> : null
                        }
                        <TextInput style={styles.textInput} placeholder="Email"
                                   placeholderTextColor={'#40404040'}
                                   onChangeText={text => handleEmail(text)}/>

                        {!isPassword ?
                            <Animatable.Text style={styles.errorText} animation="fadeInLeft" duration={500}>
                                Password must be min six characters long!</Animatable.Text> : null
                        }
                        <TextInput style={styles.textInput} placeholder="Password"
                                   secureTextEntry={true}
                                   placeholderTextColor={'#40404040'}
                                   onChangeText={text => handlePassword(text)}/>

                        <BouncyCheckbox iconStyle={{borderColor: '#25a2af'}}
                                        fillColor={'#25a2af'}
                                        text={'Are you an owner?'}
                                        style={styles.checkbox}
                                        onPress={isChecked => handleOwner(isChecked)}/>

                        {
                            !owner ? null : (
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text>{}</Text>
                                    <TextInput style={styles.textInput}
                                               placeholder="Business Title"
                                               placeholderTextColor={'#40404040'}
                                               onChangeText={text => handleBusinessTitle(text)}/>
                                    <GooglePlacesAutocomplete
                                        placeholder='Business Address'
                                        placeholderTextColor={'#40404040'}
                                        onPress={(data, details) => {
                                            console.log(details)
                                            Geocoder.from(details.description)
                                                .then(json => {
                                                    var location = json.results[0].geometry.location;
                                                    setLatitude(location.lat)
                                                    setLongitude(location.lng)
                                                    console.log(location);
                                                })
                                                .catch(error => console.warn(error));

                                            setBusinessAddress(details.description)
                                            console.log(businessAddress)
                                        }}
                                        query={{
                                            key: PLACES_API_KEY,
                                            language: 'en',
                                            components: 'country:nz',
                                        }}
                                        textInputProps={{
                                            fontFamily: 'Monserrat-Regular',
                                            foregroundColor: 'black',
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            paddingRight: 20,
                                            marginBottom: 20,
                                        }}
                                    />
                                </Animatable.View>
                            )
                        }
                    </View>
                </View>
                <View>
                    {
                        //   !owner ? null : (
                        //     <Animatable.View animation="fadeInLeft" duration={500}>
                        //       <Text></Text>
                        //       <TextInput style={styles.textInput}
                        //         placeholder="Business Title"
                        //         onEndEditing={(e) => {
                        //           setBusinessTitle(e.nativeEvent.text);
                        //         }}/>
                        //       <TextInput style={styles.textInput}
                        //         placeholder="Business Address"
                        //         onEndEditing={(e) => {
                        //           setBusinessAddress(e.nativeEvent.text);
                        //         }}/>
                        //     </Animatable.View>
                        // )
                    }
                    <TouchableOpacity
                        style={styles.expressoButton}
                        onPress={() => {
                            if (validateInput()) {
                                try {
                                    signUpNewUser();
                                    ToastAndroid.show('Registered!', ToastAndroid.SHORT);
                                } catch (error) {
                                    switch (error.code) {
                                        case 'auth/email-already-in-use':
                                            ToastAndroid.show(`Email address ${email} already in use.`, ToastAndroid.SHORT);
                                            break;
                                        case 'auth/invalid-email':
                                            ToastAndroid.show(`Email address ${email} is invalid.`, ToastAndroid.SHORT);
                                            break;
                                        case 'auth/operation-not-allowed':
                                            ToastAndroid.show(`Error during sign up.`, ToastAndroid.SHORT);
                                            break;
                                        case 'auth/weak-password':
                                            ToastAndroid.show('Password is not strong enough. Add additional characters including special characters and numbers.', ToastAndroid.SHORT);
                                            break;
                                        default:
                                            ToastAndroid.show('Please try registration at another time', ToastAndroid.SHORT);
                                            console.log(error.message);
                                            break;
                                    }
                                }
                            }
                        }}>
                        <Text style={styles.expressoButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
        ;
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        // backgroundColor: '#35a2af',
    },
    headerIcon: {
        width: 200,
        height: 50,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        padding: 10,
        borderRadius: 25,
        margin: 10,
        color: '#000',
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    imagePicker: {
        backgroundColor: 'red',
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        width: '50%',
    },
    expressoButtonText: {
        color: '#ffffff',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    checkbox: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    scrollView: {
        marginHorizontal: 20,
        // backgroundColor: '#ffffff',
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default RegisterUserScreen;

