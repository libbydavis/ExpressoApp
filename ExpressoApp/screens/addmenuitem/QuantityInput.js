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
  const setInitialQuantity = (initial) => {
    return initial? initial : 0;
  }

  const [quantity, setQuantityNumber] = useState(() => setInitialQuantity(props.initialQuantity));

  const handleButtonQuantity = (buttonType) => {
    let newQuantity;
    if (buttonType == true) {
      newQuantity = quantity + 1;
      setQuantityNumber(newQuantity);
    } else if (quantity - 1 < 0) {
      Alert.alert('You can\'t have a value smaller than 0!');
    } else if (quantity - 1 >= 0) {
      newQuantity = quantity - 1;
      setQuantityNumber(newQuantity);
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
    setQuantityNumber(Number(text));
    props.receiveValue(Number(text));
  };

  return (
      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={() => handleMinus()}>
          <Image
              source={require('../../assets/minusButton.png')}
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
              source={require('../../assets/addButton.png')}
              style={styles.quantityIcon}
          />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
    marginBottom: 20,
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
