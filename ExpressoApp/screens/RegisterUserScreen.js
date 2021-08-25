import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {firebaseAuth, firebaseDB} from '../firebase/FirebaseConfig';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function RegisterUserScreen() {
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
      return false;
    }
    if (!lastName) {
      return false;
    }
    if (!password || password.length < 6) {
      return false;
    }
    if (owner) {
      if (!businessTitle) {
        return false;
      }
    }

    return true;
  }

  /**
   *
   */
  function signUpNewUser() {
    firebaseAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          writeUserData(firebaseAuth.i);
          if (owner) {
            writeBusinessData(firebaseAuth.tenantId);
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
   * @param userId
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
          console.log('User added to users collection successfully!');
        })
        .catch((error) => {
          // The write failed...
          console.log('User could not be added to users collection.');
        });
  }

  /**
   *
   * @param userId
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
          console.log('Business added to businesses collection successfully!');
        })
        .catch((error) => {
          // The write failed...
          console.log('Business could not be added to businesses collection.');
        });
  }

  // const [user, setUser] = useState({
  //   'firstName': '',
  //   'lastName': '',
  //   'email': '',
  //   'password': '',
  // });
  // const [business, setBusiness] = useState({
  //   'title': '',
  //   'address': '',
  //   'user': {
  //     'firstName': '',
  //     'lastName': '',
  //     'email': '',
  //   },
  // });

  return (
    <View style={styles.mainView}>
      <Image source={require('../assets/ExpressoLogo.png')}
        style={styles.headerIcon}></Image>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.rowView}>
          <View style={styles.columnView}>

            <TextInput style={styles.textInput} placeholder="First name"
              onEndEditing={(e) => {
                setFirstName(e.nativeEvent.text);
              }} />

            <TextInput style={styles.textInput} placeholder="Last name"
              onEndEditing={(e) => {
                setLastName(e.nativeEvent.text);
              }}/>

            <TextInput style={styles.textInput} placeholder="Email"
              onEndEditing={(e) => {
                setEmail(e.nativeEvent.text);
              }} />

            <TextInput style={styles.textInput} placeholder="Password"
              secureTextEntry={true}
              onEndEditing={(e) => {
                setPassword(e.nativeEvent.text);
              }} />

            <BouncyCheckbox iconStyle={{borderColor: '#25a2af'}}
              fillColor={'#25a2af'}
              text={'Are you an owner?'}
              onPress={(isChecked) => {
                setOwner(isChecked);
              }} />

            { !owner ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text></Text>
                  <TextInput style={styles.textInput}
                    placeholder="Business Title"
                    onEndEditing={(e) => {
                      setBusinessTitle(e.nativeEvent.text);
                    }}/>
                  <TextInput style={styles.textInput}
                    placeholder="Business Address"
                    onEndEditing={(e) => {
                      setBusinessAddress(e.nativeEvent.text);
                    }}/>
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
              if (valid) {
                signUpNewUser();
              } else {
                console.log('Data is invalid');
              }
            }}>

            <Text style={styles.expressoButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


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

