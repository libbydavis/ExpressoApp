import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ToastAndroid, FlatList, TouchableOpacityComponent,
} from 'react-native';
import {firebase, firebaseDB} from "../../firebase/FirebaseConfig";
import {ScrollView} from "react-native";

export const MenuView = ({ route, navigation }) => { // pass menuID to ensure this accesses the correct menu
    const menuID = route.params;
    const currentMenuID = menuID["menuID"];
    const dbRef = firebaseDB.ref("Menus/");
    let menuItemList = []
    const [currentItemID, setCurrentItemID] = useState(null); // may not be required

    const unsetCurrentItem = () => {
        setCurrentItemID(null);
    }

    useEffect(() => {
        dbRef.child(currentMenuID + '/')
            .once("value").then((snapshot) => {
            console.log(snapshot.numChildren());
            if (snapshot.exists()) {
                if (!snapshot.child(`menuItems`)) {
                    console.log("No items in menu")
                } else {
                    let menuItems = snapshot.child(`menuItems`);
                    menuItems.forEach(function (snapshot) {
                        menuItemList.push({
                            title: snapshot.val(`title`),
                            image: snapshot.val(`image`),
                            description: snapshot.val(`description`),
                            price: snapshot.val(`price`),
                            quantity: snapshot.val(`quantity`),
                            optionLists: snapshot.val(`optionLists`)
                        });
                    })
                }
            } else {
                console.error("No menu detected");
            }
        }).catch(error => {
            console.error(error);
        });

        // This section is not to be required

        /*let currentID = '';
    let menuItem = '';
    const iterateItems = (snap) => {
        let menuItems = [];
        Object.keys(snap).forEach((key) => {
            if (typeof snap[key] != 'object') {
                if (key === 'menuItem') {
                    menuItem = snap[key];
                    menuItems.push(snap.val(key));
                } else {

                }
/!*                } else {
                currentID = key;
                iterateItems(snap[key]);

                // setting these to props for export
                if (menuItems) {
                    const props = {
              /!*          title = '',
                        image: '',
                        description: '',
                        price: ,
                        quantity: ,
                        optionLists:
*!/
                    }
                }*!/
            }
        })
        return menuItems;
    }*/
// TODO Menu items contain:
        //     title: '',
        //     image: '',
        //     description: '',
        //     price: 0.0,
        //     quantity: 5,
        //     optionLists: [],

        // End of disregarding section

    })

    const ItemView = ({item}) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.title}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: 'rgba(37, 162, 175,.2)',
                }}
            />
        );
    };

    return (
        <View>
            <View style={styles.navBar}>
                <Image
                    source={require('../../assets/ExpressoLogo.png')}
                    style={styles.headerIcon}
                />
            </View>
            <View style={styles.mainView}>
                <Text style={styles.mainTitle}>
                    Menu Title
                </Text>
            </View>
            <ScrollView>

                <TouchableOpacity
                    style={styles.expressoButton}
                    onPress = {() => navigation.navigate("AddMenuItem", currentMenuID)}>
                    <Text style = {styles.expressoButtonText}>Add new item</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

// Iterate through selected menu

// Display items in menu

// "Add New Item to Menu" button, push menu id to that

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
        marginHorizontal: 20,
        // backgroundColor: '#ffffff',
        marginBottom: 30,
        paddingBottom: 100,
        alignItems: 'center',
    },
    menuItems: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    navBar: {
        marginBottom: 15,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    headerIcon: {
        width: 200,
        height: 50,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
    rowView: {
        flexDirection: 'row',
        marginTop: 20,
    },
    columnView: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    itemStyle: {
        padding: 15,
        flex: 1,
        fontFamily: 'Monserrat-Regular',
        backgroundColor: '#ffffff',
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    discardButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
    imagePicker: {
        backgroundColor: 'red',
    },
    inputChecklist: {
        flexDirection: 'row',
        marginTop: 10,
    },
    enterOptionText: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 100,
        marginRight: 15,
    },
    enterOptionTitle: {
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        position: 'absolute',
        top: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    quantityElements: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionBottomButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
});

export default MenuView;

