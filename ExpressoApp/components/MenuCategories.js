import React, {useEffect} from "react";
import {Text, View} from "react-native-animatable";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FlatList, Image, StyleSheet} from "react-native";

const MenuCategories = ({categories, filterItems, activeCategory}) => {

    const ItemView = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.itemStyle}
                onPress={filterItems(item)}
            >
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            {categories.map((category, index) => {
                return (
                    <FlatList
                        data={categories}
                        horizontal
                        renderItem={ItemView
                            // return (
                            //     <TouchableOpacity style={styles.itemStyle} onPress={() => filterItems(category)}>
                            //         <Text style={styles.itemText}>{category}</Text>
                            //     </TouchableOpacity>
                            // )
                        }
                    />
                );
            })}
        </View>
    )
}

export default MenuCategories;

const styles = StyleSheet.create({
    itemStyle: {
        padding: 15,
        flex: 1,
        fontFamily: 'Monserrat-Regular',
        backgroundColor: '#ffffff',
    },
    itemText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Monserrat-Regular',
        color: '#000000'
    }
})

// Old return statement below - more geared toward React rather than React Native (will use FlatList instead)

// <TouchableOpacity
//     type="button"
//     className={`${
//         activeCategory === category ? "filter-btn active" : "filter-btn"
//     }`}
//     key={index}
//     onPress={() => filterItems(category)}
// >
//     <Text>
//         {category}
//     </Text>
// </TouchableOpacity>
