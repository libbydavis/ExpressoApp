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
    LogBox,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PLACES_API_KEY} from '@env';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

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
        if (!firstName) {
            return 'First name invalid!';
        }
        if (!lastName) {
            return 'Last name invalid!';
        }
        if (!password || password.length < 6) {
            return 'Password must be 6 characters long!';
        }
        if (owner) {
            if (!businessTitle) {
                return 'Business Title invalid!';
            }
        }

        if (!email) {
            return 'Email invalid!';
        }

        return true;
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

    return (
        <View style={styles.mainView}>
            <Image source={require('../../assets/ExpressoLogo.png')}
                   style={styles.headerIcon}></Image>
            <ScrollView contentContainerStyle={styles.scrollView} nestedScrollEnabled={true}
                        keyboardShouldPersistTaps={'handled'}>
                <Text style={styles.title}>Register</Text>
                <View style={styles.rowView}>
                    <View style={styles.columnView}>

                        <TextInput style={styles.textInput} placeholder="First name"
                                   placeholderTextColor={'#40404040'}
                                   onEndEditing={(e) => {
                                       setFirstName(e.nativeEvent.text);
                                   }}/>

                        <TextInput style={styles.textInput} placeholder="Last name"
                                   placeholderTextColor={'#40404040'}
                                   onEndEditing={(e) => {
                                       setLastName(e.nativeEvent.text);
                                   }}/>

                        <TextInput style={styles.textInput} placeholder="Email"
                                   placeholderTextColor={'#40404040'}
                                   onEndEditing={(e) => {
                                       let email = e.nativeEvent.text.trim();
                                       setEmail(email);
                                   }}/>

                        <TextInput style={styles.textInput} placeholder="Password"
                                   secureTextEntry={true}
                                   placeholderTextColor={'#40404040'}
                                   onEndEditing={(e) => {
                                       setPassword(e.nativeEvent.text);
                                   }}/>

                        <BouncyCheckbox iconStyle={{borderColor: '#25a2af'}}
                                        fillColor={'#25a2af'}
                                        text={'Are you an owner?'}
                                        onPress={(isChecked) => {
                                            setOwner(isChecked);
                                        }}/>

                        {!owner ? null : (
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text>{}</Text>
                                <TextInput style={styles.textInput}
                                           placeholder="Business Title"
                                           placeholderTextColor={'#40404040'}
                                           onEndEditing={(e) => {
                                               setBusinessTitle(e.nativeEvent.text);
                                           }}/>
                                <GooglePlacesAutocomplete
                                    placeholder='Business Address'
                                    placeholderTextColor={'#40404040'}
                                    onPress={(data, details) => {
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
                        style={styles.expressoButton} onPress={() => {
                        const valid = validateInput();
                        if (typeof valid !== 'string') {
                            signUpNewUser();
                            // goToLoginIfSuccessful(() => {navigation.navigate('LoginScreen')});
                        } else {
                            console.log('Data is invalid: ' + valid);
                        }
                    }}>
                        <Text style={styles.expressoButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
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
        fontFamily: 'Monserrat-Regular',
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 50,
        marginBottom: 20,
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
    },
    scrollView: {
        marginHorizontal: 20,
        // backgroundColor: '#ffffff',
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default RegisterUserScreen;

