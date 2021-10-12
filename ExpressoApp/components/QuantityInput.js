import React, {useState} from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';


const QuantityInput = (props) => {
  const [quantity, setQuantity] = useState('' + props.initialQuantity);
  const [quantityNumber, setQuantityNumber] = useState(props.initialQuantity);

  const handleButtonQuantity = (buttonType) => {
    let newQuantity;
    if (buttonType == true) {
      newQuantity = quantityNumber + 1;
      setQuantityNumber(newQuantity);
      setQuantity(newQuantity.toString());
    } else if (quantityNumber - 1 < 0) {
      Alert.alert('You can\'t have a value smaller than 0!');
    } else if (quantityNumber - 1 >= 0) {
      newQuantity = quantityNumber - 1;
      setQuantityNumber(newQuantity);
      setQuantity(newQuantity.toString());
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
    setQuantity(text);
    setQuantityNumber(Number(text));
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
        style={styles.quantityInputBox} value={quantity}
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
