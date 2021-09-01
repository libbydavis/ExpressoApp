/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddMenuItemScreen from './screens/addmenuitem/AddMenuItemScreen';
import RegisterUserScreen from './screens/registeruser/RegisterUserScreen';
import CreateMenuScreen from "./screens/createmenu/CreateMenuScreen";
import LoginScreen from './screens/login/LoginScreen';
import CartScreen from './screens/cart/CartScreen';
import {firebase} from './firebase/FirebaseConfig';

const Stack = createStackNavigator();

/**
 *
 */
export default class App extends Component {
  /**
   *
   * @return {JSX.Element}
   */
  constructor() {
    super();
    // Initialize Firebase via FirebaseConfig
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="CreateMenuScreen" component={CreateMenuScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterUser" component={RegisterUserScreen}/>
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen}/>
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

