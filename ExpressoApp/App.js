/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'firebase';

import AddMenuItemScreen from './screens/AddMenuItemScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';

const Stack = createStackNavigator();

class App extends Component {
  constructor() {
    super();
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyAn92Ew0Z5VJ_TgThlS_krQHUUBW8zzuOE',
      authDomain: 'expresso-418d1.firebaseapp.com',
      databaseURL: 'https://expresso-418d1-default-rtdb.firebaseio.com',
      projectId: 'expresso-418d1',
      storageBucket: 'expresso-418d1.appspot.com',
      messagingSenderId: '723640216847',
      appId: '1:723640216847:web:65558223bfa0ac1ac2a27a',
      measurementId: 'G-SR7PKGX02H',
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    const dbRef = firebase.database().ref();
    dbRef.child('Users/Owner').child('Owner1').get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    });

    firebase.database().ref('Users/Owner/Owner2').set({
      firstName: 'Shayla',
      lastName: 'Craigs',
      phone: '024756437',
    }).then(() => {
      console.log('owner inserted');
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="RegisterUser" component={RegisterUserScreen}/>
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
});

export default App;
