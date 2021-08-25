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
import LoginScreen from './screens/login/LoginScreen';
import CartScreen from './screens/cart/CartScreen';

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
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

