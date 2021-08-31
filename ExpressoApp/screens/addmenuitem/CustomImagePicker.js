import React, {Component} from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import uploadImage from '../../assets/uploadImage.jpg';


class CustomImagePicker extends Component {
  uploadImageUri = Image.resolveAssetSource(uploadImage).uri;

  constructor(props) {
    super(props);

    this.state = {
      photo: this.uploadImageUri,
    };

    this.handleChoosePhoto = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        if (!response.didCancel) {
          if (response.assets[0].uri) {
            this.setState({photo: response.assets[0].uri});
          }
        }
      });

    };
  }

  /**
    *
    * @return {JSX.Element}
    */

  render() {
    const {photo} = this.state;
    return (

    // eslint-disable-next-line react/prop-types
      <View style={this.props.style}>
        {photo && (
          <TouchableOpacity onPress={this.handleChoosePhoto}>
            <Image
              source={{uri: this.state.photo}}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})

export default CustomImagePicker;

