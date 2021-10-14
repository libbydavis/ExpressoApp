import React from "react";
import {Text, View} from "react-native-animatable";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FlatList, Image, StyleSheet} from "react-native";

const MenuCategories = ({categories, filterItems, activeCategory}) => {
    return (
        <View className="btn-container">
            {categories.map((category, index) => {
                return (
                    <FlatList
                        data={categories}
                        renderItem={() => {
                            return (
                                <TouchableOpacity style={styles.itemStyle} onPress={() => filterItems(category)}>
                                    <Text style={styles.itemText}>{category}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        horizontal={true}
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
