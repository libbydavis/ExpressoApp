import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';

const CreateMenuScreen = ({ navigation }) => {
    const [menuObject, setMenuObject] = useState({
        title: '',
        menuItems: [],
    })

    const setTitle = (title) => {
        setMenuObject({...menuObject, ['title'] : title});
        console.log(menuObject)
    }

    return (
        <View>
            <Image
                source={require('../../assets/ExpressoLogo.png')}
                style={styles.headerIcon}
            />
            <View style={styles.columnView}>
                <Text style={styles.title}>Create MenuView</Text>
                <TextInput>
                    style={styles.textInput}
                    placeholder="MenuView Title"
                    onChangeText={(text) => setTitle(text)}
                </TextInput>
                <TouchableOpacity style={styles.expressoButton}>
                    <Text style={styles.expressoButtonText}>Add MenuView</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerIcon: {
        width: 200,
        height: 50,
    },
    inputContainer: {
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
    },
    textInput: {
        fontFamily: 'Monserrat-Regular',
        borderBottomWidth: 1,
        borderStartWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingRight: 50,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Monserrat-Bold',
        color: '#25a2af',
        fontSize: 35,
        margin: 10,
    },
    subtitle: {
        fontFamily: 'Monserrat-Regular',
        color: '#25a2af',
        fontSize: 24,
        margin: 20,
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
    expressoButton: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    expressoButtonText: {
        color: '#ffffff',
    },
});

export default CreateMenuScreen;
