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
import {ScrollView} from "react-native-gesture-handler";
import MenuCategories from "./MenuCategories";

export const MenuEditorScreen = ({navigation, route}) => {
    // pass menuID in the form (MenuEditor, { menuID: id_here }) to ensure this accesses the correct menu
    const menuID = route.params["menuID"];
    const dbRef = firebaseDB.ref("Menus/");
    const [menuItemList, setMenuItemList] = useState([]);
    const [menuTitle, setMenuTitle] = useState('Menu');

    useEffect(() => {
        // useEffect hook to ensure title is correct
        dbRef.child(menuID + `/`).on("value", (snapshot) => {
            setMenuTitle(snapshot.val().title);
        });
    });
    useEffect(() => {
        // useEffect hook to ensure menu items are up to date when loading page
        dbRef.child(menuID + `/menuItems`).on('value', (snapshot) => {
            let itemList = [];
            snapshot.forEach((child) => {
                itemList.push({
                    title: child.val().title,
                    image: child.val().image,
                    description: child.val().description,
                    price: child.val().price,
                    quantity: child.val().quantity,
                    optionLists: child.val().optionLists,
                    itemCategory: child.val().itemCategory // TODO: Implement categories / sections
                });
                setMenuItemList(itemList);
            });
        });
    }, []);

    const ItemView = ({item}) => {
        // View specification for menu items
        return (
            <TouchableOpacity  style={styles.itemStyle}  onPress={() => getItem(item)}>
                <Image style={styles.imageThumbnail} source={require('../../assets/menuItemDefault.jpg')} />
                <Text style={styles.itemText} >{item.title}</Text>
            </TouchableOpacity>
        );
    };

    const getItem = (item) => {
        // Function to click on a menu item in the FlatList
        alert('\nTitle : ' + item.title + '\nQuantity : ' + item.quantity + '\nPrice : ' + item.price);
    };

    const ItemSeparatorView = () => {
        // Separator for FlatList used when rendering
        return (
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
                    {menuTitle}
                </Text>
            </View>
            <ScrollView style={styles.menuItems}>
                <FlatList
                    data={menuItemList}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.expressoButton}
                onPress={() => navigation.navigate("AddMenuItem", currentMenuID)}>
                <Text style={styles.expressoButtonText}>Add new item</Text>
            </TouchableOpacity>
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
    imageThumbnail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 160,
        borderRadius: 5,
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

export default MenuEditorScreen;

