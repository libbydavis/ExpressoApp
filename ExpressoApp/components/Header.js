import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';


class ExpressoHeader extends React.Component {
    constructor(props) {
        super(props);
        const {navigation,rightOption} = this.props;
        this.navigation = navigation;
        this.rightOption = rightOption; //Cart or Profile
        this.styles = StyleSheet.create({
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
    }

    OnLogoPressHandler = () => {
        console.log('Logo Press Handler');
        try {
            this.navigation.navigate('SearchScreen');
        } catch (error) {
            console.warn('Caught an error in ExpressoButton');
            console.error(error.message);
        }
    }

    OnRightOptionPressHandler = () => {
        try {
            this.rightOption === 'cart' ?
                this.navigation.navigate('CartScreen') :
                this.navigation.navigate('ProfileScreen');
        } catch (error) {
            console.warn('Caught an error in ExpressoButton');
            console.error(error.message);
        }
    }

    render() {
        return (
            <View style={this.styles.headerView}>
                <TouchableOpacity style={this.styles.expressoLogoButton} onPress={this.OnLogoPressHandler}>
                    <Image source={require('../assets/ExpressoLogo.png')} style={this.styles.expressoLogo}/>
                </TouchableOpacity>
                { /*Options like cart or profile */
                    this.rightOption === 'cart' ?
                        <TouchableOpacity style={this.styles.rightOption} onPress={this.OnRightOptionPressHandler}>
                            <Image source={require('../assets/carticon.png')} style={this.styles.cart}/>
                        </TouchableOpacity> :
                        this.rightOption === 'profile' ?
                            <TouchableOpacity style={this.styles.rightOption} onPress={this.OnRightOptionPressHandler}>
                                <Image source={require('../assets/profileIcon.png')} style={this.styles.profile}/>
                            </TouchableOpacity> :
                            null
                }
            </View>
        );
    }
}

export default ExpressoHeader;
