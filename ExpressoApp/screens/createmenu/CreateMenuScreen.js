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
import {firebaseAuth, firebaseDB} from "../../firebase/FirebaseConfig";


/**
 *
 * @return {JSX.Element}
 * @constructor
 */

export const CreateMenuScreen = ({route, navigation}) => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const dbRef = firebaseDB.ref();
    const [menuObject, setMenuObject] = useState({
        title: '',
        menuItems: [],
        business: uid
    });

    const onClickSubmitMenu = async () => {
        // Ensure the user has input a title
        if (menuObject.title !== null) {
            let menuRef = dbRef.child("Menus").push()
            await menuRef.set({
                'title': menuObject.title,
                'menuItems': menuObject.menuItems,
                'business': menuObject.business
            });
            let menuID = menuRef.key.toString();
            console.log(menuID);
           /* try {
                await AsyncStorage.setItem(
                    'currentMenuID',
                    menuID
                );
            } catch (error) {
                console.error(error)
            }*/
            navigation.navigate('MenuEditor', { menuID: menuID });
        } else {
            ToastAndroid("You must input a title!");
        }
    }

    const setTitle = (titleText) => {
        setMenuObject({...menuObject, ['title']: titleText});
        console.log(menuObject)
    }

    return (
        <View>
            <Image
                source={require('../../assets/ExpressoLogo.png')}
                style={styles.headerIcon}
            />
            <View style={styles.mainView}>
                <Text style={styles.title}>Create Menu</Text>
                <Text style={styles.subtitle}>Input Menu Title</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Menu Title"
                    onChangeText={(text) => setTitle(text)}/>
                <TouchableOpacity style={styles.expressoButton}>
                    <Text
                        style={styles.expressoButtonText}
                        onPress={() => onClickSubmitMenu()}>
                        Add Menu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerIcon: {
        width: 200,
        height: 50,
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 50,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    subtitle: {
        fontFamily: 'Monserrat-Regular',
        color: '#25a2af',
        fontSize: 24,
        margin: 20,
    },
    rowView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
});

export default CreateMenuScreen;
