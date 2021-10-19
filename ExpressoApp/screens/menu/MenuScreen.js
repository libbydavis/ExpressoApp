import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList, SectionList,
} from 'react-native';
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { firebase } from "@react-native-firebase/auth";
import MenuCategories from "../../components/MenuCategories";
import Header from "../../components/Header";

//TODO: Remove unnecessary styles, fix loading of categories

export const MenuScreen = ({navigation, route}) => {
    // pass menuID in the form ('MenuScreen', { menuID: id_here }) to ensure this accesses the correct menu
    // { menuID: '-MjmBfn9YP-wguwurLH1' } <- dinner menu test id
    const menuID = route.params.menuID;
    const dbRef = firebaseDB.ref("Menus/");
    const [businessID, setBusinessID] = useState("");
    const [activeCategory, setActiveCategory] = useState("all"); // intended to allow the active category
    const [menuItemList, setMenuItemList] = useState([]);        // to display a different style to others
    const [menuTitle, setMenuTitle] = useState('Menu');
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        dbRef.child(menuID + `/`).on("value", (snapshot) => {
            setMenuTitle(snapshot.val().title);
            setBusinessID(snapshot.val().business);
        });

        createMenu();
    }, []);

    const createMenu = () => {
        let itemList = [];
        itemList = [];
        dbRef.child(menuID + `/menuItems`).on('value', (snapshot) => {
            snapshot.forEach((child) => {
                itemList.push({
                    title: child.val().title,
                    image: retrieveImage(child.val().image),
                    description: child.val().description,
                    price: child.val().price,
                    quantity: child.val().quantity,
                    optionLists: child.val().optionLists,
                    itemCategory: child.val().itemCategory
                });
            });
        });
        setMenuItemList(itemList);
        setDisplayedItems(itemList);
    }

    function retrieveImage (imageURI) {
        const imageName = imageURI.substring(imageURI.lastIndexOf('/') + 1);
        let imageRef = firebase.storage().ref('/' + imageName);
        imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                return url;
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
    }

    const filterItems = (category) => {
        setActiveCategory(category);
        if (category === "all") {
            setDisplayedItems(menuItemList);
            return;
        }
        const itemsToDisplay = menuItemList.filter((item) => item.itemCategory === category);
        setDisplayedItems(itemsToDisplay);
    }

    const ItemView = ({ item }) => {
        // View specification for menu items
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => getItem(item)}>
                <Image style={styles.imageThumbnail} source={require('../../assets/menuItemDefault.jpg')}/>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemText}>${item.price}</Text>
            </TouchableOpacity>
        );
    };

    const getItem = (item) => {
        // Function to click on a menu item in the FlatList

        if (item.optionLists) {
            navigation.navigate("ReviewMenuItem", {
                title: item.title,
                price: item.price,
                description: item.description,
                optionLists: item.optionLists,
                businessID: businessID,
                menuID: menuID
            });
        }

        console.log(item);
        navigation.navigate("ReviewMenuItem", {
            title: item.title,
            price: item.price,
            description: item.description,
            optionLists: [],
            businessID: businessID,
            menuID: menuID
        });

    };

    const ItemSeparatorView = () => {
        // Separator for FlatList used in rendering
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
            <Header rightOption={'cart'} navigation={navigation} onPress={() => navigation.navigate('Cart')}/>
            <View style={styles.mainView}>
                <Text style={styles.mainTitle}>
                    {menuTitle}
                </Text>
            </View>
            <MenuCategories
                categories={["all", ...new Set(menuItemList.map((item) => item.itemCategory))]}
                activeCategory={activeCategory}
                filterItems={filterItems}
            />
            <FlatList
                data={displayedItems}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                numColumns={2}
            />
        </View>
    )
};

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

export default MenuScreen;

