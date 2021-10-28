import React from 'react';

import {useState} from "react";
import {StyleSheet, Image, TextInput, View, TouchableOpacity, Text, Keyboard, Alert} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
            console.log("User has successfully signed in!");
            let token = await AsyncStorage.getItem('@token');
            token = JSON.parse(token);
            console.log(token);
            let messageRef = firebaseDB.ref('users/' + user.user.uid).child('token').set(token)
                .then(r => navigation.navigate('SearchScreen'));
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

      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.signUpText} onPress={() => navigation.navigate('ResetPasswordScreen')}
        >Forgot password? </Text>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText} onPress={() => userLogin()}>login</Text>
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
        width: 225,
        height: 65,
        marginTop: 100,
        marginBottom: 10,
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
      width: 250,
      height: 50,
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#25a2af',
      justifyContent: 'center'
  },
  loginText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '200',
  },
  text: {
    fontSize: 15,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginLeft: 130,
    marginTop: 10,
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
