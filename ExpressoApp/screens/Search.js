import React, { Component } from "react";
import { Button, TextInput, View } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchContent: '',
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }

  handleSearchButton = () => {

  }

  render() {
    return(
      <View>
        <TextInput value={this.state.searchContent} onChangeText={(text) => this.setState({['searchContent'] : text})}/>
        <Button title={"Search"} onPress={this.handleSearchButton()}></Button>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'key',
            language: 'en',
          }}
        />
      </View>
    )
  }
}

export default Search;
