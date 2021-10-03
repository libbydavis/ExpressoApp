import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class ExpressoButton extends React.Component {
  constructor(props) {
    super(props);
    const {onPress, title} = this.props;
    this.onPress = onPress;
    this.title = title;
    this.styles = StyleSheet.create({
      expressoButtonContainer: {
        backgroundColor: '#25a2af',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
      },
      expressoButtonText: {
        color: '#ffffff',
      },
    });
  }

  OnPressHandler = () => {
    try{
      this.onPress ?
        this.onPress()?.() :
          console.warn('Implement onPress prop');
    }
    catch(error){
      console.warn('Caught an error in ExpressoButton');
      console.error(error.message);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.OnPressHandler} style={this.styles.expressoButtonContainer}>
        <Text style={this.styles.expressoButtonText}>{typeof this.title !== "undefined" ? this.title : 'Add Title Prop'}</Text>
      </TouchableOpacity>
    );
  }
}

export default ExpressoButton;
