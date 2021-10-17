import React from 'react';

import {useState} from "react";
import {StyleSheet, Image, TextInput, View, TouchableOpacity, Text, Keyboard, Alert} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import {keyboard} from "yarn/lib/cli";
import ExpressoButton from '../../components/Button';
// import '@react-navigation/native';


const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState("");

  const resetPassword = () => {
    firebaseAuth
      .sendPasswordResetEmail(email)
        .then(() => {
          console.log("Successfully sent password reset email!");
          Alert.alert(
            "Success! Please check your email:",
            "A password reset link is sent to your email!",
            [
                {
                    text: "OK",
                },
            ],
          );
          navigation.navigate('LoginScreen');
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

      <TouchableOpacity style={styles.resetPasswordButton}>
        <Text style={styles.emailText} onPress={() => resetPassword()}>Reset Password</Text>
      </TouchableOpacity>

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
  resetPasswordButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#25a2af',
  },
  emailText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginLeft: 130,
    marginTop: 10,
  },

});

export default ResetPasswordScreen;

import {useState} from "react";
import {StyleSheet, Image, TextInput, View, TouchableOpacity, Text, Keyboard, Alert} from 'react-native';
import {firebaseAuth, firebaseDB} from '../../firebase/FirebaseConfig';
import {keyboard} from "yarn/lib/cli";
import ExpressoButton from '../../components/Button';
// import '@react-navigation/native';


const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState("");

  const resetPassword = () => {
    firebaseAuth
      .sendPasswordResetEmail(email)
        .then(() => {
          console.log("Successfully sent password reset email!");
          Alert.alert(
            "Success! Please check your email:",
            "A password reset link is sent to your email!",
            [
                {
                    text: "OK",
                },
            ],
          );
          navigation.navigate('LoginScreen');
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

      <TouchableOpacity style={styles.resetPasswordButton}>
        <Text style={styles.emailText} onPress={() => resetPassword()}>Reset Password</Text>
      </TouchableOpacity>

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
  resetPasswordButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#25a2af',
  },
  emailText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginLeft: 130,
    marginTop: 10,
  },

});

export default ResetPasswordScreen;
