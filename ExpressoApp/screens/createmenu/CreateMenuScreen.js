import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const CreateMenuScreen = () => {
  return (
    <View>
      <Image
        source={require('../../assets/ExpressoLogo.png')}
        style={styles.headerIcon}
      ></Image>
      <View style={styles.mainView}>
        <Text style={styles.title}>Create Menu</Text>
        <Text style={styles.subtitle}>Input Menu Title</Text>
        <TextInput style={styles.textInput} placeholder="Menu Title" />
        <TouchableOpacity style={styles.expressoButton}>
          <Text style={styles.expressoButtonText}>add title</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    width: 200,
    height: 50,
  },
  textInput: {
    fontFamily: 'Monserrat-Regular',
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    paddingRight: 50,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Monserrat-Bold',
    color: '#25a2af',
    fontSize: 35,
    margin: 10,
  },
  subtitle: {
    fontFamily: 'Monserrat-Regular',
    color: '#25a2af',
    fontSize: 24,
    margin: 20,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  columnView: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  expressoButton: {
    backgroundColor: '#25a2af',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  expressoButtonText: {
    color: '#ffffff',
  },
});

export default CreateMenuScreen;
