import React, {Component} from "react";
import {Button, Image, View} from "react-native";
import * as ImagePicker from 'react-native-image-picker';

class CustomImagePicker extends Component {
    constructor(props) {
        super(props);
    }
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

        <View style={this.props.style}>
            {photo && (
                <Image source={{uri: this.state.photo.uri}} style={{width: 300, height: 300}} />
            )}
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        );
    }
}

export default CustomImagePicker;
