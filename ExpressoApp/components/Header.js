import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ExpressoHeader(props) {
    const {rightOption, onPress} = props;
    const navigation = useNavigation();    

    const OnLogoPressHandler = () => {
        console.log('Logo Press Handler');
        try {
            navigation.navigate('SearchScreen');
        } catch (error) {
            console.warn('Caught an error in header');
            console.error(error.message);
        }
    };

    const OnRightOptionPressHandler = () => {
        console.log('Right option handler');
        try {
            rightOption === 'profile' ? 
                navigation.navigate('ProfileScreen') :
                onPress();     
        } catch (error) {
            console.warn('Caught an error in ExpressoButton');
            console.error(error.message);
        }
    };

    return (
        <View style={styles.headerView}>
            <TouchableOpacity
                style={styles.expressoLogoButton}
                onPress={OnLogoPressHandler}
                testID={'expressoButton'}>
                <Image
                    source={require('../assets/ExpressoLogo.png')}
                    style={styles.expressoLogo}
                />
            </TouchableOpacity>
            {
                /* Options like cart or profile */
                rightOption === 'cart' ? (
                    <TouchableOpacity
                        style={styles.rightOption}
                        onPress={OnRightOptionPressHandler}>
                        <Image
                            source={require('../assets/carticon.png')}
                            style={styles.cart}
                        />
                    </TouchableOpacity>
                ) : rightOption === 'profile' ? (
                    <TouchableOpacity
                        style={styles.rightOption}
                        onPress={OnRightOptionPressHandler}
                        testID={'profileButton'}>
                        <Image
                            source={require('../assets/profileIcon.png')}
                            style={styles.profile}
                        />
                    </TouchableOpacity>
                ) : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    expressoLogoButton: {
        marginBottom: 15,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    expressoLogo: {
        width: 200,
        height: 50,
    },
    cart: {
        width: 40,
        height: 40,
        padding: 5,
    },
    profile: {
        width: 40,
        height: 40,
        padding: 5,
    },
    rightOption: {
        width: 40,
        height: 40,
        padding: 5,
        margin: 10,
    },
});
export default ExpressoHeader;
