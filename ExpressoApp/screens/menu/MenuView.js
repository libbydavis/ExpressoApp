import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet} from 'react-native';

import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

class MenuView extends Component {

    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.props.menuItems}
                    renderItem={({item}) => (
                        <MenuItem item={item} onPress={this.props.onItemPress}/>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
});

export default MenuView;
