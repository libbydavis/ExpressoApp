import React from 'react';
import { useState } from "react";
import {StyleSheet, Image, TextInput, View, TouchableOpacity, Text} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
// import '@react-navigation/native';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User has successfully signed in!");
          navigation.navigate('CreateMenu');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-exists') {
            console.log('This email address already exists!');
          }
          console.error(error);
        });
  }

  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => console.log('User has logged out!'));
  }


  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/ExpressoLogo.png')}
        style={styles.headerIcon}
      >
      </Image>
      <View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email" />
      </View>

      <View>
        <TextInput
          style={styles.inputContainer}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password" secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText} onPress={() => userLogin()}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don&apos;t have an account? </Text>
        <Text style={styles.signUpText}
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
    borderRadius: 25,
    marginTop: 20,
  },
  loginButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#6495ed',
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
