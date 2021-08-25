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
