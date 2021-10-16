import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList, Alert,
} from 'react-native';
import {firebaseDB} from "../../firebase/FirebaseConfig";
import Header from '../../components/Header';
import { useNavigation} from '@react-navigation/native';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */

export const DeleteMenuItemScreen = (props) => {
    const menuID = props.menuID;
    const [displayedItems, setDisplayedItems] = useState([]);
    const navigate = useNavigation();

    useEffect(() => {
        console.log('Menus/'+menuID+'/menuItems/')
        firebaseDB.ref('Menus/'+menuID+'/menuItems/').on('value', (snapshot) => {
            let itemList = [];
            snapshot.forEach((child) => {
                itemList.push({
                    image: child.val().image,
                    title: child.val().title,
                    key: child.key,
                });
            });
            setDisplayedItems(itemList);
        });
        console.log('exit')

    }, []);

    const ItemView = ({item}) => {
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => deleteItem(item)}>
                <Image style={styles.imageThumbnail} source={require('../../assets/menuItemDefault.jpg')}/>
                <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };
    const deleteItem = (item) => {
        // Function to click on a menu item in the FlatList
        Alert.alert(
            `Delete item?`,
            `Are you sure you want to delete '${item.title}'?`,
            [
                {text: "OK",
                onPress: () => {
                    firebaseDB.ref('Menus/'+menuID+'/menuItems/'+item.key+'/').remove()
                    Alert.alert("Item Deleted", `'${item.title}' was successfully deleted!`)
                }},
                {text: "Cancel"},
            ])};

    return (
        <View height={'100%'} testID={'Delete_Menu_Item_Screen'}>
            <Header navigation={navigate} rightOption={'profile'}/>
            <View style={styles.titleView}>
                <Text style={styles.title}>Select Item to Delete:</Text>
            </View>
            <FlatList
                data={displayedItems}
                renderItem={ItemView}
                numColumns={2}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    titleView: {
        width: '100%',
        backgroundColor: 'rgba(37, 162, 175,.9)',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ffffff',
        fontFamily: 'Monserrat-Bold',
        fontSize: 30,
        margin: 10,
        padding: 5,
        fontWeight: 'bold',
    },
    menuItems: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemStyle: {
        padding: 15,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    itemText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Monserrat-Regular',
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: '#fcfcfc',
    },
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
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
    expressoLabel: {
        fontFamily: 'Monserrat-Regular',
        color: '#383838',
    },
});

export default DeleteMenuItemScreen;
