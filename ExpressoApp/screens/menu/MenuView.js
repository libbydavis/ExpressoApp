import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ToastAndroid,
} from 'react-native';
import {firebase, firebaseDB} from "../../firebase/FirebaseConfig";

export const MenuView = ({navigation}) => {
    const [returnedMenuID, setReturnedMenuID] = useState('');
    const [menuList, setMenuList] = useState('');
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const dbRef = firebaseDB.ref();

    useEffect(() => {
        dbRef.child('Menus')
            .orderByChild('business')
            .equalTo(uid)
            .get().then((snapshot) => {
            if (snapshot.exists()) {
                if (!menuList) {
//                    setMenuList(); TODO init list of menus, iterate through possibilities
                } else {        // TODO and add to list
                    console.log('No data available')
                }
            }
        }).catch((error) => {
            console.error(error);
        })

        //iterate through list of menus
        let currentID = '';
        let menuItems = [];
        const menus = [];
        const iterateMenus = (obj) => {

        }
    })
}
