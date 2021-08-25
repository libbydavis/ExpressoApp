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
import AddMenuItemScreen from './screens/AddMenuItemScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';
import LoginScreen from './screens/login/LoginScreen';
import ScreenCart from './screens/ScreenCart';

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
    render();
    {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="RegisterUser" component={RegisterUserScreen}/>
            <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen}/>
            <Stack.Screen name="Cart" component={ScreenCart} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

