import React, {useEffect, useState} from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

function setInitial(props) {
  if (props != undefined) {
    let quan = props.initialQuantity ? props.initialQuantity : 1;
    return quan;
  }
  return 1;
}

const QuantityInput = (props) => {
  const [quantity, setQuantity] = useState(setInitial(props));


  const handleButtonQuantity = (buttonType) => {
    let newQuantity;
    if (buttonType == true) {
      newQuantity = quantity + 1;
      setQuantity(newQuantity);
    } else if (quantity - 1 < 0) {
      Alert.alert('You can\'t have a value smaller than 0!');
    } else if (quantity - 1 >= 0) {
      newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
    props.receiveValue(newQuantity);
  };

  const handlePlus = () => {
    handleButtonQuantity(true);
  };

  const handleMinus = () => {
    handleButtonQuantity(false);
  };

  const handleTextQuantity = (text) => {
    setQuantity(Number(text));
    props.receiveValue(Number(text));
  };

  return (
    <View style={styles.quantityRow}>
      <TouchableOpacity onPress={() => handleMinus()}>
        <Image
          source={require('../assets/minusButton.png')}
          style={styles.quantityIcon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.quantityInputBox} value={quantity.toString()}
        onChangeText={(text) => handleTextQuantity(text)}
        keyboardType={'numeric'}
      />
      <TouchableOpacity onPress={() => handlePlus()}>
        <Image
          source={require('../assets/addButton.png')}
          style={styles.quantityIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
  },
  quantityIcon: {
    width: 25,
    height: 25,
  },
  quantityInputBox: {
    marginLeft: 10,
    textAlignVertical: 'top',
  },
});

export default QuantityInput;
