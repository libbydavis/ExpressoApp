/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
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

import AddMenuItemScreen from './AddMenuItemScreen';
import LoginScreen from './screens/login/LoginScreen';



const App: () => Node = () => {
  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
