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
  Dimensions,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function RegisterUserScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  /**
   *
   * @param user
   * */
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  /**
   *
   * @return {boolean}
   */
  function validateInput() {
    if (!firstName) return false;
    if (!lastName) return false;
    if (!password || password.length < 6) return false;

    if (owner) {
      if (!businessName) return false;
    }

    return true;
  }

  /**
   *
   */
  async function signUpNewUser() {
    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
  }

  database()
      .ref('/Users')
      .update({
        firstName: 'Jim',
      })
      .then(() => console.log('Data updated.'));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [owner, setOwner] = useState(false);
  const [businessName, setBusinessName] = useState('');

  return (
    <View style={styles.mainView}>
      <Image source={require('../assets/ExpressoLogo.png')}
        style={styles.headerIcon}></Image>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.rowView}>
          <View style={styles.columnView}>

            <TextInput style={styles.textInput} placeholder="First name"
              onEndEditing={(text) => {
                setFirstName(text);
              }} />

            <TextInput style={styles.textInput} placeholder="Last name"
              onEndEditing={(text) => {
                setLastName(text);
              }}/>

            <TextInput style={styles.textInput} placeholder="Email"
              onEndEditing={(text) => {
                setEmail(text);
              }} />

            <TextInput style={styles.textInput} placeholder="Password"
              secureTextEntry={true}
              onEndEditing={(text) => {
                setPassword(text);
              }} />

            <BouncyCheckbox iconStyle={{borderColor: '#25a2af'}}
              fillColor={'#25a2af'}
              text={'Are you an owner?'}
              onPress={(isChecked) => {
                setOwner(isChecked);
              }} />

            { !owner ? null : (
                <>
                  <Text></Text>
                  <TextInput style={styles.textInput}
                    placeholder="Business Name"
                    onEndEditing={(text) => {
                      setBusinessName(text);
                    }}/>
                  <TextInput style={styles.textInput}
                    placeholder="Business Name"
                    onEndEditing={(text) => {
                      setBusinessName(text);
                    }}/>
                  <TextInput style={styles.textInput}
                    placeholder="Business Name"
                    onEndEditing={(text) => {
                      setBusinessName(text);
                    }}/>
                  <TextInput style={styles.textInput}
                    placeholder="Business Name"
                    onEndEditing={(text) => {
                      setBusinessName(text);
                    }}/>
                </>
              )
            }

          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.expressoButton} onPress={() => {
              if (validateInput()) {
                signUpNewUser();
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
    alignSelf: 'center',
  },
  headerIcon: {
    width: 200,
    height: 50,
  },
  textInput: {
    fontFamily: 'Monserrat-Regular',
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
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
    marginBottom: 10,
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
    padding: 20,
  },
});

export default RegisterUserScreen;

