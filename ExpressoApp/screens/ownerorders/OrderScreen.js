import React, {useState} from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Order from './Order';
import {useNavigation} from '@react-navigation/native';

function OrderScreen({props}) {
  const navigation = useNavigation();

  return (
      <ScrollView contentContainerStyle={styles.scrollView}>

        <TouchableOpacity style={styles.navBar}
                          onPress={() => navigation.navigate('SearchScreen')}>
          <Image
              source={require('../../assets/ExpressoLogo.png')}
              style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.mainTitle}>Orders</Text>
        { // List of Text components
          props.menuItems
        }

      </ScrollView>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Monserrat-Regular',
    color: '#25a2af',
    fontSize: 35,
  },
  scrollView: {
    marginHorizontal: 10,
    // backgroundColor: '#ffffff',
    marginBottom: 30,
    paddingBottom: 100,
    alignItems: 'center',
  }
});
