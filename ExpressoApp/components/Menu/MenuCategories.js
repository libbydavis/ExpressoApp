import React from "react";
import {Text, View} from "react-native-animatable";
import {TouchableOpacity} from "react-native-gesture-handler";

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
                        <Text>
                            {category}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default MenuCategories;
