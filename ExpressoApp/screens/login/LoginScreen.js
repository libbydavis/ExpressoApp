import React from 'react';

import {useState} from "react";
import {StyleSheet, Image, TextInput, View, TouchableOpacity, Text, Keyboard, Alert} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import {keyboard} from "yarn/lib/cli";
import ExpressoButton from '../../components/Button';
import PickupTimePicker from '../../components/PickupTime';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import '@react-navigation/native';

//TODO Change back to

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const test = () => {
      console.log('test');
  }

  const userLogin = () => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
            console.log("User has successfully signed in!");
            let token = await AsyncStorage.getItem('@token');
            token = JSON.parse(token);
            console.log(token);
            let messageRef = firebaseDB.ref('users/' + user.user.uid).child('token').set(token)
                .then(r => navigation.navigate('MenuEditor', { menuID: '-MjmBfn9YP-wguwurLH1' }));
        })
        .catch(error => {
            Alert.alert(
              "Error:",
              "Invalid input. Please try again.",
              [
                  {
                      text: "OK",
                  },
              ]
          );
          if (error.code === 'auth/email-already-exists')
          {
            console.log('This email address already exists!');
          }
          console.error(error);
        });
  }

    const logout = () => {
        firebaseAuth
            .signOut()
            .then(() => console.log('User has logged out!'));
    };


  return (
    <View style={styles.mainContainer} testID={'Login_Screen'}>
      <Image
        source={require('../../assets/ExpressoLogo.png')}
        style={styles.headerIcon}
      >
      </Image>
      <View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          testID={'usernameInput'}
        />
      </View>

      <View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password" secureTextEntry={true}
          testID={'passwordInput'}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} testID={'loginButton'}>
        <Text style={styles.loginText} onPress={() => userLogin()}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don&apos;t have an account? </Text>
        <Text style={styles.signUpText} testID={'signUp'}
          onPress={() => navigation.navigate('RegisterUser')}>
        Sign up here</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150,

    },
    headerIcon: {
        width: 200,
        height: 50,
        marginTop: 100,
        marginBottom: 30,

  },
  inputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#25a2af',
  },
  loginText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
  },
  signUpText: {
    color: '#6495ed',
    fontSize: 15,
    fontWeight: '800',
  },
  signUpContainer: {
    flexDirection: 'row',
  },

});

export default LoginScreen;
