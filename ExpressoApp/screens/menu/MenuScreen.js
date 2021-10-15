import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
} from 'react-native';
import {firebase, firebaseDB} from "../../firebase/FirebaseConfig";
import MenuCategories from "../../components/MenuCategories";
import Header from "../../components/Header";
// import Category from "react-native-category"; this package is shit do not use

//TODO: Remove unnecessary styles, fix loading of categories

export const MenuScreen = ({navigation, route}) => {
    // pass menuID in the form (MenuScreen, { menuID: id_here }) to ensure this accesses the correct menu
    const menuID = route.params["menuID"];
    const dbRef = firebaseDB.ref("Menus/");
    const [allCategories, setAllCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [menuItemList, setMenuItemList] = useState([]);
    const [menuTitle, setMenuTitle] = useState('Menu');
    const [displayedItems, setDisplayedItems] = useState([]);

    useEffect(() => {
        let itemList = [];
        dbRef.child(menuID + `/menuItems`).on('value', (snapshot) => {
            snapshot.forEach((child) => {
                itemList.push({
                    title: child.val().title,
                    image: child.val().image,
                    description: child.val().description,
                    price: child.val().price,
                    quantity: child.val().quantity,
                    optionLists: child.val().optionLists,
                    itemCategory: child.val().itemCategory
                });
            });
        });
        setMenuItemList(itemList);
        setDisplayedItems(menuItemList);
    }, []);

    useEffect(() => {
        dbRef.child(menuID + `/`).on("value", (snapshot) => {
            setMenuTitle(snapshot.val().title);
        });
    }, []);

    useEffect(() => {
        setAllCategories(["all", ...new Set(menuItemList.map((item) => item.itemCategory))]);
    }, [menuItemList]);

    const filterItems = (category) => {
        setActiveCategory(category);
        if (category === "all") {
            setDisplayedItems(menuItemList);
            return;
        }
        const itemsToDisplay = menuItemList.filter((item) => item.itemCategory === category);
        setDisplayedItems(itemsToDisplay);
    }

    const ItemView = ({item}) => {
        // View specification for menu items
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => getItem(item)}>
                <Image style={styles.imageThumbnail} source={require('../../assets/menuItemDefault.jpg')}/>
                <Text style={styles.itemText}>{item.title}   </Text>
                <Text style={styles.itemText}>${item.price}</Text>
            </TouchableOpacity>
        );
    };

    const getItem = (item) => {
        // Function to click on a menu item in the FlatList

        if (item.optionLists) {
            navigation.navigate("ReviewMenuItem", {
                title:item.title,
                price: item.price,
                description: item.description,
                optionLists: item.optionLists
            });
        };
        console.log(item);
        navigation.navigate("ReviewMenuItem", {
            title:item.title,
            price: item.price,
            description: item.description,
            optionLists: []
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
            <Header/>
            <View style={styles.mainView}>
                <Text style={styles.mainTitle}>
                    {menuTitle}
                </Text>
            </View>
            <MenuCategories
                categories={allCategories}
                activeCategory={activeCategory}
                filterItems={filterItems}
            />
            {/*<Category data={menuItemList}*/}
            {/*          itemSelected={(category) => filterItems(category)}*/}
            {/*          itemText={'itemCategory'}*/}
            {/*          />*/}
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

export default MenuScreen;

