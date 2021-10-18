import React, {useEffect} from "react";
import {Text, View} from "react-native-animatable";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FlatList, Image, StyleSheet} from "react-native";

const MenuCategories = ({categories, filterItems, activeCategory}) => {
    return (
        <View className="btn-container">
            {categories.map((category, index) => {
                return (
                    <TouchableOpacity
                        type="button"
                        className={`${
                            activeCategory === category ? "filter-btn active" : "filter-btn"
                        }`}
                        key={index}
                        onPress={() => filterItems(category)}
                    >
                        <Text style = {styles.catText}>
                            {category}
                        </Text>
                    </TouchableOpacity>
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
    },
    catText: {
        fontSize: 18,
        fontFamily: "Monserrat-Regular",
        color: '#000000'
    }
})

// Old return statement below - more geared toward React rather than React Native (will use FlatList instead)

//     <FlatList
// data={categories}
// renderItem={ItemView}
// horizontal
// />

// const MenuCategories = ({ categories, filterItems }) => {
//
//     const ItemView = ({category}) => {
//         return (
//             <TouchableOpacity
//                 style={styles.itemStyle}
//                 onPress={filterItems(category)}
//             >
//                 <Text style={styles.itemText}>{category}</Text>
//             </TouchableOpacity>
//         )
//     }
//     return (
//         <View>
//             <TouchableOpacity
//                 type="button"
//                 className={"categories"}
//                 key={index}
//                 onPress={() => filterItems(category)}
//             >
//                 <Text>
//                     {category}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }
