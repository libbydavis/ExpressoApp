/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddMenuItemScreen from './screens/addmenuitem/AddMenuItemScreen';
import RegisterUserScreen from './screens/registeruser/RegisterUserScreen';
import LoginScreen from './screens/login/LoginScreen';
import CreateStorePageScreen from './screens/createstorepage/CreateStorePageScreen';
import StorePageScreen from './screens/storepage/StorePageScreen';
import CartScreen from './screens/cart/CartScreen';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';
import OrdersScreen from './screens/ownerorders/OrdersScreen';
import SearchScreen from './screens/search/SearchScreen';
import ReviewMenuItemScreen from "./screens/createmenu/ReviewMenuItemScreen";
import CreateMenuScreen from "./screens/createmenu/CreateMenuScreen";
import MenuScreen from "./screens/menu/MenuScreen";
import MenuEditorScreen from "./screens/menu/MenuEditorScreen";


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
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    SplashScreen.hide();
    const firebaseConfig = {
      apiKey: 'AIzaSyDFDrnM-_MnV2Zg-wgY3Vgn5J9LmwdMvZc',
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
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen}/>
          <Stack.Screen name="Cart" component={CartScreen} />


          <Stack.Screen name="CreateStorePageScreen" component={CreateStorePageScreen}/>
            <Stack.Screen name="StorePageScreen" component={StorePageScreen}/>
          <Stack.Screen name="CreateMenuScreen" component={CreateMenuScreen} />
          <Stack.Screen name="RegisterUser" component={RegisterUserScreen}/>
          <Stack.Screen name="OrdersScreen" component={OrdersScreen}/>
          <Stack.Screen name='SearchScreen' component={SearchScreen}/>

          <Stack.Screen name="ReviewMenuItem" component={ReviewMenuItemScreen} />

          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="MenuEditor" component={MenuEditorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
