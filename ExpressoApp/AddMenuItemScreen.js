import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Image} from 'react-native';

const AddMenuItemScreen = ({navigation}) => {
    return(
        <View>
            <Text style={styles.title}>Add Item</Text>
            <View>
                <TextInput style={styles.textInput} placeholder="title" />
                <TextInput style={styles.textInput} placeholder="description" />
                <TextInput style={styles.textInput} placeholder="price" keyboardType='decimal-pad' />
            </View>
            <View>
                <View>
                    <Text>quantity</Text>
                    <TouchableOpacity>
                        <Image source={require('./assets/addButton.png')} />
                    </TouchableOpacity>
                    <TextInput placeholder="5" />
                    <TouchableOpacity source={require('./assets/minusButton.png')}></TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text>add options</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Text>Add Item</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Monserrat-Regular',
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
    }
});

export default AddMenuItemScreen;
