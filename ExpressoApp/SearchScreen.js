import React, { useState, useRef} from "react";
import { StyleSheet, View, TextInput, Image} from "react-native";

const SearchScreen = ({navigation}) => {
    const [inputValue, setValue] = useState("");
    const input = useRef();
    return(
        <View>
            <Image source={require('./assets/ExpressoLogo.png')} style={styles.headerIcon}></Image>
            <View style={styles.searchView}>
                <Image source={require('./assets/magnifyingGlass.png')} style={styles.searchIcon}></Image>
                <TextInput
                    ref={input}
                    style={styles.textInput}
                    value = {inputValue}
                    onChangeText={setValue}
                    autoCapitalize="none"
                    placeholder = "find your favourite restaurant..."
                    />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchView: {
        flexDirection : "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25a2af',
        height: 150
    },
    headerIcon: {
        width: 200,
        height: 50,
    },
    searchIcon : {
        width: 30,
        height: 30,
        margin: 5
    },
    modalView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        margin: 20,
        borderRadius : 10,
        padding : 5,
        backgroundColor: '#ffffff'
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    }
})


export default SearchScreen;



