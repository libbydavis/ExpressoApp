import React, {Component} from "react";
import {Button, Image, View} from "react-native";
import * as ImagePicker from 'react-native-image-picker';

class CustomImagePicker extends Component {
    state = {
        photo: null,
    };

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({photo: response});
            }
        });
    };

    render() {
        const {photo} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {photo && (
                    <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
                )}
                <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
            </View>
        );
    }
}

export default CustomImagePicker;
